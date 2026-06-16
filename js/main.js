/**
 * Anderson Arthur - Portfolio
 * Interatividade do portfólio
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const revealElements = document.querySelectorAll('.reveal');
    const yearSpan = document.getElementById('year');

    // Atualiza ano no footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ========================================
    // Menu Mobile
    // ========================================
    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Fecha menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // Header com efeito ao scroll
    // ========================================
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Verifica estado inicial

    // ========================================
    // Botão Voltar ao Topo
    // ========================================
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Navegação ativa baseada na seção visível
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Se estiver no topo, ativa o início
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Verifica estado inicial

    // ========================================
    // Scroll Reveal (animação ao rolar)
    // ========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: parar de observar após revelar
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((element, index) => {
        // Adiciona delay escalonado para elementos irmãos
        const siblings = Array.from(element.parentElement?.children || []);
        const siblingIndex = siblings.indexOf(element);
        element.style.transitionDelay = `${siblingIndex * 0.1}s`;
        
        revealObserver.observe(element);
    });

    // ========================================
    // Efeito de digitação no hero (opcional)
    // ========================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.minHeight = '1.2em';
        
        let charIndex = 0;
        const typeSpeed = 80;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Inicia após um pequeno delay
        setTimeout(typeWriter, 500);
    }

    // ========================================
    // Efeito de partículas sutis no hero
    // ========================================
    function createParticle() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(249, 115, 22, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            z-index: 0;
        `;
        
        hero.appendChild(particle);
        
        // Remove após a animação
        setTimeout(() => {
            particle.remove();
        }, 20000);
    }

    // Adiciona estilo da animação de partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Cria partículas periodicamente (limitado para não sobrecarregar)
    let particleCount = 0;
    const maxParticles = 15;
    const particleInterval = setInterval(() => {
        if (particleCount < maxParticles) {
            createParticle();
            particleCount++;
        } else {
            clearInterval(particleInterval);
        }
    }, 800);

    // ========================================
    // Animação de contador para badges
    // ========================================
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // ========================================
    // Smooth scroll para links internos
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // Prevenção de flash de conteúdo não revelado
    // ========================================
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
