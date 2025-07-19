// Contact Form Functionality with EmailJS
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Load EmailJS SDK
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/email.min.js';
    script.onload = () => {
        emailjs.init('j_Rvdu4FRzpH80CxD'); // Replace with your EmailJS public key
    };
    document.head.appendChild(script);
})();

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        // Send email via EmailJS
        await emailjs.sendForm('service_zeyz70n', 'template_4ccp6ah', contactForm);

        // Show success message
        showFormStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
        contactForm.reset();

        // Reset form labels
        document.querySelectorAll('.form-group label').forEach(label => {
            label.style.top = '15px';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--text-secondary)';
        });

    } catch (error) {
        // Show error message
        showFormStatus('error', 'Oops! Something went wrong. Please try again later or contact me directly.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

function showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    formStatus.style.display = 'block';

    // Hide status after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}
