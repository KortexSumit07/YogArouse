// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Logo Letter Hover Effects
    initLogoLetterEffects();
});

// Logo Letter Interactive Effects
function initLogoLetterEffects() {
    const logoLetters = document.querySelectorAll('.logo-letter');
    const colors = ['#ff006e', '#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#30cfd0', '#fa709a', '#ff006e'];
    
    logoLetters.forEach((letter, index) => {
        let timeoutId;
        let colorTimeoutId;
        let isHovering = false;
        
        letter.addEventListener('mouseenter', function() {
            isHovering = true;
            
            // Clear any existing timeouts
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (colorTimeoutId) {
                clearTimeout(colorTimeoutId);
            }
            
            // Wait for pop animation to complete (0.6s) before changing color
            colorTimeoutId = setTimeout(() => {
                if (isHovering) {
                    // Change color after pop animation completes
                    const letterColor = colors[index % colors.length];
                    this.style.color = letterColor;
                    this.classList.add('color-changed');
                    
                    // Reset color after 5 seconds
                    timeoutId = setTimeout(() => {
                        if (isHovering) {
                            this.style.color = '';
                            this.classList.remove('color-changed');
                            this.style.transform = '';
                        }
                    }, 5000);
                }
            }, 600); // Wait for pop animation (0.6s)
        });
        
        letter.addEventListener('mouseleave', function() {
            isHovering = false;
            
            // Clear all timeouts
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (colorTimeoutId) {
                clearTimeout(colorTimeoutId);
            }
            
            // Reset immediately on mouse leave
            this.style.color = '';
            this.classList.remove('color-changed');
            this.style.transform = '';
        });
    });
}

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item, .gallery-item-full');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems);
    
    if (galleryItems.length === 0 || !lightbox) return;
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        const item = images[index];
        const caption = item.querySelector('.gallery-caption')?.textContent || '';
        
        // Create gradient background based on item position
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];
        
        // Use placeholder since we don't have actual images
        lightboxImage.style.background = gradients[index % gradients.length];
        lightboxImage.style.width = '600px';
        lightboxImage.style.height = '400px';
        lightboxImage.style.borderRadius = '10px';
        
        const captionEl = lightbox.querySelector('.lightbox-caption');
        if (captionEl) {
            captionEl.textContent = caption || 'Gallery Image';
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    }
    
    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrev);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }
    
    // Close on outside click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
}

// Initialize gallery lightbox
initGalleryLightbox();

// Gallery Category Filter
function initGalleryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-full');
    
    if (categoryBtns.length === 0) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

initGalleryFilter();

// Blog Search and Filter
function initBlogFilter() {
    const searchInput = document.getElementById('blogSearch');
    const categoryBtns = document.querySelectorAll('.blog-cat-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (!searchInput && categoryBtns.length === 0) return;
    
    // Category filter
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                filterBlogPosts(category, '');
            });
        });
    }
    
    // Search filter
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeCategory = document.querySelector('.blog-cat-btn.active')?.getAttribute('data-category') || 'all';
            filterBlogPosts(activeCategory, this.value.toLowerCase());
        });
    }
    
    function filterBlogPosts(category, searchTerm) {
        blogPosts.forEach(post => {
            const postCategory = post.getAttribute('data-category');
            const postText = post.textContent.toLowerCase();
            
            const categoryMatch = category === 'all' || postCategory === category;
            const searchMatch = searchTerm === '' || postText.includes(searchTerm);
            
            if (categoryMatch && searchMatch) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
}

initBlogFilter();

// Tab Switching
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            const tabGroup = this.closest('.container')?.parentElement;
            
            if (!tabGroup) return;
            
            // Update active button
            tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide tab content
            if (tabName === 'retreats' || tabName === 'workshops') {
                const retreatsTab = document.getElementById('retreatsTab');
                const workshopsTab = document.getElementById('workshopsTab');
                
                if (retreatsTab && workshopsTab) {
                    if (tabName === 'retreats') {
                        retreatsTab.classList.add('active');
                        workshopsTab.classList.remove('active');
                    } else {
                        retreatsTab.classList.remove('active');
                        workshopsTab.classList.add('active');
                    }
                }
            } else if (tabName === 'gallery' || tabName === 'blog') {
                const galleryTab = document.getElementById('galleryTab');
                const blogTab = document.getElementById('blogTab');
                
                if (galleryTab && blogTab) {
                    if (tabName === 'gallery') {
                        galleryTab.classList.add('active');
                        blogTab.classList.remove('active');
                    } else {
                        galleryTab.classList.remove('active');
                        blogTab.classList.add('active');
                    }
                }
            }
        });
    });
}

initTabs();

// Product Category Tabs (Enroll Page)
function initProductTabs() {
    const productCatBtns = document.querySelectorAll('.product-cat-btn');
    const productsGrids = document.querySelectorAll('.products-grid');
    
    if (productCatBtns.length === 0) return;
    
    productCatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            productCatBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide product grids
            productsGrids.forEach(grid => {
                grid.classList.remove('active');
            });
            
            const targetGrid = document.getElementById(category + 'Products');
            if (targetGrid) {
                targetGrid.classList.add('active');
            }
        });
    });
}

initProductTabs();

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

initFAQ();

// Teacher Bio Read More
function initTeacherBios() {
    const readMoreBtns = document.querySelectorAll('.read-more');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const teacherCard = this.closest('.teacher-card');
            const details = teacherCard?.querySelector('.teacher-details');
            
            if (details) {
                details.classList.toggle('active');
                this.textContent = details.classList.contains('active') ? 'Read Less' : 'Read More';
            }
        });
    });
}

initTeacherBios();

// Booking Modal Functions
function openBookingModal(classType, time, teacher, day) {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    
    document.getElementById('modalTitle').textContent = 'Book Your Class';
    document.getElementById('modalClass').textContent = classType.charAt(0).toUpperCase() + classType.slice(1) + ' Yoga';
    document.getElementById('modalTime').textContent = day + ' at ' + time;
    document.getElementById('modalTeacher').textContent = teacher;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal && e.target === bookingModal) {
        closeBookingModal();
    }
});

// Event Modal Functions
const eventData = {
    'bali-retreat': {
        title: 'Bali Wellness Retreat',
        price: 1899,
        details: `
            <h3>Bali Wellness Retreat</h3>
            <p><strong>Duration:</strong> 7 Days | <strong>Location:</strong> Bali, Indonesia</p>
            <p><strong>Dates:</strong> March 15-22, 2024</p>
            <p><strong>Price:</strong> From $1,899 per person (shared room)</p>
            <h4>Itinerary</h4>
            <ul>
                <li>Daily morning yoga and meditation sessions</li>
                <li>Afternoon workshops on mindfulness and wellness</li>
                <li>Cultural tours and temple visits</li>
                <li>Traditional Balinese spa treatments</li>
                <li>Healthy, locally-sourced meals</li>
                <li>Sunset beach meditation</li>
            </ul>
            <h4>What's Included</h4>
            <ul>
                <li>Accommodation for 7 nights</li>
                <li>All meals (breakfast, lunch, dinner)</li>
                <li>Daily yoga and meditation classes</li>
                <li>Workshops and cultural activities</li>
                <li>Airport transfers</li>
            </ul>
            <h4>Cancellation Policy</h4>
            <p>Full refund available up to 60 days before retreat. 50% refund 30-60 days before. No refund within 30 days.</p>
        `
    },
    'tuscany-retreat': {
        title: 'Tuscany Yoga Retreat',
        price: 2299,
        details: `
            <h3>Tuscany Yoga Retreat</h3>
            <p><strong>Duration:</strong> 5 Days | <strong>Location:</strong> Tuscany, Italy</p>
            <p><strong>Dates:</strong> June 10-15, 2024</p>
            <p><strong>Price:</strong> From $2,299 per person (shared room)</p>
            <h4>Highlights</h4>
            <ul>
                <li>Vinyasa and Restorative yoga classes</li>
                <li>Farm-to-table Tuscan cuisine</li>
                <li>Wine tasting at local vineyards</li>
                <li>Olive grove tours</li>
                <li>Meditation in beautiful gardens</li>
            </ul>
        `
    },
    'coast-retreat': {
        title: 'Coastal Weekend Retreat',
        price: 699,
        details: `
            <h3>Coastal Weekend Retreat</h3>
            <p><strong>Duration:</strong> 3 Days | <strong>Location:</strong> Coastal Resort</p>
            <p><strong>Dates:</strong> May 3-5, 2024</p>
            <p><strong>Price:</strong> From $699 per person (shared room)</p>
            <h4>Features</h4>
            <ul>
                <li>Beachside yoga sessions</li>
                <li>Guided meditation</li>
                <li>Healthy meals included</li>
                <li>Spa access</li>
                <li>Perfect weekend getaway</li>
            </ul>
        `
    },
    'inversion-workshop': {
        title: 'Inversion Workshop',
        price: 75,
        details: `
            <h3>Inversion Workshop</h3>
            <p><strong>Duration:</strong> 3 Hours</p>
            <p><strong>Date:</strong> January 20, 2024 | 2:00 PM - 5:00 PM</p>
            <p><strong>Price:</strong> $75 per person</p>
            <h4>What You'll Learn</h4>
            <ul>
                <li>Safe techniques for headstands and handstands</li>
                <li>Arm balance fundamentals</li>
                <li>Building confidence in inversions</li>
                <li>Proper alignment and safety</li>
            </ul>
        `
    },
    'pranayama-workshop': {
        title: 'Pranayama & Meditation Workshop',
        price: 55,
        details: `
            <h3>Pranayama & Meditation Workshop</h3>
            <p><strong>Duration:</strong> 2 Hours</p>
            <p><strong>Date:</strong> February 10, 2024 | 6:00 PM - 8:00 PM</p>
            <p><strong>Price:</strong> $55 per person</p>
            <h4>Workshop Content</h4>
            <ul>
                <li>Breathing techniques for stress relief</li>
                <li>Guided meditation practices</li>
                <li>Take-home meditation tools</li>
                <li>Mindfulness techniques</li>
            </ul>
        `
    },
    'yin-workshop': {
        title: 'Yin Yoga Deep Dive',
        price: 60,
        details: `
            <h3>Yin Yoga Deep Dive</h3>
            <p><strong>Duration:</strong> 2.5 Hours</p>
            <p><strong>Date:</strong> March 5, 2024 | 4:00 PM - 6:30 PM</p>
            <p><strong>Price:</strong> $60 per person</p>
            <h4>Workshop Focus</h4>
            <ul>
                <li>Long-held poses for deep release</li>
                <li>Meridian theory and practice</li>
                <li>Use of props for support</li>
                <li>Restorative techniques</li>
            </ul>
        `
    }
};

function openEventModal(eventId) {
    const modal = document.getElementById('eventModal');
    const content = document.getElementById('modalEventContent');
    
    if (!modal || !content) return;
    
    const event = eventData[eventId];
    if (event) {
        content.innerHTML = event.details + `
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="addEventToCart('${eventId}')">Book Now</button>
                <button class="btn btn-secondary" onclick="closeEventModal()" style="margin-left: 1rem;">Close</button>
            </div>
        `;
    } else {
        content.innerHTML = `
            <h3>${eventId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            <p>Event details coming soon!</p>
            <button class="btn btn-secondary" onclick="closeEventModal()" style="margin-top: 1rem;">Close</button>
        `;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function addEventToCart(eventId) {
    const event = eventData[eventId];
    if (event) {
        addToCart(eventId.replace('-', '-').toLowerCase(), event.price);
        closeEventModal();
        // Scroll to enroll page if not already there
        if (!window.location.pathname.includes('enroll.html')) {
            window.location.href = 'enroll.html';
        }
    }
}

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('yogaCart')) || [];

function initShoppingCart() {
    // Load cart on page load
    updateCartDisplay();
    
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            
            addToCart(product, price);
        });
    });
}

function addToCart(productName, price) {
    const productNames = {
        'single-class': 'Single Class',
        '5-class-pack': '5-Class Pack',
        '10-class-pack': '10-Class Pack',
        'monthly-unlimited': 'Monthly Unlimited Membership',
        'teacher-training': '200-Hour Teacher Training',
        'bali-retreat': 'Bali Wellness Retreat',
        'tuscany-retreat': 'Tuscany Yoga Retreat',
        'coast-retreat': 'Coastal Weekend Retreat',
        'inversion-workshop': 'Inversion Workshop',
        'pranayama-workshop': 'Pranayama & Meditation Workshop',
        'yin-workshop': 'Yin Yoga Deep Dive Workshop'
    };
    
    cart.push({
        id: Date.now(),
        name: productNames[productName] || productName,
        price: price
    });
    
    saveCart();
    updateCartDisplay();
    
    // Show notification
    showNotification('Item added to cart!');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        if (cartSummary) cartSummary.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
        
        if (cartSummary) cartSummary.style.display = 'block';
        
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        if (cartSubtotal) cartSubtotal.textContent = '$' + subtotal.toFixed(2);
        if (cartTotal) cartTotal.textContent = '$' + subtotal.toFixed(2);
    }
}

function saveCart() {
    localStorage.setItem('yogaCart', JSON.stringify(cart));
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function applyPromoCode() {
    const promoCode = document.getElementById('promoCode')?.value.toUpperCase();
    const validCodes = {
        'WELCOME10': 0.1,
        'NEWSTUDENT': 0.15,
        'YOGA2024': 0.2
    };
    
    if (validCodes[promoCode]) {
        showNotification('Promo code applied!', 'success');
        // Apply discount logic here
    } else {
        showNotification('Invalid promo code', 'error');
    }
}

// Form Submissions
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for subscribing!', 'success');
            this.reset();
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Booking Form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Booking confirmed! Check your email for details.', 'success');
            closeBookingModal();
            this.reset();
        });
    }
    
    // Checkout Form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear cart
            cart = [];
            saveCart();
            updateCartDisplay();
            
            // Show success message
            closeCheckoutModal();
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'flex';
            }
        });
    }
});

function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'none';
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 10002;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Schedule Filters
function initScheduleFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const scheduleCells = document.querySelectorAll('.schedule-cell');
    const teacherFilter = document.getElementById('teacherFilter');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            filterSchedule(filter, teacherFilter?.value || 'all');
        });
    });
    
    if (teacherFilter) {
        teacherFilter.addEventListener('change', function() {
            const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
            filterSchedule(activeFilter, this.value);
        });
    }
    
    function filterSchedule(timeFilter, teacherFilter) {
        scheduleCells.forEach(cell => {
            const classInfo = cell.querySelector('.schedule-class');
            if (!classInfo) {
                cell.style.display = '';
                return;
            }
            
            const time = cell.closest('.schedule-time-slot')?.getAttribute('data-time') || '';
            const teacher = cell.getAttribute('data-teacher') || '';
            
            let show = true;
            
            // Time filter
            if (timeFilter !== 'all') {
                const hour = parseInt(time.split(':')[0]);
                if (timeFilter === 'morning' && (hour < 6 || hour >= 12)) show = false;
                if (timeFilter === 'afternoon' && (hour < 12 || hour >= 18)) show = false;
                if (timeFilter === 'evening' && hour < 18) show = false;
            }
            
            // Teacher filter
            if (teacherFilter !== 'all' && teacher !== teacherFilter) {
                show = false;
            }
            
            cell.style.display = show ? 'block' : 'none';
        });
    }
}

initScheduleFilters();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize shopping cart on page load
if (document.getElementById('cartItems')) {
    initShoppingCart();
}

/* ====== ADDED: Color-splash cursor reveal + Logo multi-colour pop (START) ====== */
(function() {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

  function initColorSplash() {
    const headings = document.querySelectorAll('.color-splash');
    if (!headings.length) return;

    headings.forEach((heading) => {
      const setMaskToCenter = () => {
        const rect = heading.getBoundingClientRect();
        heading.style.setProperty('--mask-x', (rect.width/2) + 'px');
        heading.style.setProperty('--mask-y', (rect.height/2) + 'px');
      };
      setMaskToCenter();
      window.addEventListener('resize', setMaskToCenter);

      const onMove = (e) => {
        const rect = heading.getBoundingClientRect();
        const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
        const clientY = (e.touches ? e.touches[0].clientY : e.clientY);
        let x = clamp(clientX - rect.left, 0, rect.width);
        let y = clamp(clientY - rect.top, 0, rect.height);
        heading.style.setProperty('--mask-x', Math.round(x) + 'px');
        heading.style.setProperty('--mask-y', Math.round(y) + 'px');
      };

      const onEnter = (e) => {
        heading.classList.add('is-active');
        onMove(e);
      };

      const onLeave = () => {
        heading.classList.remove('is-active');
        const rect = heading.getBoundingClientRect();
        heading.style.setProperty('--mask-x', Math.round(rect.width/2) + 'px');
        heading.style.setProperty('--mask-y', Math.round(rect.height/2) + 'px');
      };

      heading.addEventListener('mouseenter', onEnter, { passive: true });
      heading.addEventListener('mousemove', onMove, { passive: true });
      heading.addEventListener('mouseleave', onLeave, { passive: true });

      if (isTouch) {
        heading.addEventListener('touchstart', (e) => {
          heading.classList.add('is-active');
          onMove(e);
          setTimeout(() => heading.classList.remove('is-active'), 900);
        }, { passive: true });
        heading.addEventListener('touchmove', onMove, { passive: true });
        heading.addEventListener('touchend', onLeave, { passive: true });
      }
    });
  }

  function initLogoColorPop() {
    // Apply to logo
    const logo = document.querySelector('.logo');
    if (logo) {
      applyLetterEffects(logo);
    }

    // Apply to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      applyLetterEffects(heroTitle);
    }
  }

  function applyLetterEffects(container) {
    const letters = Array.from(container.querySelectorAll('.logo-letter'));
    if (!letters.length) return;

    const computed = window.getComputedStyle(letters[0]);
    const originalColor = computed.color || '';
    const palette = [
      '#ff006e', '#667eea', '#f093fb', '#4facfe', '#43e97b', '#ffb86b', '#ff5a5f'
    ];

    let activeTimeouts = new Map();
    let isHovering = false;
    const WAVE_SPEED = 80; // milliseconds per letter for wave propagation
    const WAVE_DURATION = 400; // how long each letter stays animated

    function clearAllAnimations() {
      activeTimeouts.forEach((timeout) => clearTimeout(timeout));
      activeTimeouts.clear();
    }

    function createWave(centerIndex) {
      // Clear existing timeouts for letters that will be re-animated
      const lettersToAnimate = [];
      
      // Calculate distance from center for each letter
      letters.forEach((el, i) => {
        if (el.textContent.trim() === '') return; // Skip spaces
        
        const distance = Math.abs(i - centerIndex);
        const delay = distance * WAVE_SPEED;
        
        lettersToAnimate.push({ el, i, delay, distance });
      });

      // Sort by delay to animate in wave order
      lettersToAnimate.sort((a, b) => a.delay - b.delay);

      // Animate each letter in wave order
      lettersToAnimate.forEach(({ el, i, delay, distance }) => {
        // Clear any existing timeout for this letter
        if (activeTimeouts.has(i)) {
          clearTimeout(activeTimeouts.get(i));
        }

        // Apply color and pop effect
        const timeout1 = setTimeout(() => {
          el.style.color = palette[i % palette.length];
          el.classList.add('pop');
        }, delay);
        activeTimeouts.set(i, timeout1);

        // Remove effect after duration
        const timeout2 = setTimeout(() => {
          if (!isHovering) {
            el.style.color = originalColor;
            el.classList.remove('pop');
          }
          activeTimeouts.delete(i);
        }, delay + WAVE_DURATION);
      });
    }

    container.addEventListener('mouseenter', () => {
      isHovering = true;
    }, { passive: true });

    container.addEventListener('mouseleave', () => {
      isHovering = false;
      clearAllAnimations();
      // Reset all letters
      letters.forEach((el) => {
        el.style.color = originalColor;
        el.classList.remove('pop');
        el.style.transform = '';
      });
    }, { passive: true });

    container.addEventListener('mousemove', (e) => {
      if (!isHovering) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      
      // Find the letter closest to cursor
      let nearestIndex = 0;
      let minDist = Infinity;
      
      letters.forEach((el, i) => {
        if (el.textContent.trim() === '') return; // Skip spaces
        const letterRect = el.getBoundingClientRect();
        const letterCenterX = letterRect.left + letterRect.width / 2 - rect.left;
        const dist = Math.abs(letterCenterX - x);
        
        if (dist < minDist) {
          minDist = dist;
          nearestIndex = i;
        }
      });

      // Create wave from cursor position
      createWave(nearestIndex);
    }, { passive: true });

    container.addEventListener('click', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      
      let nearestIndex = 0;
      let minDist = Infinity;
      
      letters.forEach((el, i) => {
        if (el.textContent.trim() === '') return;
        const letterRect = el.getBoundingClientRect();
        const letterCenterX = letterRect.left + letterRect.width / 2 - rect.left;
        const dist = Math.abs(letterCenterX - x);
        
        if (dist < minDist) {
          minDist = dist;
          nearestIndex = i;
        }
      });

      createWave(nearestIndex);
    }, { passive: true });

    if (isTouch) {
      container.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          const touch = e.touches[0];
          const rect = container.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          
          let nearestIndex = 0;
          let minDist = Infinity;
          
          letters.forEach((el, i) => {
            if (el.textContent.trim() === '') return;
            const letterRect = el.getBoundingClientRect();
            const letterCenterX = letterRect.left + letterRect.width / 2 - rect.left;
            const dist = Math.abs(letterCenterX - x);
            
            if (dist < minDist) {
              minDist = dist;
              nearestIndex = i;
            }
          });

          createWave(nearestIndex);
        }
      }, { passive: true });
    }
  }

  function initLogoParallax() {
    const logo = document.querySelector('.logo');
    if (!logo) return;

    const target = logo.querySelector('.logo-text') || logo;
    const MAX_ROTATE = 8;
    const MAX_TRANSLATE = 6;
    const SHADOW_MULTIPLIER = 14;
    let rafId = null;

    function handleMove(e) {
      const rect = logo.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateX = Math.max(-MAX_ROTATE, Math.min(MAX_ROTATE, -relY * MAX_ROTATE));
      const rotateY = Math.max(-MAX_ROTATE, Math.min(MAX_ROTATE, relX * MAX_ROTATE));
      const translateX = relX * MAX_TRANSLATE;
      const translateY = relY * MAX_TRANSLATE;
      const shadowX = -relX * SHADOW_MULTIPLIER;
      const shadowY = relY * SHADOW_MULTIPLIER;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 4px)`;
        target.style.textShadow = `${shadowX}px ${shadowY}px 22px rgba(0, 0, 0, 0.18)`;
      });
    }

    function resetTilt() {
      if (rafId) cancelAnimationFrame(rafId);
      target.style.transform = '';
      target.style.textShadow = '';
    }

    logo.addEventListener('mousemove', handleMove, { passive: true });
    logo.addEventListener('mouseleave', resetTilt, { passive: true });
  }

  function initLogoParticles() {
    const logo = document.querySelector('.logo');
    if (!logo || logo.querySelector('.logo-particles')) return;

    const pastelPalette = [
      '#f8d1ff', '#ffd6f5', '#ffe0fb', '#d7e8ff', '#c9f0ff',
      '#fce8d4', '#e0ffe5', '#e5d9ff', '#ffd1dc', '#d0f4f7'
    ];
    const particleCount = 16;
    const container = document.createElement('div');
    container.className = 'logo-particles';

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'logo-particle';

      const size = (Math.random() * 6 + 4).toFixed(1);
      const startX = (Math.random() * 160 - 80).toFixed(1);
      const startY = (Math.random() * 120 - 60).toFixed(1);
      const driftX = (Math.random() * 40 - 20).toFixed(1);
      const driftY = (Math.random() * 40 - 20).toFixed(1);
      const duration = (Math.random() * 6 + 10).toFixed(1);
      const delay = (Math.random() * 4).toFixed(2);
      const opacity = (Math.random() * 0.4 + 0.3).toFixed(2);
      const color = pastelPalette[i % pastelPalette.length];

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.setProperty('--start-x', `${startX}px`);
      particle.style.setProperty('--start-y', `${startY}px`);
      particle.style.setProperty('--drift-x', `${driftX}px`);
      particle.style.setProperty('--drift-y', `${driftY}px`);
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--delay', `${delay}s`);
      particle.style.setProperty('--opacity', opacity);

      container.appendChild(particle);
    }

    logo.appendChild(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initColorSplash();
      initLogoColorPop();
      initLogoParallax();
      initLogoParticles();
    });
  } else {
    initColorSplash();
    initLogoColorPop();
    initLogoParallax();
    initLogoParticles();
  }
})();
/* ====== ADDED: Color-splash cursor reveal + Logo multi-colour pop (END) ====== */

/* ====== END ====== */
