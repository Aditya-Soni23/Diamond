document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar & Brand Logic ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const brandTop = document.getElementById('brand-top');
    const dropdownButton = document.querySelector('.dropdown-btn');
    const navDropdown = document.querySelector('.nav-dropdown');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (hamburger && navLinks) { // 👈 ADD GUARD
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.classList.toggle('is-active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
            document.body.classList.toggle('mobile-nav-open', isOpen);

            if (!isOpen) {
                navDropdown?.classList.remove('open');
                dropdownButton?.setAttribute('aria-expanded', 'false');
            }
        });
    }

    dropdownButton?.setAttribute('aria-expanded', 'false');
    dropdownButton?.addEventListener('click', () => {
        const isOpen = navDropdown.classList.toggle('open');
        dropdownButton.setAttribute('aria-expanded', String(isOpen));
    });

    // Only close the mobile menu after a destination has been selected.
    document.querySelectorAll('.nav-links > a.nav-link, .dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation');
            document.body.classList.remove('mobile-nav-open');
            navDropdown?.classList.remove('open');
            dropdownButton?.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.click();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation');
            document.body.classList.remove('mobile-nav-open');
        }
    });

    brandTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Hero Slideshow Logic ---
    const slides = document.querySelectorAll('.slide');
    const navItems = document.querySelectorAll('.nav-item');
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // Play/Pause elements
    const playPauseBtn = document.getElementById('playPauseBtn');
    const pauseIcon = document.getElementById('pauseIcon');
    const playIcon = document.getElementById('playIcon');
    
    let currentSlide = 0;
    const slideDuration = 6000;
    let startTime = null;
    let animationFrameId = null;
    let isPaused = false;

    function goToSlide(index) {
        // Cleanup current
        slides[currentSlide].classList.remove('active');
        navItems[currentSlide].classList.remove('active');
        progressFills[currentSlide].style.width = '0%';
        
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        // Update to new
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        navItems[currentSlide].classList.add('active');

        // Reset animation
        startTime = performance.now();
        if (!isPaused) {
            animationFrameId = requestAnimationFrame(animateProgress);
        }
    }

    function animateProgress(timestamp) {
        if (isPaused) return;
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min((elapsed / slideDuration) * 100, 100);
        
        progressFills[currentSlide].style.width = `${progress}%`;

        if (elapsed < slideDuration) {
            animationFrameId = requestAnimationFrame(animateProgress);
        } else {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }
    }
    if (playPauseBtn) { // 👈 ADD GUARD
        playPauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            
            // Toggle Icons
            pauseIcon.style.display = isPaused ? 'none' : 'block';
            playIcon.style.display = isPaused ? 'block' : 'none';
    
            if (isPaused) {
                cancelAnimationFrame(animationFrameId);
            } else {
                // Recalculate startTime to resume smoothly
                const currentWidth = parseFloat(progressFills[currentSlide].style.width);
                startTime = performance.now() - (currentWidth / 100) * slideDuration;
                animationFrameId = requestAnimationFrame(animateProgress);
            }
        });
    }
    // Toggle Play/Pause
  

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            if (index !== currentSlide) goToSlide(index);
        });
    });

    if (slides.length > 0) goToSlide(0);

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});



/* =========================================================
   DIAMOND PRICING SECTION - VANILLA JS LOGIC (OPTIMIZED)
   ========================================================= */

   document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.priceReveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('priceVisible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Counter Animations
    const counters = document.querySelectorAll('.priceCounter');
    const animateCounters = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = counter.hasAttribute('data-decimals');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentVal = easeOut * target;
            
            if (isDecimal) {
                counter.innerText = currentVal.toFixed(1) + suffix;
            } else {
                counter.innerText = Math.floor(currentVal) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + suffix;
            }
        };
        requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters(entry.target);
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(c => counterObserver.observe(c));

    // 3. Mouse Move Tracking for Cards (Glow & 3D Tilt)
    const cards = document.querySelectorAll('.priceCard');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update custom properties for glow position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Calculate 3D tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // 4. Background Particles Generator
    const particleContainer = document.getElementById('priceParticles');
    if (particleContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('priceParticle');
            
            // Randomize size, position, and delay
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particleContainer.appendChild(particle);
        }
    }

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.priceFaqItem');
    
    faqItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const currentItem = e.currentTarget;
            const isOpen = currentItem.classList.contains('priceOpen');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('priceOpen'));
            
            // Open clicked if it wasn't open
            if (!isOpen) {
                currentItem.classList.add('priceOpen');
            }
        });
    });

    // 6. WhatsApp Integration Generator
    const whatsappBtns = document.querySelectorAll('.priceBtnWhatsapp');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = e.currentTarget.getAttribute('data-plan') || 'Custom Project';
            const category = e.currentTarget.getAttribute('data-category');
            
            let message = `Hello Diamond Team,\nI am interested in the ${plan}.`;
            if (category) {
                message += `\nSpecifically, the ${category} category.`;
            }
            message += `\nPlease provide me with more information, pricing, and the next steps.\nThank you.`;

            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/919154995314?text=${encodedMessage}`;
            
            window.open(waUrl, '_blank');
        });
    });

});
// 7. Dynamic Pricing Logic for "Useful Tool" & "Game Development"
    
    // Useful Tool
    const toolSelect = document.getElementById('toolSelect');
    const toolPrice = document.getElementById('toolPrice');
    const toolBtn = document.getElementById('toolBtn');

    if (toolSelect && toolPrice && toolBtn) {
        toolSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            
            // Animate price change slightly
            toolPrice.style.opacity = '0';
            setTimeout(() => {
                toolPrice.innerText = selectedOption.getAttribute('data-price');
                toolPrice.style.opacity = '1';
            }, 200);

            // Update WhatsApp message payload
            toolBtn.setAttribute('data-plan', `Useful Tool (${selectedOption.value})`);
        });
        
        // Add a smooth transition to the price tag
        toolPrice.style.transition = 'opacity 0.2s ease-in-out';
    }

    // Game Development
    const gameSelect = document.getElementById('gameSelect');
    const gamePrice = document.getElementById('gamePrice');
    const gameBtn = document.getElementById('gameBtn');

    if (gameSelect && gamePrice && gameBtn) {
        gameSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            
            // Animate price change slightly
            gamePrice.style.opacity = '0';
            setTimeout(() => {
                gamePrice.innerText = selectedOption.getAttribute('data-price');
                gamePrice.style.opacity = '1';
            }, 200);

            // Update WhatsApp message payload
            gameBtn.setAttribute('data-plan', `Game Development (${selectedOption.value})`);
        });
        
        // Add a smooth transition to the price tag
        gamePrice.style.transition = 'opacity 0.2s ease-in-out';
    }


    document.addEventListener("DOMContentLoaded", () => {
    
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 1. SCROLL REVEAL & ANIMATIONS (IntersectionObserver)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Trigger Counters & Gauges when Metrics Card appears
                    if (entry.target.classList.contains('metrics-card') || entry.target.classList.contains('hud-panel')) {
                        animateCounters(entry.target);
                        animateGauges(entry.target);
                    }
                    
                    // Optional: Unobserve after animating for performance
                    // observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);
    
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-up');
        revealElements.forEach(el => observer.observe(el));
    
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 2. COUNTER ANIMATION LOGIC
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        function animateCounters(parentContainer) {
            const counters = parentContainer.querySelectorAll('.counter');
            const speed = 200; // Lower is faster
    
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;
    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                // Only run if it hasn't finished yet
                if(counter.innerText === "0") {
                    updateCount();
                }
            });
        }
    
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 3. SVG GAUGE ANIMATION LOGIC
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        function animateGauges(parentContainer) {
            const circles = parentContainer.querySelectorAll('.circle');
            
            circles.forEach(circle => {
                const target = circle.getAttribute('data-target');
                // The SVG dasharray logic: "dash-length, gap-length"
                // We animate from "0, 100" to "Target, 100"
                // setTimeout ensures the browser registers the initial 0 state before transitioning
                setTimeout(() => {
                    circle.style.strokeDasharray = `${target}, 100`;
                }, 100);
            });
        }
    
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 4. MOUSE PARALLAX EFFECT
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const machineSection = document.getElementById('my-machine-section');
        const laptopContainer = document.querySelector('.laptop-container');
        if (!machineSection || !laptopContainer) return; // 👈 ADD THIS LINE
        
        machineSection.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to screen center
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            
            // Apply transform. Hardware accelerated.
            laptopContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(20px)`;
        });
    
        // Reset rotation when mouse leaves the section
        machineSection.addEventListener('mouseleave', () => {
            laptopContainer.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px)`;
        });
    
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 5. CANVAS PARTICLE ENGINE (Floating Blue Sparks)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return; // 👈 ADD THIS LINE
        const ctx = canvas.getContext('2d');
        
        let particlesArray = [];
        
        // Setup Canvas size
        function setCanvasSize() {
            const parent = canvas.parentElement;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }
        
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);
    
        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * -1 - 0.5; // Float upwards
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Reset particle if it goes off screen
                if (this.y < 0) {
                    this.y = canvas.height;
                    this.x = Math.random() * canvas.width;
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`; // Electric Blue
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#00e5ff";
                ctx.fill();
            }
        }
    
        // Initialize Particles
        function initParticles() {
            particlesArray = [];
            const numberOfParticles = 50; // Adjust for density
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
    
        // Animation Loop
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
    
        initParticles();
        animateParticles();
    });



    document.addEventListener('DOMContentLoaded', () => {
    
        // --- 1. Canvas Particle Background ---
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', () => {
            initCanvas();
            createParticles();
        });
    
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2;
                this.baseAlpha = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 243, 255, ${this.baseAlpha})`;
                ctx.fill();
            }
        }
    
        function createParticles() {
            particles = [];
            const particleCount = window.innerWidth < 768 ? 40 : 100;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
    
        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw grid lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
            ctx.lineWidth = 1;
            const gridSize = 100;
            
            for(let x = (Date.now() * 0.01) % gridSize; x < width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }
            for(let y = (Date.now() * 0.01) % gridSize; y < height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }
    
            // Draw and connect particles
            particles.forEach((p, index) => {
                p.update();
                p.draw();
                
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 243, 255, ${0.15 - dist/800})`;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animateParticles);
        }
    
        initCanvas();
        createParticles();
        animateParticles();
    
        // --- 2. 3D Hover Tilt Effect ---
        const cards = document.querySelectorAll('.glass-card');
        
        // Only apply 3D tilt on devices with hover capabilities (desktop)
        if (window.matchMedia("(hover: hover)").matches) {
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    
                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
                });
            });
        }
    
        // --- 3. Scroll Reveal & Counter Animation ---
        const revealElements = document.querySelectorAll('.scroll-reveal');
        const counters = document.querySelectorAll('.counter-value');
        let countersAnimated = false;
    
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // Ease out cubic
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    obj.innerHTML = end; // Ensure exact final value
                }
            };
            window.requestAnimationFrame(step);
        }
    
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // If it's the featured card triggering, animate its counters
                    if (entry.target.classList.contains('featured-wrapper') && !countersAnimated) {
                        counters.forEach(counter => {
                            const target = parseInt(counter.getAttribute('data-target'));
                            animateValue(counter, 0, target, 2000);
                        });
                        countersAnimated = true;
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    
        revealElements.forEach(el => observer.observe(el));
    });


    /**
 * DIAMOND - Contact Section Logic
 * Pure Vanilla JS - No Frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParticles();
    initParallax();
    initRippleEffect();
});

/* ========================================================
   1. INTERSECTION OBSERVER (Scroll Reveal)
   ======================================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay based on index for grid elements
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); 
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
}

/* ========================================================
   2. PARTICLE BACKGROUND SYSTEM (GPU Optimized Canvas)
   ======================================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 238, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particle array
    const particleCount = Math.floor(window.innerWidth / 15);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ========================================================
   3. MOUSE PARALLAX EFFECT (Left Profile Card)
   ======================================================== */
function initParallax() {
    const container = document.querySelector('.parallax-container');
    const card = document.querySelector('.profile-card');

    if (!container || !card) return;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        card.style.transition = `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`;
    });

    container.addEventListener('mouseenter', () => {
        card.style.transition = `none`; // Remove transition for smooth immediate tracking
    });
}

/* ========================================================
   4. RIPPLE CLICK EFFECT (Premium UI Interaction)
   ======================================================== */
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.ripple-surface');

    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Make ripple large enough to cover the element
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x - size / 2}px`;
            ripple.style.top = `${y - size / 2}px`;

            this.appendChild(ripple);

            // Clean up DOM after animation finishes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}
/**
 * DIAMOND DOWNLOADS JS
 * Premium Interactive Ecosystem Engine
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATA ARCHITECTURE ---
    const dDlApps = [
        // Windows
        { id: 'summonizer', name: 'summonizer', platform: 'Windows', filename: 'summonizer.exe', version: '1.0.0', description: 'Advanced system automation and process summoning engine.', category: 'Developer Tools', size: '18 MB', year: 2026, dev: 'Diamond', downloads: '15+', rating: 4.8, featured: false, icon: '/assets/appicons/summonizer.ico' },
        { id: 'watrex', name: 'watrex', platform: 'Windows', filename: 'watrex.exe', version: '2.1.4', description: 'Real-time performance monitoring and hardware analytics.', category: 'Utilities', size: '32 MB', year: 2025, dev: 'Diamond', downloads: '42+', rating: 4.9, featured: false, icon: '/assets/appicons/watrex.ico' },
        { id: 'alarm_app', name: 'alarm_app', platform: 'Windows', filename: 'alarm_app.exe', version: '3.0.1', description: 'Precision scheduling and macro-triggered alarms.', category: 'Productivity', size: '12 MB', year: 2024, dev: 'Diamond', downloads: '8+', rating: 4.5, featured: false, icon: '/assets/appicons/alarmapp.ico' },
    
        // Android (Featured + Others)
        { id: 'sam-protocol', name: 'The 5am Protocol', platform: 'Android', filename: 'The 5am Protocol.apk', version: '4.5.0', description: 'The ultimate enterprise security suite.', category: 'Utilities', size: '54 MB', year: 2026, dev: 'Diamond', downloads: '100+', rating: 5.0, featured: false, icon: '/assets/appicons/the5amprotocol.png', features: ['Quantum Encryption', 'Live Monitoring', 'Zero-Latency UI'] },
        { id: 'notex', name: 'NoteX', platform: 'Android', filename: 'NoteX.apk', version: '5.1.2', description: 'High-performance markdown notes with cloud sync. Your thoughts, organized, secure, and accessible everywhere.', category: 'Productivity', size: '15 MB', year: 2023, dev: 'Diamond', downloads: '200+', rating: 4.9, featured: true, icon: '/assets/appicons/notex.png', features: ['Cloud Sync', 'Markdown Support', 'Offline Mode'] },
        { id: 'aaj-kya-banega', name: 'Aaj Kya Banega', platform: 'Android', filename: 'Aaj Kya Banega.apk', version: '1.2.0', description: 'AI meal planning. Solves the daily dilemma of what to cook.', category: 'Productivity', size: '24 MB', year: 2026, dev: 'Diamond', downloads: '25+', rating: 4.7, featured: false, icon: '/assets/appicons/aajkyabanega.png' },
        { id: 'cywalk', name: 'Cywalk', platform: 'Android', filename: 'Cywalk.apk', version: '2.0.0', description: 'Cyberpunk-themed fitness and step tracking gamification.', category: 'Entertainment', size: '88 MB', year: 2025, dev: 'Diamond', downloads: '50+', rating: 4.8, featured: false, icon: '/assets/appicons/cywalk.png' },
        { id: 'dnotes', name: 'DNotes', platform: 'Android', filename: 'DNotes.apk', version: '1.0.5', description: 'Minimalist scratchpad for rapid thought capturing.', category: 'Productivity', size: '5 MB', year: 2026, dev: 'Diamond', downloads: '5+', rating: 4.4, featured: false, icon: '/assets/appicons/dnotes.png' },
        { id: 'pibond', name: 'PiBond', platform: 'Android', filename: 'PiBond.apk', version: '1.8.0', description: 'Educational tool for chemistry and molecular bonding.', category: 'Education', size: '40 MB', year: 2024, dev: 'Diamond', downloads: '12+', rating: 4.6, featured: false, icon: '/assets/appicons/pibond.png' },
        { id: 'wordspy', name: 'WordSpy', platform: 'Android', filename: 'WordSpy.apk', version: '3.3.0', description: 'Advanced dictionary and vocabulary builder.', category: 'Education', size: '28 MB', year: 2024, dev: 'Diamond', downloads: '30+', rating: 4.7, featured: false, icon: '/assets/appicons/wordspy.png' },
        { id: 'musify-pro', name: 'Musify Pro', platform: 'Android', filename: 'Musify Pro.apk', version: '2.5.0', description: 'High-fidelity audio player with custom DSP.', category: 'Entertainment', size: '35 MB', year: 2025, dev: 'Diamond', downloads: '150+', rating: 4.9, featured: false, icon: '/assets/appicons/musifypro.png' },
        { id: 'diamond-v3', name: 'Diamond Company V3', platform: 'Android', filename: 'Diamond Company V3.apk', version: '3.0.0', description: 'Internal portal and employee management system.', category: 'Utilities', size: '60 MB', year: 2026, dev: 'Diamond', downloads: '10+', rating: 5.0, featured: false, icon: '/assets/appicons/diamondcompanyv3.png' },
        { id: 'laptop-seekho', name: 'Laptop Seekho', platform: 'Android', filename: 'Laptop Seekho.apk', version: '1.1.0', description: 'Interactive tutorials for mastering computer hardware.', category: 'Education', size: '45 MB', year: 2025, dev: 'Diamond', downloads: '18+', rating: 4.8, featured: false, icon: '/assets/appicons/laptopseekho.png' }
    ];

    // --- 2. RENDER ENGINE ---
    const featuredContainer = document.getElementById('d-dl-featured-container');
    const gridContainer = document.getElementById('d-dl-apps-grid');

    function createBadge(platform) {
        const cls = platform === 'Android' ? 'd-dl-badge-android' : 'd-dl-badge-windows';
        return `<span class="d-dl-badge ${cls}">${platform}</span>`;
    }

    function renderApps() {
        featuredContainer.innerHTML = '';
        gridContainer.innerHTML = '';
        
        
        dDlApps.forEach((app, index) => {
            const delay = index * 0.05; // Staggered animation
            
            if (app.featured) {
                featuredContainer.innerHTML = `
                    <div class="d-dl-featured-card d-dl-animate-in" data-id="${app.id}">
                        <div class="d-dl-featured-icon">
                        <img src="${app.icon}" alt="${app.name} Logo" class="d-dl-app-logo">
                        </div>
                        <div class="d-dl-featured-info">
                            ${createBadge(app.platform)}
                            <span class="d-dl-badge d-dl-badge-diamond">Verified by Diamond ✓</span>
                            <h2 class="d-dl-featured-title">${app.name} <span style="font-size:1.2rem; color:var(--d-dl-text-muted)">v${app.version}</span></h2>
                            <p class="d-dl-featured-desc">${app.description}</p>
                            <div class="d-dl-featured-features">
                                ${app.features.map(f => `<span>• ${f}</span>`).join('')}
                            </div>
                            <div class="d-dl-btn-group" style="max-width: 400px;">
                                <button class="d-dl-btn d-dl-btn-primary" onclick="window.dDlTriggerDownload('${app.id}', this)">
                                    <span class="d-dl-btn-text">Download ${app.size}</span>
                                    <div class="d-dl-loader"></div>
                                </button>
                                <button class="d-dl-btn d-dl-btn-secondary" onclick="window.dDlOpenModal('${app.id}')">More Details</button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                const card = document.createElement('div');
                card.className = 'd-dl-card d-dl-animate-in';
                card.style.animationDelay = `${delay}s`;
                card.setAttribute('data-id', app.id);
                card.setAttribute('data-platform', app.platform);
                card.setAttribute('data-category', app.category);
                
                card.innerHTML = `
                    <div class="d-dl-card-content">
                        <div class="d-dl-card-header">
                            <div class="d-dl-card-icon">
                            <img src="${app.icon}" alt="${app.name} Logo" class="d-dl-app-logo">
                        </div>
                            ${createBadge(app.platform)}
                        </div>
                        <h3 class="d-dl-card-title">${app.name}</h3>
                        <p class="d-dl-card-developer">${app.dev} <span class="d-dl-verified-icon">✓</span> • v${app.version}</p>
                        <p class="d-dl-card-desc">${app.description}</p>
                        <div class="d-dl-card-meta">
                            <span>↓ ${app.downloads}</span>
                            <span>★ ${app.rating}</span>
                        </div>
                        <div class="d-dl-btn-group">
                            <button class="d-dl-btn d-dl-btn-primary" onclick="window.dDlTriggerDownload('${app.id}', this)">
                                <span class="d-dl-btn-text">Download</span>
                                <div class="d-dl-loader"></div>
                            </button>
                            <button class="d-dl-btn d-dl-btn-secondary" onclick="window.dDlOpenModal('${app.id}')">Details</button>
                        </div>
                    </div>
                `;
                gridContainer.appendChild(card);
            }
        });
        
        init3DHoverEffects();
    }

    // --- 3. PHYSICS & INTERACTION ENGINE ---
    function init3DHoverEffects() {
        const cards = document.querySelectorAll('.d-dl-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Mouse Lighting
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                // 3D Tilt
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
                const rotateY = ((x - centerX) / centerX) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // --- 4. DOWNLOAD UX & TOAST ---
    const toast = document.getElementById('d-dl-toast');
    window.dDlTriggerDownload = function(appId, btnElement) {
        if(btnElement.classList.contains('d-dl-loading')) return;
        
        const app = dDlApps.find(a => a.id === appId);
        const btnText = btnElement.querySelector('.d-dl-btn-text');
        const originalText = btnText.innerText;
        
        // UX: Preparing
        btnElement.classList.add('d-dl-loading');
        btnText.innerText = 'Preparing...';
        
        setTimeout(() => {
            // UX: Started
            btnElement.classList.remove('d-dl-loading');
            btnText.innerText = 'Started ✓';
            
            // Show Toast
            toast.classList.add('d-dl-show');
            setTimeout(() => toast.classList.remove('d-dl-show'), 4000);
            
            // Trigger actual download securely
            const a = document.createElement('a');
            a.href = `apps/${app.filename}`;
            a.download = app.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Reset Button
            setTimeout(() => { btnText.innerText = originalText; }, 3000);
            
        }, 1200); // Premium artificial delay for "processing" feel
    };

    // --- 5. MODAL SYSTEM ---
    const modal = document.getElementById('d-dl-modal');
    const modalBody = document.getElementById('d-dl-modal-body');
    const closeBtn = document.getElementById('d-dl-modal-close');

    window.dDlOpenModal = function(appId) {
        const app = dDlApps.find(a => a.id === appId);
        modalBody.innerHTML = `
            <div class="d-dl-modal-header">
                <div class="d-dl-modal-icon">
                <img src="${app.icon}" alt="${app.name} Logo" class="d-dl-app-logo">
                </div>
                <div>
                    ${createBadge(app.platform)} <span class="d-dl-badge d-dl-badge-diamond">Verified</span>
                    <h2 style="font-size: 2.5rem; margin: 5px 0;">${app.name}</h2>
                    <p style="color: var(--d-dl-text-muted); font-size: 1.1rem; margin:0;">Version ${app.version} • Released ${app.year}</p>
                </div>
            </div>
            <div style="line-height: 1.8; font-size: 1.1rem; color: #eee; margin-bottom: 30px;">
                ${app.description}
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--d-dl-glass-border); padding-top: 20px; margin-bottom: 30px; color: var(--d-dl-text-muted);">
                <div><strong>Category:</strong> ${app.category}</div>
                <div><strong>Size:</strong> ${app.size}</div>
                <div><strong>Downloads:</strong> ${app.downloads}</div>
            </div>
            <button class="d-dl-btn d-dl-btn-primary" style="width: 100%; padding: 18px; font-size: 1.1rem;" onclick="window.dDlTriggerDownload('${app.id}', this)">
                <span class="d-dl-btn-text">Download for ${app.platform}</span>
                <div class="d-dl-loader"></div>
            </button>
        `;
        modal.classList.add('d-dl-active');
    };

    closeBtn.addEventListener('click', () => modal.classList.remove('d-dl-active'));
    modal.addEventListener('click', (e) => {
        if(e.target === modal) modal.classList.remove('d-dl-active');
    });

    // --- 6. FILTER & SEARCH ENGINE ---
    const searchInput = document.getElementById('d-dl-search');
    const filterBtns = document.querySelectorAll('.d-dl-filter-btn');

    function filterApps() {
        const query = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.d-dl-filter-btn.d-dl-active').getAttribute('data-filter');
        const cards = document.querySelectorAll('.d-dl-card, .d-dl-featured-card');

        cards.forEach(card => {
            const id = card.getAttribute('data-id');
            const app = dDlApps.find(a => a.id === id);
            
            const matchesSearch = app.name.toLowerCase().includes(query) || 
                                  app.description.toLowerCase().includes(query) ||
                                  app.category.toLowerCase().includes(query);
            
            const matchesFilter = activeFilter === 'All' || 
                                  app.platform === activeFilter || 
                                  app.category === activeFilter;

            if (matchesSearch && matchesFilter) {
                card.classList.remove('d-dl-hidden-card');
            } else {
                card.classList.add('d-dl-hidden-card');
            }
        });
    }

    searchInput.addEventListener('input', filterApps);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('d-dl-active'));
            btn.classList.add('d-dl-active');
            filterApps();
        });
    });

    // --- 7. NUMBER COUNTER ANIMATION ---
    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-target'));
                let startVal = 0;
                const duration = 2000;
                const stepTime = Math.abs(Math.floor(duration / endVal)) || 20;
                
                const timer = setInterval(() => {
                    startVal += Math.ceil(endVal / 50);
                    if (startVal >= endVal) {
                        target.innerText = endVal;
                        clearInterval(timer);
                    } else {
                        target.innerText = startVal;
                    }
                }, stepTime);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.d-dl-stat-num').forEach(num => statObserver.observe(num));

    // --- 8. CANVAS NEURAL NETWORK BACKGROUND ---
    const canvas = document.getElementById('d-dl-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
        // Tie canvas strictly to the wrapper dimensions
        const wrapper = document.getElementById('d-dl-wrapper');
        width = canvas.width = wrapper.offsetWidth;
        height = canvas.height = wrapper.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fill();
        }
    }

    function initCanvas() {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        particles = Array.from({ length: 80 }, () => new Particle());
        animateCanvas();
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            // Connect nearby particles
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 174, 239, ${0.15 - dist/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateCanvas);
    }

    const downloadsWrapper = document.getElementById('d-dl-wrapper');
    if (downloadsWrapper) { // 👈 Wrap the boot sequence
        renderApps();
        initCanvas();
    }
});


/**
 * ==========================================
 * DIAMOND - CUSTOM SOLUTIONS LOGIC
 * ==========================================
 */

// Prefix validation: All functions, vars, objects start with 'sell'

const sellPricesMap = {
    "Hardware Engineering": "₹999+",
    "Mechanical Systems & Robotics": "₹999+",
    "Artificial Intelligence": "₹1,999+",
    "Business & Entrepreneurship": "₹999+",
    "Innovation Lab": "₹1,499+",
    "Marketing & Branding": "₹999+",
    "Media Production": "₹1,499+",
    "Programming & Software": "₹1,999+",
    "Full Stack Engineering": "₹2,499+",
    "Productivity Systems": "₹1,999+",
    "Skill Exploration": "₹999+",
    "Competitive Gaming & Testing": "₹999+",
    "Research & Development": "₹999+",
    "Product & Brand Engineering": "₹999+",
    "Cyber Security & Privacy": "₹2,499+",
    "Ethical Hacking": "₹2,499+"
};

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
    sellInit();
});

function sellInit() {
    sellInitAnimations();
    sellInitTiltEffects();
    sellInitParallax();
    
    // Bind form submission
    const sellForm = document.getElementById("sellForm");
    if (sellForm) {
        sellForm.addEventListener("submit", sellSubmitForm);
    }
}

// 1. Intersection Observer for Smooth Fade-Up Animations
function sellInitAnimations() {
    const sellObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sellObserver = new IntersectionObserver((sellEntries) => {
        sellEntries.forEach(sellEntry => {
            if (sellEntry.isIntersecting) {
                sellEntry.target.classList.add('sellInView');
                // Optional: Unobserve after animating once
                // sellObserver.unobserve(sellEntry.target);
            }
        });
    }, sellObserverOptions);

    const sellElements = document.querySelectorAll('.sellFadeUp');
    sellElements.forEach(sellEl => sellObserver.observe(sellEl));
}

// 2. 3D Hover Tilt Effect for Cards
function sellInitTiltEffects() {
    const sellCards = document.querySelectorAll('.sellCard');
    
    sellCards.forEach(sellCard => {
        sellCard.addEventListener('mousemove', (e) => {
            const sellRect = sellCard.getBoundingClientRect();
            const sellX = e.clientX - sellRect.left;
            const sellY = e.clientY - sellRect.top;
            const sellCenterX = sellRect.width / 2;
            const sellCenterY = sellRect.height / 2;
            
            // Calculate rotation (adjust multiplier for intensity)
            const sellRotateX = ((sellY - sellCenterY) / sellCenterY) * -5;
            const sellRotateY = ((sellX - sellCenterX) / sellCenterX) * 5;
            
            sellCard.style.transform = `perspective(1000px) rotateX(${sellRotateX}deg) rotateY(${sellRotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        sellCard.addEventListener('mouseleave', () => {
            sellCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

// 3. Mouse Parallax for Background Blobs
function sellInitParallax() {
    const sellSection = document.getElementById('sellSection');
    const sellBlobs = document.querySelectorAll('.sellBlob');

    if(!sellSection) return;

    sellSection.addEventListener('mousemove', (e) => {
        const sellWidth = window.innerWidth;
        const sellHeight = window.innerHeight;
        const sellOffsetX = (e.clientX / sellWidth) - 0.5;
        const sellOffsetY = (e.clientY / sellHeight) - 0.5;

        sellBlobs.forEach((sellBlob, sellIndex) => {
            const sellSpeed = (sellIndex + 1) * 30;
            const sellMoveX = sellOffsetX * sellSpeed;
            const sellMoveY = sellOffsetY * sellSpeed;
            sellBlob.style.transform = `translate(${sellMoveX}px, ${sellMoveY}px)`;
        });
    });
}

// 4. Select Service from Card Button
function sellSelectService(sellServiceName) {
    const sellDropdown = document.getElementById("sellSelect");
    if(sellDropdown) {
        sellDropdown.value = sellServiceName;
        sellUpdatePrice();
        
        // Smooth scroll to form
        const sellFormElement = document.querySelector('.sellFormWrapper');
        if(sellFormElement) {
            sellFormElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight select briefly
            sellDropdown.focus();
        }
    }
}

// 5. Live Price Update Logic
function sellUpdatePrice() {
    const sellSelect = document.getElementById("sellSelect");
    const sellPriceBox = document.getElementById("sellPriceDisplayBox");
    const sellLivePrice = document.getElementById("sellLivePrice");

    if (sellSelect && sellSelect.value) {
        const sellSelectedService = sellSelect.value;
        const sellPriceValue = sellPricesMap[sellSelectedService] || "Custom Quotation";
        
        // Animate price change
        sellLivePrice.style.opacity = '0';
        sellLivePrice.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            sellLivePrice.textContent = sellPriceValue;
            sellLivePrice.style.opacity = '1';
            sellLivePrice.style.transform = 'translateY(0)';
        }, 200);

        sellPriceBox.classList.add('sellActive');
        sellRemoveError("sellSelect");
    }
}

// 6. Smooth Scroll to External/Existing Section
function sellScrollBuildWebsite() {
    // Scrolls to the ID requested by the user, assuming it exists outside this code block
    const sellTarget = document.querySelector('#priceSection');
    if (sellTarget) {
        sellTarget.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.warn('Target #priceSection not found on page.');
    }
}

// 7. Form Validation
function sellValidateForm() {
    let sellIsValid = true;
    
    // Fields to validate
    const sellName = document.getElementById('sellName');
    const sellEmail = document.getElementById('sellEmail');
    const sellSelect = document.getElementById('sellSelect');
    const sellDesc = document.getElementById('sellDescription');

    // Reset previous errors
    document.querySelectorAll('.sellField').forEach(f => f.classList.remove('sellInvalid'));

    if (!sellName.value.trim()) {
        sellShowError('sellName');
        sellIsValid = false;
    }

    const sellEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!sellEmail.value.trim() || !sellEmailPattern.test(sellEmail.value)) {
        sellShowError('sellEmail');
        sellIsValid = false;
    }

    if (!sellSelect.value) {
        sellShowError('sellSelect');
        sellIsValid = false;
    }

    if (!sellDesc.value.trim()) {
        sellShowError('sellDescription');
        sellIsValid = false;
    }

    return sellIsValid;
}

function sellShowError(sellInputId) {
    const sellInput = document.getElementById(sellInputId);
    if(sellInput) {
        sellInput.closest('.sellField').classList.add('sellInvalid');
        
        // Add listener to remove error on input
        sellInput.addEventListener('input', function sellTempListener() {
            sellRemoveError(sellInputId);
            sellInput.removeEventListener('input', sellTempListener);
        });
    }
}

function sellRemoveError(sellInputId) {
    const sellInput = document.getElementById(sellInputId);
    if(sellInput) {
        sellInput.closest('.sellField').classList.remove('sellInvalid');
    }
}

// 8. WhatsApp Generation & Submission
function sellSubmitForm(e) {
    e.preventDefault();
    
    if (sellValidateForm()) {
        sellGenerateWhatsApp();
    }
}

function sellGenerateWhatsApp() {
    // Get Text Values
    const sellName = document.getElementById('sellName').value.trim();
    const sellCompany = document.getElementById('sellCompany').value.trim() || 'N/A';
    const sellEmail = document.getElementById('sellEmail').value.trim();
    const sellPhone = document.getElementById('sellPhone').value.trim() || 'N/A';
    const sellCountry = document.getElementById('sellCountry').value.trim() || 'N/A';
    const sellService = document.getElementById('sellSelect').value;
    const sellBudget = document.getElementById('sellBudget').value.trim() || 'Not specified';
    const sellTimeline = document.getElementById('sellTimeline').value.trim() || 'Not specified';
    const sellDesc = document.getElementById('sellDescription').value.trim();

    // Get Checkbox Values
    const sellConsultation = document.getElementById('sellCheckConsultation').checked ? 'Yes' : 'No';
    const sellUrgent = document.getElementById('sellCheckUrgent').checked ? 'Yes' : 'No';
    const sellSupport = document.getElementById('sellCheckSupport').checked ? 'Yes' : 'No';
    const sellNDA = document.getElementById('sellCheckNDA').checked ? 'Yes' : 'No';
    const sellPrototype = document.getElementById('sellCheckPrototype').checked ? 'Yes' : 'No';

    // Construct Message
    const sellMessageStr = 
`Hello DIAMOND,

I would like to request a custom project.

Name: ${sellName}
Company: ${sellCompany}
Email: ${sellEmail}
Phone: ${sellPhone}
Country: ${sellCountry}

Selected Service: ${sellService}

Estimated Budget: ${sellBudget}

Timeline: ${sellTimeline}

Need Consultation: ${sellConsultation}
Need Urgent Delivery: ${sellUrgent}
Need Ongoing Support: ${sellSupport}
Need NDA: ${sellNDA}
Need Prototype First: ${sellPrototype}

Project Description:
${sellDesc}

Thank you.`;

    // Encode and redirect
    const sellEncodedMessage = encodeURIComponent(sellMessageStr);
    const sellWhatsAppNumber = "919154995314"; // E.164 format without '+'
    const sellWhatsAppUrl = `https://wa.me/${sellWhatsAppNumber}?text=${sellEncodedMessage}`;

    // Add button loading state
    const sellBtn = document.getElementById('sellSubmitBtn');
    const sellBtnOriginalText = sellBtn.innerHTML;
    sellBtn.innerHTML = 'Opening WhatsApp...';
    sellBtn.style.opacity = '0.8';
    
    setTimeout(() => {
        window.open(sellWhatsAppUrl, '_blank');
        sellBtn.innerHTML = sellBtnOriginalText;
        sellBtn.style.opacity = '1';
    }, 800);
}
// --- CODING LANGUAGES SECTION LOGIC ---

document.addEventListener("DOMContentLoaded", () => {
    // Grab all the cards using our highly specific class name
    const langCards = document.querySelectorAll('.coding-lang-card');
  
    // Create an Intersection Observer to watch when cards enter the screen
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Triggers when 10% of the card is visible
    };
  
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a slight delay based on the index for a "staggered" cascade effect
          setTimeout(() => {
            entry.target.classList.add('coding-lang-visible');
          }, index * 100); // 100ms delay between each card
          
          // Stop observing once it has been revealed
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Tell the observer to watch every card
    langCards.forEach(card => {
      cardObserver.observe(card);
    });
  });

// --- DIAMOND Site Assistant ---
document.addEventListener('DOMContentLoaded', () => {
    const chat = document.getElementById('diamond-chat');
    const launcher = document.getElementById('diamond-chat-launcher');
    const windowEl = document.getElementById('diamond-chat-window');
    const close = chat?.querySelector('.diamond-chat-close');
    const form = document.getElementById('diamond-chat-form');
    const input = document.getElementById('diamond-chat-input');
    const messages = document.getElementById('diamond-chat-messages');
    if (!chat || !launcher || !windowEl || !form || !input || !messages) return;

    const openChat = () => { chat.classList.add('is-open'); launcher.setAttribute('aria-expanded', 'true'); windowEl.setAttribute('aria-hidden', 'false'); setTimeout(() => input.focus(), 180); };
    const closeChat = () => { chat.classList.remove('is-open'); launcher.setAttribute('aria-expanded', 'false'); windowEl.setAttribute('aria-hidden', 'true'); };
    document.querySelectorAll('[data-chat-open]').forEach(button => button.addEventListener('click', openChat));
    close.addEventListener('click', closeChat);

    const addMessage = (text, type) => { const bubble = document.createElement('div'); bubble.className = `diamond-chat-message ${type}`; bubble.textContent = text; messages.appendChild(bubble); messages.scrollTop = messages.scrollHeight; };
    const navigate = (selector, reply) => { document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); addMessage(reply, 'bot'); };
    const replyTo = (question) => {
        const query = question.toLowerCase().trim();
        if (/^(hi|hello|hey)\b/.test(query)) return 'Hey! I can help you explore DIAMOND, its services, products, apps, and ways to get in touch.';
        if (/(what.*(do|is)|about|company|diamond)/.test(query)) return 'DIAMOND is a technology and engineering studio turning ideas into digital products, AI solutions, robotics, automation, custom hardware, websites, apps, and games.';
        if (/(service|custom|hardware|robot|ai|artificial intelligence|mechanical)/.test(query)) { navigate('#priceSection', 'Taking you to Custom Solutions. DIAMOND builds AI, hardware and IoT, robotics, mechanical systems, websites, apps, and fully custom projects.'); return null; }
        if (/(website|price|cost|quote|build)/.test(query)) { navigate('#priceSection', 'Taking you to the website builder and pricing area. Prices are starting estimates; each project is tailored to its features, timeline, and requirements.'); return null; }
        if (/(product)/.test(query)) { navigate('#diamondproducts-section', 'Taking you to DIAMOND Products. You can explore the work and projects built by the team there.'); return null; }
        if (/(app|download)/.test(query)) { navigate('#d-dl-wrapper', 'Taking you to DIAMOND Downloads, where you can explore the available applications.'); return null; }
        if (/(industr)/.test(query)) { navigate('#indusSection', 'Taking you to the capabilities index, which maps the industries and technology areas DIAMOND works across.'); return null; }
        if (/(contact|email|phone|whatsapp|talk|hire)/.test(query)) { navigate('#contact', 'Taking you to Contact. You can reach DIAMOND by WhatsApp at +91 9154995314 or email adityasonihyderabad@gmail.com.'); return null; }
        if (/(team|aditya|founder)/.test(query)) return 'DIAMOND is led by a multidisciplinary team focused on engineering, design, growth, and modern applications. Aditya Soni is the engineer behind solutions spanning software, AI, embedded systems, robotics, automation, and digital experiences.';
        if (/(navigate|go to|show me|where)/.test(query)) return 'I can take you to Services, Build Your Website, Products, Apps, Industries, or Contact. Just name one.';
        return 'I can help with DIAMOND’s services, websites, AI, robotics, products, apps, industries, team, or contact details. Try asking “What do you do?” or “Take me to services.”';
    };
    const send = (question) => { const cleaned = question.trim(); if (!cleaned) return; addMessage(cleaned, 'user'); input.value = ''; const answer = replyTo(cleaned); if (answer) window.setTimeout(() => addMessage(answer, 'bot'), 220); };
    form.addEventListener('submit', event => { event.preventDefault(); send(input.value); });
    chat.querySelectorAll('[data-chat-question]').forEach(button => button.addEventListener('click', () => send(button.dataset.chatQuestion)));

    let dragging = false, moved = false, offsetX = 0, offsetY = 0, startX = 0, startY = 0;
    launcher.addEventListener('pointerdown', event => { if (event.button !== 0) return; dragging = true; moved = false; startX = event.clientX; startY = event.clientY; const rect = chat.getBoundingClientRect(); offsetX = event.clientX - rect.left; offsetY = event.clientY - rect.top; launcher.setPointerCapture(event.pointerId); });
    launcher.addEventListener('pointermove', event => { if (!dragging) return; const maxX = window.innerWidth - chat.offsetWidth, maxY = window.innerHeight - chat.offsetHeight; const x = Math.max(8, Math.min(event.clientX - offsetX, maxX - 8)); const y = Math.max(8, Math.min(event.clientY - offsetY, maxY - 8)); chat.style.left = `${x}px`; chat.style.top = `${y}px`; chat.style.right = 'auto'; chat.style.bottom = 'auto'; moved ||= Math.hypot(event.clientX - startX, event.clientY - startY) > 5; });
    launcher.addEventListener('pointerup', event => { if (!dragging) return; dragging = false; launcher.releasePointerCapture?.(event.pointerId); if (!moved) chat.classList.contains('is-open') ? closeChat() : openChat(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && chat.classList.contains('is-open')) closeChat(); });
});
