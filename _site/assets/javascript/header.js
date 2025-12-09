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

// Navigazione attiva in base alla pagina corrente
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
let currentPath = window.location.pathname;

// Debug
console.log('Current path:', currentPath);

// Normalizza il path rimuovendo lo slash finale (tranne per root)
if (currentPath !== '/' && currentPath.endsWith('/')) {
    currentPath = currentPath.slice(0, -1);
}

// Gestisci menu desktop
navLinks.forEach(link => {
    let linkPath = link.getAttribute('href');
    console.log('Desktop link href:', linkPath);
    
    // Normalizza anche il linkPath
    if (linkPath !== '/' && linkPath.endsWith('/')) {
        linkPath = linkPath.slice(0, -1);
    }
    
    // Rimuovi tutte le classi active
    link.classList.remove('active');
    
    // Confronto esatto
    if (currentPath === linkPath) {
        link.classList.add('active');
    }
});

// Gestisci menu mobile
mobileNavLinks.forEach(link => {
    let linkPath = link.getAttribute('href');
    console.log('Mobile link href:', linkPath);
    
    // Normalizza anche il linkPath
    if (linkPath !== '/' && linkPath.endsWith('/')) {
        linkPath = linkPath.slice(0, -1);
    }
    
    // Rimuovi tutte le classi active
    link.classList.remove('active');
    
    // Confronto esatto
    if (currentPath === linkPath) {
        link.classList.add('active');
    }
});

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
const searchInput = document.querySelector('.search-input');
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

// Smooth scroll per i link interni
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