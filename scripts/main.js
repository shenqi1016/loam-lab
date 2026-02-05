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

    // 5. SURPRISE EASTER EGG (Founders' Personality)
    const initSurprise = () => {
        const triangle = document.querySelector('.hero-triangle');
        const heroSub = document.querySelector('.hero-sub');
        if (!heroSub) return; // Guard clause
        const originalText = heroSub.innerText;
        let isAnimating = false;

        if (!triangle) return;

        triangle.addEventListener('click', (e) => {
            // Ripple / Particle Effect
            const rect = triangle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 30; i++) {
                const spore = document.createElement('div');
                spore.classList.add('spore');
                document.body.appendChild(spore);
                spore.style.left = `${centerX}px`;
                spore.style.top = `${centerY}px`;

                const angle = Math.random() * Math.PI * 2;
                const velocity = 100 + Math.random() * 200;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;

                spore.style.setProperty('--tx', `${tx}px`);
                spore.style.setProperty('--ty', `${ty}px`);
                spore.style.background = Math.random() > 0.7 ? '#fff' : '#ff0000';
                spore.style.animation = `fly-out 0.8s ease-out forwards`;
                setTimeout(() => spore.remove(), 800);
            }

            if (!isAnimating) {
                isAnimating = true;
                heroSub.style.opacity = 0;
                setTimeout(() => {
                    heroSub.innerText = "EXPECT THE UNEXPECTED";
                    heroSub.style.color = "#ff0000";
                    heroSub.style.letterSpacing = "6px";
                    heroSub.style.fontWeight = "700";
                    heroSub.style.opacity = 1;
                }, 200);
                setTimeout(() => {
                    heroSub.style.opacity = 0;
                    setTimeout(() => {
                        heroSub.innerText = originalText;
                        heroSub.style.color = "rgba(255, 255, 255, 0.8)";
                        heroSub.style.letterSpacing = "4px";
                        heroSub.style.fontWeight = "300";
                        heroSub.style.opacity = 1;
                        isAnimating = false;
                    }, 200);
                }, 2500);
            }
        });
    };

    // 6. GLOBAL SURPRISE: SCRAMBLE TEXT (Matrix Decoding Effect)
    const initScrambleEffect = () => {
        const targets = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-links a, .pricing-btn');
        const chars = '!<>-_\\/[]{}—=+*^?#________';

        targets.forEach(el => {
            el.dataset.originalText = el.innerText;

            el.addEventListener('mouseenter', () => {
                let iteration = 0;
                const originalText = el.dataset.originalText;

                // Clear any running interval
                if (el.interval) clearInterval(el.interval);

                el.interval = setInterval(() => {
                    el.innerText = originalText
                        .split('')
                        .map((letter, index) => {
                            if (index < iteration) {
                                return originalText[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');

                    if (iteration >= originalText.length) {
                        clearInterval(el.interval);
                    }

                    iteration += 1 / 2; // Speed of decoding
                }, 30);
            });

            el.addEventListener('mouseleave', () => {
                if (el.interval) clearInterval(el.interval);
                el.innerText = el.dataset.originalText;
            });
        });
    };

    // 7. GLOBAL SURPRISE: WARP NAV (The "Jump")
    const initWarpNav = () => {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (!targetSection) return;

                // 1. Trigger Warp
                document.body.classList.add('body-warp');

                // 2. Play Sound? (Optional, maybe too intrusive)

                // 3. Wait for visual distort, then jump
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'auto' }); // Instant jump while distorted

                    // 4. Recovery
                    setTimeout(() => {
                        document.body.classList.remove('body-warp');
                    }, 100);
                }, 300); // 300ms distortion time
            });
        });
    };

    // Initialize all surprises
    initSurprise();
    initScrambleEffect();
    initWarpNav();

});
