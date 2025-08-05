
    // Creazione particelle animate
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    // Indicatore di scroll
    function updateScrollIndicator() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scrollIndicator').style.transform = `scaleX(${scrolled / 100})`;
    }
    // Parallax effect sulle card
    function handleParallax() {
        const cards = document.querySelectorAll('.article-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const speed = 0.5;
            const yPos = -(rect.top * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    }
    // Effetto hover 3D
    function init3DEffect() {
        const cards = document.querySelectorAll('.article-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    }
    // Intersection Observer per animazioni al scroll
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.article-card').forEach(card => {
            observer.observe(card);
        });
    }
    // Inizializzazione
    document.addEventListener('DOMContentLoaded', () => {
        createParticles();
        init3DEffect();
        initScrollAnimations();
        
        window.addEventListener('scroll', () => {
            updateScrollIndicator();
            requestAnimationFrame(handleParallax);
        });
    });
    // Smooth scrolling per i link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });