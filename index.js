document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            document.getElementById('navLinks').classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            document.getElementById('navLinks').classList.remove('active');
        });
    });

    // Contact Modal - open triggers
    document.querySelectorAll('.contact-trigger').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            openContactModal();
        });
    });

    // Contact Modal - close button
    const modalCloseBtn = document.querySelector('.contact-modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeContactModal);
    }

    // Contact Modal - backdrop click
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.addEventListener('click', function (e) {
            if (e.target === this) closeContactModal();
        });
    }

    // Contact form submit
    const contactForm = document.querySelector('#contactModal form');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }

    // Measure header height once, shared by all sticky-top adjustments
    const pageHeader = document.querySelector('header');

    // Sticky hero: keep video pinned below header while intro-band scrolls over it
    const stickyHero = document.querySelector('.hero-section');
    if (stickyHero && pageHeader) {
        function updateHeroSticky() {
            stickyHero.style.top = pageHeader.offsetHeight + 'px';
        }
        updateHeroSticky();
        window.addEventListener('load', updateHeroSticky);
        window.addEventListener('resize', updateHeroSticky);
    }

    // Sticky carousel column: pins left column below header (clients page only)
    const carouselCol = document.querySelector('.carousel-column');
    if (carouselCol && pageHeader) {
        function updateCarouselSticky() {
            carouselCol.style.top = (pageHeader.offsetHeight + 24) + 'px';
        }
        updateCarouselSticky();
        window.addEventListener('load', updateCarouselSticky);
        window.addEventListener('resize', updateCarouselSticky);
    }

    // Sticky doodle column: pins right column below header (about page only)
    const aboutDoodleCol = document.querySelector('.about-doodle-column');
    if (aboutDoodleCol && pageHeader) {
        function updateAboutDoodleSticky() {
            aboutDoodleCol.style.top = (pageHeader.offsetHeight + 24) + 'px';
        }
        updateAboutDoodleSticky();
        window.addEventListener('load', updateAboutDoodleSticky);
        window.addEventListener('resize', updateAboutDoodleSticky);
    }

    // Clip intro-band text as it scrolls behind the hero h1 (index page only)
    const introBand = document.querySelector('.intro-band');
    const heroTitleEl = document.querySelector('.hero-title');
    if (introBand && heroTitleEl) {
        function updateIntroBandClip() {
            const overlap = heroTitleEl.getBoundingClientRect().bottom
                          - introBand.getBoundingClientRect().top;
            introBand.style.clipPath = overlap > 0
                ? `inset(${Math.ceil(overlap)}px 0 0 0)`
                : '';
        }
        window.addEventListener('scroll', updateIntroBandClip, { passive: true });
    }

    // Hero video half-speed (index + clients pages)
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.playbackRate = 0.5;
        heroVideo.addEventListener('canplay', () => { heroVideo.playbackRate = 0.5; });
    }

    // How I Work fade-in (index page only)
    const howIWorkBand = document.querySelector('.how-i-work-band');
    if (howIWorkBand) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(howIWorkBand);
    }

    // Services Provided fade-in (index page only)
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(servicesSection);
    }

    // Fade hero title as clients-layout scrolls over it (clients page only)
    const heroTitleDiv = document.querySelector('.hero-section .hero-title');
    const clientsLayout = document.querySelector('.clients-layout');
    if (heroTitleDiv && clientsLayout) {
        function updateHeroTitleFade() {
            const layoutTop = clientsLayout.getBoundingClientRect().top;
            const titleTop = heroTitleDiv.getBoundingClientRect().top;
            const titleBottom = heroTitleDiv.getBoundingClientRect().bottom;
            if (layoutTop >= titleBottom) {
                heroTitleDiv.style.opacity = 1;
            } else if (layoutTop <= titleTop) {
                heroTitleDiv.style.opacity = 0;
            } else {
                heroTitleDiv.style.opacity = (layoutTop - titleTop) / (titleBottom - titleTop);
            }
        }
        window.addEventListener('scroll', updateHeroTitleFade, { passive: true });
        updateHeroTitleFade();
    }

    // Carousel (clients page only)
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let current = 0;
        const DISPLAY_MS = 5000;
        const FADE_MS = 800;

        function advance() {
            const next = (current + 1) % slides.length;
            slides[current].classList.remove('active');
            setTimeout(() => {
                slides[next].classList.add('active');
                current = next;
            }, FADE_MS);
        }

        setInterval(advance, DISPLAY_MS);
    }

    function openContactModal() {
        document.getElementById('contactModal').classList.add('open');
    }

    function closeContactModal() {
        document.getElementById('contactModal').classList.remove('open');
    }

    function submitContactForm(e) {
        e.preventDefault();
        const from = document.getElementById('contact-from').value;
        const subject = encodeURIComponent(document.getElementById('contact-subject').value);
        const message = encodeURIComponent(
            'From: ' + from + '\n\n' + document.getElementById('contact-message').value
        );
        window.location.href = 'mailto:lauren@poppyseedhr.com?subject=' + subject + '&body=' + message;
        closeContactModal();
    }

});
