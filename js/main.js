// ========================================
// FORM CONTATTI CON NETLIFY
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
    const formData = new FormData(contactForm);
    
    // Validazione base
    const nome = formData.get('nome');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const tipoEvento = formData.get('tipo-evento');
    
    if (!nome || !email || !telefono || !tipoEvento) {
        errorMessage.classList.remove('hidden');
        errorMessage.querySelector('p:last-child').textContent = 'Per favore, compila tutti i campi obbligatori.';
        return;
    }
    
    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.classList.remove('hidden');
        errorMessage.querySelector('p:last-child').textContent = 'Inserisci un\'email valida.';
        return;
    }
    
    // Mostra effetto di invio
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i> Invio in corso...';
    submitBtn.disabled = true;
    
    try {
        // Invia a Netlify
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
            // Mostra messaggio di successo
            successMessage.classList.remove('hidden');
            
            // Reset form
            contactForm.reset();
            
            // Scroll al messaggio di successo
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Effetto confetti
            createConfetti();
            
            // Nascondi il messaggio dopo 10 secondi
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 10000);
        } else {
            throw new Error('Errore invio');
        }
    } catch (error) {
        errorMessage.classList.remove('hidden');
        console.error('Errore:', error);
    } finally {
        // Ripristina bottone
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});
