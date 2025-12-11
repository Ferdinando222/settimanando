// Elementi DOM
const header = document.getElementById('header');
const searchBtn = document.getElementById('searchBtn');
const searchContainer = document.getElementById('searchContainer');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const progressBar = document.getElementById('progressBar');
const logo = document.getElementById('logo');
const logoParticles = document.getElementById('logoParticles');
const searchInput = document.querySelector('.search-input');

// Effetto scroll header
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Aggiungi classe scrolled
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Aggiorna progress bar
    const scrollPercent = (currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.transform = `scaleX(${scrollPercent / 100})`;

    lastScrollY = currentScrollY;
});

// Toggle ricerca
searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        searchInput.focus();
    }
});

// Chiudi ricerca cliccando fuori
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && !searchBtn.contains(e.target)) {
        searchContainer.classList.remove('active');
    }
});

// Toggle tema (placeholder)
themeToggle.addEventListener('click', () => {
    // Animazione di feedback
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

// Toggle menu mobile
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Chiudi menu mobile
mobileOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Navigazione attiva - Imposta active in base all'URL corrente
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

// Funzione per impostare il link attivo
function setActiveLink(links) {
    // Converti NodeList in array e ordina per lunghezza decrescente
    // Così controlliamo prima i path più specifici (/blog, /about) e poi /
    const linksArray = Array.from(links).sort((a, b) => {
        const pathA = a.getAttribute('href');
        const pathB = b.getAttribute('href');
        return pathB.length - pathA.length;
    });
    
    let activeSet = false;
    
    linksArray.forEach(link => {
        const linkPath = link.getAttribute('href');
        link.classList.remove('active');
        
        // Se abbiamo già impostato un link come attivo, salta
        if (activeSet) return;
        
        // Rimuovi trailing slash per il confronto
        let currentClean = currentPath.endsWith('/') && currentPath.length > 1 
            ? currentPath.slice(0, -1) 
            : currentPath;
        let linkClean = linkPath.endsWith('/') && linkPath.length > 1 
            ? linkPath.slice(0, -1) 
            : linkPath;
        
        // Controllo esatto o sottopagina
        if (currentClean === linkClean || 
            (linkClean !== '/' && linkClean !== '' && currentClean.startsWith(linkClean + '/'))) {
            link.classList.add('active');
            activeSet = true;
        }
        // Controllo per home solo se nessun altro link ha matchato
        else if (!activeSet && (linkClean === '/' || linkClean === '') && (currentClean === '/' || currentClean === '')) {
            link.classList.add('active');
            activeSet = true;
        }
    });
}

// Imposta active per menu desktop e mobile
setActiveLink(navLinks);
setActiveLink(mobileNavLinks);

// Particelle animate nel logo
function createLogoParticles() {
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        logoParticles.appendChild(particle);
        
        // Rimuovi particella dopo l'animazione
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 3000);
    }
}

// Avvia particelle logo al hover
logo.addEventListener('mouseenter', () => {
    createLogoParticles();
    const interval = setInterval(createLogoParticles, 500);
    
    logo.addEventListener('mouseleave', () => {
        clearInterval(interval);
    }, { once: true });
});

// Effetto typewriter per la ricerca
const placeholders = [
    'Cerca nel blog...',
    'Trova articoli...',
    'Esplora contenuti...',
    'Scopri di più...'
];
let placeholderIndex = 0;

setInterval(() => {
    if (!searchInput.matches(':focus')) {
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        searchInput.placeholder = placeholders[placeholderIndex];
    }
}, 3000);

// Smooth scroll SOLO per i link interni con #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // preventDefault solo per link con # (anchor nella stessa pagina)
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K per aprire ricerca
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    }
    
    // Escape per chiudere ricerca e menu
    if (e.key === 'Escape') {
        searchContainer.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});