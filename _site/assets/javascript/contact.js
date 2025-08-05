// Gestione form contatti
        function handleContactForm() {
            const form = document.getElementById('contactForm');
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Stato di caricamento
                form.classList.add('form-loading');
                submitBtn.innerHTML = '<span style="display: flex; align-items: center; gap: 10px;"><div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div> Invio in corso...</span>';
                
                // Simula invio (sostituisci con la tua logica API)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Successo
                submitBtn.innerHTML = '✓ Inviato con successo!';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                
                // Mostra messaggio di successo
                showSuccessMessage();
                
                // Reset dopo 3 secondi
                setTimeout(() => {
                    form.classList.remove('form-loading');
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    form.reset();
                }, 3000);
            });
        }

        // Mostra messaggio di successo
        function showSuccessMessage() {
            const message = document.getElementById('successMessage');
            message.classList.add('show');
            
            setTimeout(() => {
                message.classList.remove('show');
            }, 4000);
        }

        // Toggle FAQ
        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Chiudi tutti gli altri FAQ
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Apri/chiudi quello cliccato
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }

        // Validazione form in tempo reale
        function setupFormValidation() {
            const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });
        }

        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            
            // Rimuovi messaggi di errore esistenti
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            field.classList.remove('error');
            
            // Validazione specifica per tipo di campo
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                showFieldError(field, 'Questo campo è obbligatorio');
            } else if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    showFieldError(field, 'Inserisci un indirizzo email valido');
                }
            }
            
            return isValid;
        }

        function showFieldError(field, message) {
            field.classList.add('error');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #ff6b6b; font-size: 0.85rem; margin-top: 5px; font-weight: 500;';
            errorDiv.textContent = message;
            
            field.parentElement.appendChild(errorDiv);
        }

        // Effetti hover migliorati
        function setupEnhancedEffects() {
            // Parallax leggero per le card
            const cards = document.querySelectorAll('.contact-card, .faq-item');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                    this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // Effetto typing per placeholder
            const messageField = document.getElementById('message');
            const placeholders = [
                'Raccontami del tuo progetto...',
                'Quali sono i tuoi obiettivi?',
                'Come posso aiutarti?',
                'Descrivi la tua idea...'
            ];
            
            let placeholderIndex = 0;
            
            setInterval(() => {
                if (!messageField.matches(':focus')) {
                    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
                    messageField.placeholder = placeholders[placeholderIndex];
                }
            }, 4000);
        }

        // Intersection Observer per animazioni
        function setupScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '50px'
            });

            document.querySelectorAll('.contact-card, .social-link, .faq-item').forEach(el => {
                observer.observe(el);
            });
        }

        // Inizializzazione
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            handleContactForm();
            setupFormValidation();
            setupEnhancedEffects();
            setupScrollAnimations();
            
            // Event listeners
            window.addEventListener('scroll', updateScrollIndicator);
            
            // Precompila alcuni campi se ci sono parametri URL
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('subject')) {
                document.getElementById('subject').value = urlParams.get('subject');
            }
        });

        // CSS per validazione form
        const style = document.createElement('style');
        style.textContent = `
            .form-group input.error,
            .form-group textarea.error,
            .form-group select.error {
                border-color: #ff6b6b !important;
                box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2) !important;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);