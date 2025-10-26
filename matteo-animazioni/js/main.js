// Matteo Animazioni - JavaScript Interattivo
// Gestione menu mobile, form contatti e animazioni

// ========================================
// MENU MOBILE
// ========================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

// Apri menu mobile
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

// Chiudi menu mobile
closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Chiudi menu quando si clicca su un link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Chiudi menu se si clicca fuori
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// FORM CONTATTI
// ========================================

const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Nascondi eventuali messaggi precedenti
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    // Raccogli i dati del form
    const formData = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        tipoEvento: document.getElementById('tipo-evento').value,
        dataEvento: document.getElementById('data-evento').value,
        messaggio: document.getElementById('messaggio').value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Validazione base
    if (!formData.nome || !formData.email || !formData.telefono || !formData.tipoEvento) {
        errorMessage.classList.remove('hidden');
        errorMessage.querySelector('p:last-child').textContent = 'Per favore, compila tutti i campi obbligatori.';
        return;
    }
    
    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errorMessage.classList.remove('hidden');
        errorMessage.querySelector('p:last-child').textContent = 'Inserisci un\'email valida.';
        return;
    }
    
    // Simulazione invio (in produzione, qui invieresti i dati a un server)
    console.log('Dati form:', formData);
    
    // Mostra effetto di invio
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i> Invio in corso...';
    submitBtn.disabled = true;
    
    // Simula un delay di invio
    setTimeout(() => {
        // Mostra messaggio di successo
        successMessage.classList.remove('hidden');
        
        // Reset form
        contactForm.reset();
        
        // Ripristina bottone
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll al messaggio di successo
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Effetto confetti
        createConfetti();
        
        // Nascondi il messaggio dopo 10 secondi
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 10000);
    }, 1500);
});

// ========================================
// EFFETTO CONFETTI
// ========================================

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear`;
        
        document.body.appendChild(confetti);
        
        // Rimuovi dopo l'animazione
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Animazione confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// ANIMAZIONI SCROLL
// ========================================

// Intersection Observer per animazioni al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Applica l'animazione a tutte le card
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ========================================
// CONTATORE ANIMATO
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 16);
}

// Attiva contatori quando diventano visibili
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            entry.target.dataset.counted = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.text-3xl.font-bold').forEach(counter => {
    counterObserver.observe(counter);
});

// ========================================
// EFFETTI INTERATTIVI
// ========================================

// Effetto hover sulle icone dei servizi
document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.text-6xl');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.text-6xl');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ========================================
// LOADER INIZIALE (opzionale)
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// EASTER EGG: Click multipli sull'emoji header
// ========================================

let clickCount = 0;
const headerEmoji = document.querySelector('header .text-4xl');

if (headerEmoji) {
    headerEmoji.addEventListener('click', () => {
        clickCount++;
        headerEmoji.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            headerEmoji.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
        
        if (clickCount === 5) {
            createConfetti();
            clickCount = 0;
            
            // Mostra messaggio divertente
            const funMessage = document.createElement('div');
            funMessage.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-3xl shadow-2xl text-2xl font-bold z-50';
            funMessage.innerHTML = '🎉 Hai trovato il segreto! 🎊';
            document.body.appendChild(funMessage);
            
            setTimeout(() => {
                funMessage.style.transition = 'opacity 0.5s ease';
                funMessage.style.opacity = '0';
                setTimeout(() => funMessage.remove(), 500);
            }, 2000);
        }
    });
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🎉 Matteo Animazioni 🎉', 'font-size: 24px; color: #667eea; font-weight: bold;');
console.log('%cSito creato con passione per portare gioia e divertimento! ✨', 'font-size: 14px; color: #764ba2;');
console.log('%cVuoi organizzare una festa indimenticabile? Contattami! 🎈', 'font-size: 12px; color: #f5576c;');