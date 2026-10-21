
    // Indicatore di scroll
    function updateScrollIndicator() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scrollIndicator').style.transform = `scaleX(${scrolled / 100})`;
    }
    // Inizializzazione
    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('scroll', updateScrollIndicator);
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
