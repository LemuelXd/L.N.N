// --- Navigation Menu Toggle ---
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// --- Smooth Scroll for Navigation Links ---
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        if (navMenu) navMenu.classList.remove('active');
    });
});

// --- Section Reveal on Scroll ---
function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// --- Portfolio Filtering ---
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
        });
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// --- Contact Form Functionality with EmailJS ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm && formStatus) {
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
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        try {
            await emailjs.sendForm('service_zeyz70n', 'template_4ccp6ah', contactForm);
            showFormStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
            contactForm.reset();
            document.querySelectorAll('.form-group label').forEach(label => {
                label.style.top = '15px';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-secondary)';
            });
        } catch (error) {
            showFormStatus('error', 'Oops! Something went wrong. Please try again later or contact me directly.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// --- About Section Animation ---
const aboutSection = document.getElementById('about');
if (aboutSection) {
    window.addEventListener('scroll', () => {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        if (aboutTop < window.innerHeight - 100) {
            aboutSection.classList.add('animate');
        }
    });
}

// --- Skills Progress Bars Animation ---
function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if (barTop < window.innerHeight - 100) {
            bar.style.width = bar.dataset.percent;
            bar.classList.add('filled');
        }
    });
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// --- Experience Timeline Animation ---
function animateTimeline() {
    document.querySelectorAll('.timeline-item').forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight - 100) {
            item.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', animateTimeline);
window.addEventListener('load', animateTimeline);

// --- Services Section Animation ---
function animateServices() {
    document.querySelectorAll('.service-card').forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.classList.add('show');
        }
    });
}
window.addEventListener('scroll', animateServices);
window.addEventListener('load', animateServices);

// --- Testimonials Carousel ---
const testimonialContainer = document.querySelector('.testimonials-carousel');
if (testimonialContainer) {
    let currentIndex = 0;
    const testimonials = testimonialContainer.querySelectorAll('.testimonial');
    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.style.display = i === index ? 'block' : 'none';
        });
    }
    showTestimonial(currentIndex);

    const prevBtn = testimonialContainer.querySelector('.prev');
    const nextBtn = testimonialContainer.querySelector('.next');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
}

// --- Footer Year Update ---
const yearSpan = document.getElementById('footerYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
