// Home: corda da pizzicare, stanza d'ascolto e comparsa delle card
(() => {
    const stringCanvas = document.getElementById('string');
    const stageCanvas = document.getElementById('stage');
    const roomData = document.getElementById('room-data');
    if (!stringCanvas || !stageCanvas || !roomData) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const css = getComputedStyle(document.documentElement);
    const C = {};
    ['night-2', 'stage', 'paper', 'dim', 'line', 'amber', 'olive'].forEach(k => C[k] = css.getPropertyValue('--' + k).trim());

    function fit(cv) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const r = cv.getBoundingClientRect();
        const w = Math.max(1, Math.round(r.width * dpr));
        const h = Math.max(1, Math.round(r.height * dpr));
        if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
        const ctx = cv.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, r.width, r.height);
        return { ctx, w: r.width, h: r.height };
    }

    function local(cv, e) {
        const r = cv.getBoundingClientRect();
        return [e.clientX - r.left, e.clientY - r.top];
    }

    // ---------- Suono (solo se il lettore lo accende) ----------
    let actx = null;
    let soundOn = false;
    const soundBtn = document.getElementById('soundBtn');
    soundBtn.addEventListener('click', () => {
        soundOn = !soundOn;
        if (soundOn) {
            actx = actx || new (window.AudioContext || window.webkitAudioContext)();
            actx.resume();
        }
        soundBtn.setAttribute('aria-pressed', String(soundOn));
        soundBtn.textContent = soundOn ? 'Suono acceso' : 'Suono spento';
    });

    // Karplus-Strong: la linea di ritardo parte dalla forma della corda pizzicata,
    // quindi il punto in cui pizzichi cambia il timbro
    function pluckSound(u, A) {
        if (!soundOn || !actx) return;
        const sr = actx.sampleRate;
        const P = Math.round(sr / 110);
        const len = Math.floor(sr * 2.4);
        const buf = actx.createBuffer(1, len, sr);
        const out = buf.getChannelData(0);
        const line = new Float32Array(P);
        let mean = 0;
        for (let i = 0; i < P; i++) {
            const x = i / P;
            line[i] = (x < u ? x / u : (1 - x) / (1 - u)) + (Math.random() - 0.5) * 0.12;
            mean += line[i];
        }
        mean /= P;
        for (let i = 0; i < P; i++) line[i] -= mean;
        for (let i = 0; i < len; i++) {
            const k = i % P;
            out[i] = line[k];
            line[k] = 0.4985 * (line[k] + line[(k + 1) % P]);
        }
        const src = actx.createBufferSource();
        const g = actx.createGain();
        src.buffer = buf;
        g.gain.value = Math.min(0.5, Math.abs(A) / 26 * 0.45);
        src.connect(g).connect(actx.destination);
        src.start();
    }

    // ---------- Corda: somma dei modi di una corda pizzicata ----------
    const NM = 14;
    const F1 = 5.5; // frequenza "visiva" del primo modo, rallentata per vederla
    const str = { events: [], py: null, pt: 0 };

    function pluck(u, A) {
        u = Math.min(0.95, Math.max(0.05, u));
        const a = [];
        for (let n = 1; n <= NM; n++) {
            a.push(A * 2 / (n * n * Math.PI * Math.PI * u * (1 - u)) * Math.sin(n * Math.PI * u));
        }
        str.events.push({ t0: performance.now() / 1000, a });
        if (str.events.length > 5) str.events.shift();
        pluckSound(u, A);
    }

    stringCanvas.addEventListener('pointermove', e => {
        const [x, y] = local(stringCanvas, e);
        const r = stringCanvas.getBoundingClientRect();
        const m = 8;
        const rel = y - r.height / 2;
        const now = performance.now();
        if (str.py !== null && rel !== 0 && Math.sign(rel) !== Math.sign(str.py) && x > m && x < r.width - m) {
            const v = Math.abs(rel - str.py) / Math.max(1, now - str.pt);
            pluck((x - m) / (r.width - 2 * m), Math.sign(str.py) * Math.min(26, 6 + v * 14));
        }
        str.py = rel;
        str.pt = now;
    });
    stringCanvas.addEventListener('pointerleave', () => { str.py = null; });
    stringCanvas.addEventListener('pointerdown', e => {
        const [x] = local(stringCanvas, e);
        pluck(x / stringCanvas.getBoundingClientRect().width, 18);
    });
    stringCanvas.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            pluck(0.25 + Math.random() * 0.5, 18);
        }
    });

    function drawString(t) {
        const { ctx, w, h } = fit(stringCanvas);
        const m = 8;
        const L = w - 2 * m;
        const y0 = h / 2;
        str.events = str.events.filter(ev => t - ev.t0 < 4);
        let energy = 0;
        const pts = [];
        for (let x = m; x <= w - m + 0.1; x += 3) {
            const u = (x - m) / L;
            let y = 0;
            for (const ev of str.events) {
                const dt = t - ev.t0;
                for (let n = 1; n <= NM; n++) {
                    const tau = (reduce ? 0.35 : 1.5) / Math.sqrt(n);
                    y += ev.a[n - 1] * Math.exp(-dt / tau) * Math.cos(2 * Math.PI * n * F1 * dt) * Math.sin(n * Math.PI * u);
                }
            }
            y = Math.max(-h / 2 + 4, Math.min(h / 2 - 4, y));
            energy = Math.max(energy, Math.abs(y));
            pts.push([x, y0 + y]);
        }
        ctx.fillStyle = C.dim;
        [[m, y0], [w - m, y0]].forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        const glow = Math.min(1, energy / 14);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const trace = () => {
            ctx.beginPath();
            pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
            ctx.stroke();
        };
        if (glow > 0.02) {
            ctx.strokeStyle = C.amber;
            ctx.globalAlpha = 0.25 * glow;
            ctx.lineWidth = 8;
            trace();
            ctx.globalAlpha = 1;
        }
        ctx.strokeStyle = glow > 0.02 ? C.amber : C.paper;
        ctx.lineWidth = 1.6;
        trace();
    }

    // un primo pizzico di benvenuto, per far capire cosa fa la corda
    if (!reduce) setTimeout(() => pluck(0.32, 14), 900);

    // ---------- Stanza d'ascolto ----------
    const TOPICS = JSON.parse(roomData.textContent);

    // Modello di Woodworth, raggio della testa 8,75 cm: ITD = r/c (θ + sin θ)
    function hearing(angleDeg) {
        let az = 90 - angleDeg;
        az = ((az + 180) % 360 + 360) % 360 - 180;
        let th = Math.abs(az);
        const back = th > 90;
        if (back) th = 180 - th;
        const rad = th * Math.PI / 180;
        const itd = 0.0875 / 343 * (rad + Math.sin(rad)) * 1000;
        const side = az > 0 ? 'destra' : 'sinistra';
        if (th < 3) {
            return `Da ${back ? 'dietro' : 'davanti'} · ITD 0,00 ms · arriva insieme alle due orecchie: davanti o dietro? Qui il cervello va in confusione`;
        }
        return `Da ${Math.round(Math.abs(az))}° alla tua ${side} · ITD ${itd.toFixed(2).replace('.', ',')} ms · arriva prima all'orecchio ${side === 'destra' ? 'destro' : 'sinistro'}`;
    }

    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const firstWithPost = TOPICS.findIndex(t => t.post);
    const stage = {
        active: firstWithPost >= 0 ? firstWithPost : 0,
        hover: -1,
        rings: [],
        spawn: TOPICS.map((_, i) => i * 0.7),
        ear: [0, 0],
        auto: !reduce,
        autoT: 0,
        visible: true,
        geo: null,
    };

    const storyEl = document.getElementById('story');
    const storyInner = document.getElementById('storyInner');
    const chips = TOPICS.map((t, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.textContent = t.name;
        b.addEventListener('click', () => select(i, true));
        document.getElementById('chips').appendChild(b);
        return b;
    });

    function renderStory() {
        const t = TOPICS[stage.active];
        const head = `<div class="topic"><b>${esc(t.name)}</b><span class="dir">${hearing(t.angle)}</span></div>`;
        if (t.post) {
            const more = t.count > 1 ? ` · ${t.count} storie in questo tema` : '';
            storyInner.innerHTML = head +
                `<h3>${esc(t.post.title)}</h3>` +
                (t.post.sub ? `<p class="sub">${esc(t.post.sub)}</p>` : '') +
                (t.post.text && t.post.text !== t.post.sub ? `<p>${esc(t.post.text)}</p>` : '') +
                `<span class="meta">${esc(t.post.date)}${t.post.read ? ' · ' + esc(t.post.read) + ' di lettura' : ''}${more}</span>` +
                `<a class="cta" href="${esc(t.post.url)}">Leggi la storia <span aria-hidden="true">→</span></a>`;
        } else {
            storyInner.innerHTML = head +
                `<h3>Qui per ora c'è silenzio.</h3>` +
                `<p>${esc(t.desc)}</p>` +
                `<span class="hand">la prima storia di questo tema è in lavorazione…</span>` +
                `<a class="cta ghost" href="${esc(storyEl.dataset.contact)}">Proponimi un'idea <span aria-hidden="true">→</span></a>`;
        }
        storyEl.classList.remove('swap');
        void storyEl.offsetWidth;
        storyEl.classList.add('swap');
        chips.forEach((c, i) => c.setAttribute('aria-pressed', String(i === stage.active)));
    }

    function select(i, user) {
        if (user) stage.auto = false;
        if (i === stage.active) return;
        stage.active = i;
        stage.spawn[i] = 0;
        renderStory();
    }

    function srcPos(i) {
        const { cx, cy, R } = stage.geo;
        const a = TOPICS[i].angle * Math.PI / 180;
        return [cx + Math.cos(a) * R * 0.74, cy - Math.sin(a) * R * 0.74];
    }

    function nearest(x, y) {
        let best = -1;
        let bd = 40;
        TOPICS.forEach((_, i) => {
            const [sx, sy] = srcPos(i);
            const d = Math.hypot(sx - x, sy - y);
            if (d < bd) { bd = d; best = i; }
        });
        return best;
    }

    stageCanvas.addEventListener('pointermove', e => {
        if (!stage.geo) return;
        const [x, y] = local(stageCanvas, e);
        const i = nearest(x, y);
        stage.hover = i;
        stageCanvas.style.cursor = i >= 0 ? 'pointer' : 'default';
        if (i >= 0 && e.pointerType === 'mouse') select(i, true);
    });
    stageCanvas.addEventListener('pointerleave', () => { stage.hover = -1; });
    stageCanvas.addEventListener('click', e => {
        if (!stage.geo) return;
        const [x, y] = local(stageCanvas, e);
        const i = nearest(x, y);
        if (i >= 0) select(i, true);
    });
    new IntersectionObserver(entries => { stage.visible = entries[0].isIntersecting; }).observe(stageCanvas);

    function drawStage(dt, t) {
        const { ctx, w, h } = fit(stageCanvas);
        const cx = w / 2;
        const cy = h / 2;
        const R = Math.min(w, h) / 2 - 2;
        stage.geo = { cx, cy, R };
        const ears = [[cx - 17, cy], [cx + 17, cy]];

        // pavimento della stanza
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, C['night-2']);
        g.addColorStop(1, C.stage);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R - 1, 0, Math.PI * 2);
        ctx.clip();
        ctx.setLineDash([2, 6]);
        [0.33, 0.66].forEach(f => {
            ctx.beginPath();
            ctx.arc(cx, cy, R * f, 0, Math.PI * 2);
            ctx.stroke();
        });
        ctx.setLineDash([]);

        // fronti d'onda
        if (!reduce) {
            TOPICS.forEach((_, i) => {
                stage.spawn[i] -= dt;
                if (stage.spawn[i] <= 0) {
                    const act = i === stage.active;
                    stage.rings.push({ i, r: 0, act, max: act ? R * 2.1 : R * 0.24 });
                    stage.spawn[i] = act ? 0.85 : 2.6 + (i % 3) * 0.4;
                }
            });
        }
        const rings = reduce
            ? TOPICS.flatMap((_, i) => i === stage.active
                ? [0.2, 0.45, 0.7, 0.95].map(f => ({ i, r: R * f, act: true, max: R * 2.1 }))
                : [{ i, r: R * 0.1, act: false, max: R * 0.24 }])
            : stage.rings;
        for (const ring of rings) {
            const prev = ring.r;
            if (!reduce) ring.r += dt * (ring.act ? 105 : 24);
            const [sx, sy] = srcPos(ring.i);
            if (ring.act && !reduce) {
                ears.forEach(([ex, ey], k) => {
                    const d = Math.hypot(ex - sx, ey - sy);
                    if (prev < d && ring.r >= d) stage.ear[k] = 1;
                });
            }
            const life = 1 - ring.r / ring.max;
            if (life <= 0) continue;
            ctx.strokeStyle = ring.act ? C.amber : C.paper;
            ctx.globalAlpha = (ring.act ? 0.55 : 0.18) * life;
            ctx.lineWidth = ring.act ? 1.6 : 1;
            ctx.beginPath();
            ctx.arc(sx, sy, ring.r, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
        if (!reduce) stage.rings = stage.rings.filter(r => r.r < r.max);

        // percorso diretto dalla sorgente attiva all'ascoltatore
        const [ax, ay] = srcPos(stage.active);
        ctx.strokeStyle = C.amber;
        ctx.globalAlpha = 0.35;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
        ctx.restore();

        // ascoltatore visto dall'alto: le orecchie si accendono quando arriva il fronte d'onda
        stage.ear = stage.ear.map(v => Math.max(0, v - dt * 2.6));
        ears.forEach(([ex, ey], k) => {
            ctx.fillStyle = C.amber;
            ctx.globalAlpha = 0.25 + 0.75 * stage.ear[k];
            ctx.beginPath();
            ctx.ellipse(ex, ey, 4, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            if (stage.ear[k] > 0) {
                ctx.globalAlpha = 0.4 * stage.ear[k];
                ctx.strokeStyle = C.amber;
                ctx.beginPath();
                ctx.arc(ex, ey, 7 + 14 * (1 - stage.ear[k]), 0, Math.PI * 2);
                ctx.stroke();
            }
        });
        ctx.globalAlpha = 1;
        ctx.fillStyle = C['night-2'];
        ctx.strokeStyle = C.paper;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy - 13);
        ctx.lineTo(cx, cy - 21);
        ctx.lineTo(cx + 5, cy - 13);
        ctx.stroke();
        ctx.fillStyle = C.dim;
        ctx.font = '600 20px Caveat, cursive';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('tu', cx, cy + 22);

        // sorgenti: piene se il tema ha già una storia, vuote se è ancora in silenzio
        TOPICS.forEach((tp, i) => {
            const [sx, sy] = srcPos(i);
            const act = i === stage.active;
            const hov = i === stage.hover;
            const pulse = act && !reduce ? 1 + 0.15 * Math.sin(t * 5) : 1;
            if (act) {
                ctx.fillStyle = C.amber;
                ctx.globalAlpha = 0.18;
                ctx.beginPath();
                ctx.arc(sx, sy, 18 * pulse, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
            ctx.beginPath();
            ctx.arc(sx, sy, act ? 7 : 5.5, 0, Math.PI * 2);
            if (tp.post) {
                ctx.fillStyle = act ? C.amber : C.paper;
                ctx.fill();
            } else {
                ctx.fillStyle = C.stage;
                ctx.fill();
                ctx.strokeStyle = act ? C.amber : hov ? C.paper : C.olive;
                ctx.lineWidth = 1.6;
                ctx.stroke();
            }
            const a = tp.angle * Math.PI / 180;
            const c = Math.cos(a);
            const s = Math.sin(a);
            ctx.font = `${act ? 700 : 500} 13px Karla, sans-serif`;
            ctx.fillStyle = act ? C.amber : hov ? C.paper : C.dim;
            ctx.textAlign = c > 0.3 ? 'right' : c < -0.3 ? 'left' : 'center';
            ctx.textBaseline = s > 0.3 ? 'top' : s < -0.3 ? 'bottom' : 'middle';
            ctx.fillText(tp.name, sx - c * 16, sy + s * 16);
        });

        if (stage.auto && stage.visible) {
            stage.autoT += dt;
            if (stage.autoT > 7) {
                stage.autoT = 0;
                select((stage.active + 1) % TOPICS.length, false);
            }
        }
    }

    renderStory();

    // ---------- Le card degli ultimi articoli salgono in sequenza (restano sempre visibili) ----------
    if (!reduce && 'IntersectionObserver' in window) {
        const cards = Array.from(document.querySelectorAll('.home-latest .article-card'));
        const io = new IntersectionObserver(entries => entries.forEach(en => {
            if (en.isIntersecting) {
                const k = cards.indexOf(en.target);
                setTimeout(() => en.target.classList.remove('reveal-pending'), k * 120);
                io.unobserve(en.target);
            }
        }), { threshold: 0.2 });
        cards.forEach(c => {
            if (c.getBoundingClientRect().top > window.innerHeight) {
                c.classList.add('reveal-pending');
                io.observe(c);
            }
        });
    }

    let last = performance.now();
    function frame(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        drawString(now / 1000);
        if (stage.visible || !stage.geo) drawStage(dt, now / 1000);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
})();
