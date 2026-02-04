document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Scroll Effect ---
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // --- Hero Parallax & Breathing ---
    // Make the triangle and text move at different speeds
    const heroContent = document.querySelector('.hero-content');
    const heroTriangle = document.querySelector('.hero-triangle');
    const heroPulse = document.querySelector('.hero-bg-pulse');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Only apply if visible to save performance
        if (scrolled < window.innerHeight) {
            // Text moves up faster than scroll (Parallax)
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;

            // Triangle moves slower
            heroTriangle.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.02}deg)`;

            // Pulse fades out
            heroPulse.style.opacity = Math.max(0, 0.6 - (scrolled * 0.001));
        }
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('LoamLab v2.0 Core initialized.');

    // --- PORTFOLIO DATA ---
    // Loaded from scripts/content.js
    const projects = (typeof portfolioData !== 'undefined') ? portfolioData : [];

    // --- RENDER GRID ---
    const gridContainer = document.getElementById('portfolio-grid-container');

    // Only verify if element exists to avoid errors on partial reloads
    if (gridContainer) {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            // Store ID for click handler
            card.dataset.id = project.id;

            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="card-overlay">
                    <h3 class="card-title">${project.title}</h3>
                    <span class="card-category">${project.category}</span>
                </div>
            `;
            gridContainer.appendChild(card);

            // Interaction
            card.addEventListener('click', () => openModal(project));
        });
    }

    // --- MODAL LOGIC ---
    const modalOverlay = document.getElementById('modal-overlay');

    function openModal(project) {
        // Populate Content
        modalOverlay.innerHTML = `
            <div class="modal-container">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                
                <div class="modal-header">
                    <div class="modal-meta">${project.category}</div>
                    <h2 class="modal-title">${project.title}</h2>
                    <p style="color: #ccc; max-width: 600px;">${project.desc}</p>
                </div>
                
                <div class="modal-stages">
                    <!-- Stage 1: Raw -->
                    <div class="stage-section fade-in-stage">
                        <span class="stage-label">01 捕捉的條件 RAW</span>
                        <div class="stage-content">
                            <div class="stage-text">${project.stages.raw.text}</div>
                            <img src="${project.stages.raw.img}" class="stage-visual" alt="Raw">
                        </div>
                    </div>
                    
                    <!-- Stage 2: Process -->
                    <div class="stage-section fade-in-stage">
                        <span class="stage-label">02 孕育過程 PROCESS</span>
                        <div class="stage-content">
                            <img src="${project.stages.process.img}" class="stage-visual" alt="Process">
                            <div class="stage-text">${project.stages.process.text}</div>
                        </div>
                    </div>
                    
                    <!-- Stage 3: Final -->
                    <div class="stage-section fade-in-stage">
                        <span class="stage-label">03 呼吸瞬間 BREATH</span>
                        <div class="stage-content">
                            <div class="stage-text">${project.stages.final.text}</div>
                            <img src="${project.stages.final.img}" class="stage-visual" alt="Final">
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Activate Overlay
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock Body Scroll

        // Staggered Animation for Stages
        setTimeout(() => {
            const stages = document.querySelectorAll('.fade-in-stage');
            stages.forEach((stage, index) => {
                setTimeout(() => {
                    stage.classList.add('visible');
                }, index * 200 + 300);
            });
        }, 100);
    }

    // Expose close function globally
    window.closeModal = function () {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        // Clear content after animation
        setTimeout(() => {
            modalOverlay.innerHTML = '';
        }, 500);
    };

    // Close on click outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

});
