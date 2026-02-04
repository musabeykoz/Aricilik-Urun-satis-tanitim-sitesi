// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .feature, .gallery-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Lütfen tüm gerekli alanları doldurun.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Lazy loading for images (if added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Product modal functionality (for future enhancement)
function openProductModal(productId) {
    // This can be expanded to show detailed product information
    console.log('Opening product modal for:', productId);
}

// Add click handlers to product buttons
document.querySelectorAll('.product-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        showNotification(`${productName} detayları yakında eklenecek!`, 'info');
    });
});

// Search functionality (for future enhancement)
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                const productDesc = product.querySelector('p').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #d4af37, #f4d03f);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error);
        showNotification('Ürünler yüklenirken bir hata oluştu.', 'error');
    }
}

// Display products dynamically
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Add click handlers to new product buttons
    addProductClickHandlers();
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.image}"></i>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-details">
                <div class="product-weight">Ağırlık: ${product.weight}</div>
                <div class="product-origin">Menşei: ${product.origin}</div>
            </div>
            <div class="product-price">₺${product.price}</div>
            <button class="btn btn-primary" data-product-id="${product.id}">Detayları Gör</button>
        </div>
    `;
    return card;
}

// Add click handlers to product buttons
function addProductClickHandlers() {
    document.querySelectorAll('.product-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            showProductDetails(productId, productName);
        });
    });
}

// Show product details
function showProductDetails(productId, productName) {
    // JSON'dan ürün bilgilerini al
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(p => p.id == productId);
            if (product) {
                openProductModal(product);
            } else {
                showNotification('Ürün bulunamadı!', 'error');
            }
        })
        .catch(error => {
            console.error('Ürün detayları yüklenirken hata:', error);
            showNotification('Ürün detayları yüklenirken hata oluştu!', 'error');
        });
}

// Open product modal
function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    
    // Modal içeriğini doldur
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-icon').className = product.image;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-weight').textContent = product.weight;
    document.getElementById('modal-product-origin').textContent = product.origin;
    document.getElementById('modal-product-category').textContent = product.category;
    document.getElementById('modal-product-price').textContent = `₺${product.price}`;
    
    // Özellikleri ekle
    const featuresList = document.getElementById('modal-product-features-list');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const tag = document.createElement('span');
        tag.className = 'feature-tag';
        tag.textContent = feature;
        featuresList.appendChild(tag);
    });
    
    // Faydaları ekle
    const benefitsList = document.getElementById('modal-product-benefits-list');
    benefitsList.innerHTML = '';
    product.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
    
    // Modal'ı göster
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Sayfa kaydırmayı engelle
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Sayfa kaydırmayı geri aç
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.modal-close');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const orderBtn = document.getElementById('modal-order-btn');
    
    // X butonuna tıklama
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
    
    // Kapat butonuna tıklama
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProductModal);
    }
    
    // Modal dışına tıklama
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
    
    // Sipariş ver butonuna tıklama
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            const productName = document.getElementById('modal-product-name').textContent;
            showNotification(`${productName} için sipariş formu yakında eklenecek!`, 'info');
        });
    }
    
    // ESC tuşu ile modal kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeProductModal();
        }
    });
});

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', loadProducts);

// Hero Slider Control
class HeroSlider {
    constructor() {
        this.sliderTrack = document.querySelector('.slider-track');
        this.sliderItems = document.querySelectorAll('.slider-item');
        this.currentSlide = 0;
        this.totalSlides = this.sliderItems.length;
        this.isAnimating = false;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.sliderTrack) {
            this.startAutoSlide();
            this.addHoverEffects();
        }
    }
    
    startAutoSlide() {
        // Slider zaten CSS animasyonu ile çalışıyor
        // Bu fonksiyon gelecekteki interaktif özellikler için hazır
        console.log('Hero slider initialized with', this.totalSlides, 'slides');
    }
    
    addHoverEffects() {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => {
                this.pauseAnimation();
            });
            
            hero.addEventListener('mouseleave', () => {
                this.resumeAnimation();
            });
        }
    }
    
    pauseAnimation() {
        if (this.sliderTrack) {
            this.sliderTrack.style.animationPlayState = 'paused';
        }
    }
    
    resumeAnimation() {
        if (this.sliderTrack) {
            this.sliderTrack.style.animationPlayState = 'running';
        }
    }
    
    // Gelecekteki özellikler için hazır fonksiyonlar
    nextSlide() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateSlider();
            setTimeout(() => {
                this.isAnimating = false;
            }, 1000);
        }
    }
    
    prevSlide() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
            this.updateSlider();
            setTimeout(() => {
                this.isAnimating = false;
            }, 1000);
        }
    }
    
    updateSlider() {
        if (this.sliderTrack) {
            const translateX = -this.currentSlide * 25;
            this.sliderTrack.style.transform = `translateX(${translateX}%)`;
        }
    }
}

// Initialize hero slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
    initSplashScreen();
    initAutoBackground();
    initSmoothScrolling();
});

// Splash Screen Management
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    
    // Show splash screen for 3 seconds
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    }, 3000);
}

// Auto Background Images System
function initAutoBackground() {
    const heroSection = document.querySelector('.hero');
    
    // Background images array - Belirtilen arı ve bal temalı resimler
    const backgroundImages = [
        'https://cdn.pixabay.com/photo/2019/04/14/02/40/bees-4126065_1280.jpg', // Arılar
        'https://cdn.pixabay.com/photo/2023/06/18/13/41/european-honey-bees-8072075_1280.jpg', // Avrupa bal arıları
        'https://cdn.pixabay.com/photo/2016/11/29/02/06/apiary-1866740_1280.jpg' // Arı kovanı
    ];
    
    let currentImageIndex = 0;
    let backgroundInterval;
    
    // Set initial background
    function setBackgroundImage(index) {
        const imageUrl = backgroundImages[index];
        heroSection.style.backgroundImage = `url(${imageUrl})`;
        heroSection.classList.add('has-background');
        
        // Add fade animation
        heroSection.classList.add('background-fade');
        setTimeout(() => {
            heroSection.classList.remove('background-fade');
        }, 2000);
    }
    
    // Change background image
    function changeBackground() {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        setBackgroundImage(currentImageIndex);
    }
    
    // Preload images for smooth transitions
    function preloadImages() {
        backgroundImages.forEach(imageUrl => {
            const img = new Image();
            img.src = imageUrl;
        });
    }
    
    // Initialize background system
    function init() {
        // Set first background
        setBackgroundImage(0);
        
        // Preload all images
        preloadImages();
        
        // Start automatic background changes every 8 seconds
        backgroundInterval = setInterval(changeBackground, 8000);
        
        // Pause on hover
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(backgroundInterval);
        });
        
        // Resume on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            backgroundInterval = setInterval(changeBackground, 8000);
        });
    }
    
    // Start the system
    init();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
