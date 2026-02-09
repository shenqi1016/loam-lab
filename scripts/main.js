document.addEventListener('DOMContentLoaded', () => {

    // --- NAV SCROLL EFFECT ---
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // --- IMPLOSION NAV INTERACTION ---
    // When clicking the "Triangle" (Logo) or specific CTAs, 
    // we can trigger a "Suck In" effect before navigating.
    const heroTri = document.querySelector('.hero-triangle');
    if (heroTri) {
        heroTri.addEventListener('click', (e) => {
            // e.preventDefault();
            // suckInAndNavigate('#works');
        });
    }

    // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
    // Minimal fade-up for elements as they scroll into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Targets: Sections, Cards, Titles
    const targets = document.querySelectorAll('.section-title, .portfolio-card, .service-card, .process-card, .pricing-card, .tool-card');
    targets.forEach(el => {
        el.classList.add('opacity-0'); // Initial state controlled by CSS ideally, or JS here
        observer.observe(el);
    });
});

// --- HELPER: Select Plan & Auto-fill Contact Form ---
function selectPlan(planName) {
    // 1. Scroll to contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 2. Auto-fill the "Project Type" input
    // We select by placeholder for now, or ID if we add it
    const inputs = document.querySelectorAll('.form-input');
    let targetInput = null;

    // Find input with placeholder 'Project Type' or '專案類型'
    inputs.forEach(input => {
        if (input.placeholder.includes('Project Type') || input.placeholder.includes('專案類型')) {
            targetInput = input;
        }
    });

    if (targetInput) {
        // Wait for scroll to finish slightly
        setTimeout(() => {
            targetInput.value = `諮詢方案：${planName}`;
            targetInput.focus();
            // Highlight effect
            targetInput.style.borderColor = '#ff0000';
            setTimeout(() => targetInput.style.borderColor = 'rgba(255,255,255,0.1)', 1000);
        }, 800);
    }
}
