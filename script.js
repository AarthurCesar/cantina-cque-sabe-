// ============================================
// Cantina C'que Sabe — Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Scroll reveal animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.sobre-grid, .menu-card, .ambiente-card, .depoimento-card, .cta-box, .contato-grid, .section-header'
    );
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Stagger menu cards
    document.querySelectorAll('.menu-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    document.querySelectorAll('.depoimento-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.15}s`;
    });

    // --- Form handling — envia para WhatsApp ---
    const form = document.getElementById('contatoForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = form.querySelector('input[type="text"]').value;
            const telefone = form.querySelector('input[type="tel"]').value;
            const data = form.querySelector('input[type="date"]').value;
            const pessoas = form.querySelector('input[type="number"]').value;
            const obs = form.querySelector('textarea').value;

            const dataFormatada = data ? new Date(data + 'T12:00:00').toLocaleDateString('pt-BR') : '';

            let mensagem = `Olá! Gostaria de fazer uma reserva na Cantina C'que Sabe.\n\n`;
            mensagem += `*Nome:* ${nome}\n`;
            mensagem += `*Telefone:* ${telefone}\n`;
            mensagem += `*Data:* ${dataFormatada}\n`;
            mensagem += `*Pessoas:* ${pessoas}\n`;
            if (obs) mensagem += `*Observações:* ${obs}\n`;

            const url = `https://wa.me/5511998409685?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');

            form.reset();
            }, 1200);
        });
    }

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
});
