/**
 * GlowMorning Branding Website
 * Main JavaScript - Interactions & Animations
 */

// ===================================
// Utility Functions
// ===================================

/**
 * Debounce function to limit the rate of function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= 0
    );
}

// ===================================
// Number Counter Animation
// ===================================

class CounterAnimation {
    constructor(element, target, duration = 2000, decimals = 0) {
        this.element = element;
        this.target = parseFloat(target);
        this.duration = duration;
        this.decimals = decimals;
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        this.hasAnimated = true;

        const start = 0;
        const range = this.target - start;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // Easing function (easeOutQuart)
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const current = start + (range * easeOut);

            // Format number
            this.element.textContent = this.decimals > 0
                ? current.toFixed(this.decimals)
                : Math.floor(current).toLocaleString('ko-KR');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.decimals > 0
                    ? this.target.toFixed(this.decimals)
                    : Math.floor(this.target).toLocaleString('ko-KR');
            }
        };

        requestAnimationFrame(updateCounter);
    }

    reset() {
        this.hasAnimated = false;
        this.element.textContent = '0';
    }
}

// ===================================
// Intersection Observer for Animations
// ===================================

class AnimationObserver {
    constructor() {
        this.observers = new Map();
        this.initializeObservers();
    }

    initializeObservers() {
        // Observer for fade-in animations
        const fadeInObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        this.observers.set('fadeIn', fadeInObserver);

        // Observer for counter animations
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const counter = entry.target.counterAnimation;
                        if (counter) {
                            counter.animate();
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        this.observers.set('counter', counterObserver);
    }

    observe(element, type = 'fadeIn') {
        const observer = this.observers.get(type);
        if (observer) {
            observer.observe(element);
        }
    }

    disconnect() {
        this.observers.forEach((observer) => observer.disconnect());
    }
}

// ===================================
// Smooth Scroll
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip empty hash or just "#"
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed header if any

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Parallax Effect for Hero Section
// ===================================

class ParallaxEffect {
    constructor() {
        this.heroSection = document.querySelector('.hero-section');
        this.stars = document.querySelector('.stars');
        this.phoneMockup = document.querySelector('.phone-mockup');
        this.init();
    }

    init() {
        if (!this.heroSection) return;

        window.addEventListener('scroll', debounce(() => {
            this.update();
        }, 10));
    }

    update() {
        const scrolled = window.pageYOffset;
        const heroHeight = this.heroSection.offsetHeight;

        if (scrolled < heroHeight) {
            // Parallax for stars
            if (this.stars) {
                this.stars.style.transform = `translateY(${scrolled * 0.5}px)`;
            }

            // Parallax for phone mockup
            if (this.phoneMockup) {
                this.phoneMockup.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    }
}

// ===================================
// Hero Gradient Animation
// ===================================

class HeroGradientAnimation {
    constructor() {
        this.gradientOverlay = document.querySelector('.gradient-overlay');
        this.init();
    }

    init() {
        if (!this.gradientOverlay) return;

        window.addEventListener('scroll', debounce(() => {
            this.update();
        }, 10));
    }

    update() {
        const scrolled = window.pageYOffset;
        const maxScroll = 800;
        const progress = Math.min(scrolled / maxScroll, 1);

        // Transition from night (dark) to morning (lighter with purple tint)
        const opacity = 1 - (progress * 0.3);
        this.gradientOverlay.style.opacity = opacity;
    }
}

// ===================================
// Card Hover Effects
// ===================================

function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');

    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===================================
// Counter Initialization
// ===================================

function initCounters() {
    const animationObserver = new AnimationObserver();

    // Time value counters
    document.querySelectorAll('.time-number[data-target]').forEach((element) => {
        const target = element.getAttribute('data-target');
        const decimals = target.includes('.') ? 1 : 0;
        const counter = new CounterAnimation(element, target, 2000, decimals);
        element.counterAnimation = counter;
        animationObserver.observe(element, 'counter');
    });

    // Stats counters
    document.querySelectorAll('.stat-number[data-target]').forEach((element) => {
        const target = element.getAttribute('data-target');
        const counter = new CounterAnimation(element, target, 2500, 0);
        element.counterAnimation = counter;
        animationObserver.observe(element, 'counter');
    });
}

// ===================================
// Scroll Progress Indicator
// ===================================

class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #745DE9 0%, #FBBF24 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    init() {
        window.addEventListener('scroll', debounce(() => {
            this.update();
        }, 10));
    }

    update() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;

        this.progressBar.style.width = `${progress}%`;
    }
}

// ===================================
// Feature Card Animations
// ===================================

function initFeatureAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ===================================
// Journey Step Animations
// ===================================

function initJourneyAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 150);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.journey-step').forEach((step) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-50px)';
        step.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(step);
    });
}

// ===================================
// Pricing Card Pulse Animation
// ===================================

function initPricingAnimations() {
    const featuredCard = document.querySelector('.pricing-card.featured');
    if (featuredCard) {
        setInterval(() => {
            featuredCard.style.boxShadow = '0 0 60px rgba(116, 93, 233, 0.6)';
            setTimeout(() => {
                featuredCard.style.boxShadow = '0 0 40px rgba(116, 93, 233, 0.4)';
            }, 1000);
        }, 3000);
    }
}

// ===================================
// Easter Egg: Konami Code
// ===================================

function initEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑ ↑ ↓ ↓ ← → ← → B A
    let konamiPosition = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiPosition]) {
            konamiPosition++;
            if (konamiPosition === konamiCode.length) {
                activateEasterEgg();
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });
}

function activateEasterEgg() {
    // Create confetti effect
    const colors = ['#745DE9', '#FBBF24', '#FFFFFF'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                border-radius: 50%;
                pointer-events: none;
                z-index: 99999;
                animation: fall ${2 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 20);
    }

    // Add CSS animation if it doesn't exist
    if (!document.getElementById('confetti-animation')) {
        const style = document.createElement('style');
        style.id = 'confetti-animation';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Show message
    alert('🌅 축하합니다! 당신은 진정한 GlowMorning 마스터입니다! 🎉');
}

// ===================================
// Loading Animation
// ===================================

function initLoadingAnimation() {
    // Fade in body when page loads
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===================================
// Performance Optimization: Lazy Loading
// ===================================

function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');

    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // Load background image
                    if (element.dataset.lazybg) {
                        element.style.backgroundImage = `url(${element.dataset.lazybg})`;
                    }

                    // Load src
                    if (element.dataset.lazysrc) {
                        element.src = element.dataset.lazysrc;
                    }

                    element.removeAttribute('data-lazy');
                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach((element) => lazyObserver.observe(element));
    }
}

// ===================================
// Initialize All
// ===================================

function init() {
    console.log('🌅 GlowMorning Website Initialized');

    // Initialize loading animation
    initLoadingAnimation();

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    // Core features
    initSmoothScroll();
    initCounters();
    initCardEffects();
    initFeatureAnimations();
    initJourneyAnimations();
    initPricingAnimations();

    // Visual effects
    new ParallaxEffect();
    new HeroGradientAnimation();
    new ScrollProgress();

    // Performance
    initLazyLoading();

    // Easter egg
    initEasterEgg();

    console.log('✅ All features initialized successfully');
}

// ===================================
// Start Application
// ===================================

init();

// ===================================
// Export for potential use in other scripts
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CounterAnimation,
        AnimationObserver,
        ParallaxEffect,
        HeroGradientAnimation,
        ScrollProgress
    };
}
