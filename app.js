// Enhanced Presentation Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    // Observe all slide elements
    document.querySelectorAll('.slide h1, .slide h2, .slide h3, .slide p, .slide img, .slide table').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for navigation
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

    // Add loading animation to images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });

        // If image is already loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Add hover effects to interactive elements
    document.querySelectorAll('.nav-btn:not(:disabled)').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.05)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click ripple effect
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${e.offsetX}px`;
            ripple.style.top = `${e.offsetY}px`;
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Auto-advance slides (optional, disabled by default)
    let autoAdvanceInterval;
    const enableAutoAdvance = false; // Set to true to enable auto-advance
    const autoAdvanceDelay = 5000; // 5 seconds

    function startAutoAdvance() {
        if (enableAutoAdvance) {
            autoAdvanceInterval = setInterval(() => {
                const nextBtn = document.getElementById('next-btn');
                if (!nextBtn.disabled) {
                    nextBtn.click();
                } else {
                    clearInterval(autoAdvanceInterval);
                }
            }, autoAdvanceDelay);
        }
    }

    function stopAutoAdvance() {
        clearInterval(autoAdvanceInterval);
    }

    // Pause auto-advance on user interaction
    document.addEventListener('click', stopAutoAdvance);
    document.addEventListener('keydown', stopAutoAdvance);

    // Start auto-advance if enabled
    startAutoAdvance();

    // Add fullscreen support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'f' || e.key === 'F11') {
            e.preventDefault();
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    });

    // Performance optimization: lazy load images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Add accessibility improvements
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.setAttribute('aria-label', btn.textContent.trim());
    });

    // Add focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});