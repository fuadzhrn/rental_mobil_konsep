// ==================== NAVBAR FUNCTIONALITY ====================

const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky Navbar saat scroll
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', function () {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '70px';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.flexDirection = 'column';
    navMenu.style.backgroundColor = 'white';
    navMenu.style.gap = '0';
    navMenu.style.zIndex = '999';
});

// Smooth Scrolling dan Close Mobile Menu
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Close mobile menu setelah klik
        if (window.innerWidth < 768) {
            navMenu.style.display = 'none';
        }
    });
});

// ==================== INTERSECTION OBSERVER UNTUK ANIMASI ====================

// Observer untuk fade-in elements saat masuk viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe semua element dengan class fade-in
const fadeInElements = document.querySelectorAll('.fade-in');
fadeInElements.forEach(element => {
    observer.observe(element);
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================

// Ensure smooth scroll behavior works in semua browser
document.addEventListener('click', function (e) {
    const href = e.target.getAttribute('href');

    if (href && href.startsWith('#')) {
        e.preventDefault();

        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// ==================== BUTTON HOVER EFFECTS ====================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== CARD HOVER EFFECTS ====================

const cards = document.querySelectorAll('.keunggulan-card, .mobil-card, .testimoni-card, .langkah');

cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== NAVBAR RESPONSIVE ====================

/**
 * Handle responsive navbar
 * Tutup mobile menu ketika window di-resize ke ukuran desktop
 */
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'static';
        navMenu.style.flexDirection = 'row';
        navMenu.style.backgroundColor = 'transparent';
    } else {
        navMenu.style.display = 'none';
        navMenu.style.position = 'absolute';
        navMenu.style.flexDirection = 'column';
        navMenu.style.backgroundColor = 'white';
    }
});

// ==================== COUNTER ANIMATION ====================

/**
 * Animasi counter untuk statistik
 * Number akan bergerak dari 0 ke target value
 */
const statistikItems = document.querySelectorAll('.statistik-angka');

function animateCounter(element, targetValue) {
    let currentValue = 0;
    const increment = targetValue / 30;
    const duration = 30;

    const counter = setInterval(() => {
        currentValue += increment;

        if (currentValue >= targetValue) {
            element.textContent = targetValue + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue) + '+';
        }
    }, duration);
}

// Observer untuk memulai counter animation saat section statistik masuk viewport
const statistikSection = document.querySelector('.statistik');

const statistikObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            // Tandai sudah dijalankan agar tidak repeat
            entry.target.setAttribute('data-animated', 'true');

            statistikItems.forEach((item, index) => {
                const targetValue = parseInt(item.textContent);

                setTimeout(() => {
                    animateCounter(item, targetValue);
                }, index * 100);
            });

            statistikObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

if (statistikSection) {
    statistikObserver.observe(statistikSection);
}

// ==================== SCROLL REVEAL ANIMATION ====================

/**
 * Reveal animation untuk elements saat di-scroll
 */
const scrollRevealElements = document.querySelectorAll('.tentang-text, .keunggulan-card, .mobil-card, .testimoni-card, .langkah');

const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

scrollRevealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// ==================== PARALLAX EFFECT ====================

/**
 * Parallax effect pada hero section
 * (Optional - bisa dihapus jika tidak diinginkan)
 */
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', function () {
    if (heroSection) {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
        }
    }
});

// ==================== FORM VALIDATION & SAFETY ====================

/**
 * Validasi link WhatsApp
 * Memastikan link WhatsApp bekerja dengan baik
 */
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

whatsappLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Validasi URL
        const href = this.getAttribute('href');
        if (!href || !href.includes('wa.me')) {
            e.preventDefault();
            alert('Link WhatsApp tidak valid. Silakan hubungi admin.');
        }
    });
});

// ==================== TABLET DETECTION ====================

/**
 * Deteksi ukuran layar untuk mobile menu
 */
function checkScreenSize() {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile && navMenu) {
        navMenu.style.display = 'flex';
    }
}

// Check on page load
window.addEventListener('load', checkScreenSize);

// Check on resize
window.addEventListener('resize', checkScreenSize);

// ==================== LAZY LOADING IMAGE (Optional) ====================

/**
 * Lazy loading untuk image
 * Pastikan image dimuat hanya saat terlihat di layar
 */
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== PAGE LOAD ANIMATION ====================

/**
 * Animasi ketika page pertama kali load
 */
window.addEventListener('load', function () {
    document.body.style.opacity = '1';

    // Trigger initial animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 100);
    });
});

// ==================== ACTIVE NAV LINK ====================

/**
 * Highlight active nav link berdasarkan scroll position
 */
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ==================== CONSOLE WELCOME MESSAGE ====================

/**
 * Welcome message di console
 * (Opsional - untuk branding)
 */
console.log('%cWelcome to RentCar Landing Page', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%cDesigned with ❤️ using HTML, CSS, and JavaScript', 'color: #7f8c8d; font-size: 14px;');

// Check Font Awesome
window.addEventListener('load', function() {
    const fontAwesomeTest = document.querySelector('[class*="fas"], [class*="fab"]');
    if (fontAwesomeTest && window.getComputedStyle(fontAwesomeTest, ':before').fontFamily.includes('Font Awesome')) {
        console.log('%c✓ Font Awesome loaded successfully!', 'color: #27ae60; font-size: 14px;');
    } else {
        console.warn('%c⚠ Font Awesome might not be loaded. Check network tab.', 'color: #e74c3c; font-size: 14px;');
    }
});
