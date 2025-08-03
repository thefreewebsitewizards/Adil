

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');

function showSlide(idx) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
        dots[i].classList.toggle('active', i === idx);
    });
    currentSlide = idx;
}

function nextSlide() {
    let idx = (currentSlide + 1) % slides.length;
    showSlide(idx);
}

function prevSlide() {
    let idx = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(idx);
}

function goToSlide(idx) {
    showSlide(idx);
}

// Auto-slide every 6s
setInterval(() => { 
    nextSlide(); 
}, 6000);

// Hamburger Menu Functions
function toggleMobileMenu() {
    console.log('Hamburger menu clicked!');
    
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!hamburgerMenu || !mobileNav) {
        console.log('Hamburger menu elements not found');
        return;
    }
    
    const isOpen = mobileNav.classList.contains('open');
    console.log('Mobile menu is open:', isOpen);
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!hamburgerMenu || !mobileNav) {
        console.log('Cannot open mobile menu - elements not found');
        return;
    }
    
    hamburgerMenu.classList.add('active');
    mobileNav.classList.add('open');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    // Temporary visual feedback
    hamburgerMenu.style.backgroundColor = '#f0f0f0';
    
    console.log('Mobile menu opened');
}

function closeMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!hamburgerMenu || !mobileNav) {
        console.log('Cannot close mobile menu - elements not found');
        return;
    }
    
    hamburgerMenu.classList.remove('active');
    mobileNav.classList.remove('open');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove temporary visual feedback
    hamburgerMenu.style.backgroundColor = '';
    
    console.log('Mobile menu closed');
}

// Close mobile menu when clicking on a link
function closeMobileMenuOnLinkClick() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default - let the link work normally
            closeMobileMenu();
        });
    });
}

// Close mobile menu when clicking outside
function closeMobileMenuOnOutsideClick() {
    document.addEventListener('click', function(event) {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mobileNav = document.getElementById('mobileNav');
        
        if (!hamburgerMenu || !mobileNav) {
            return;
        }
        
        // If menu is open and click is outside the menu and hamburger button
        if (mobileNav.classList.contains('open') && 
            !mobileNav.contains(event.target) && 
            !hamburgerMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });
}

function toggleCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    if (!sidebar || !overlay) {
        return;
    }
    
    const isOpen = sidebar.classList.contains('open');
    
    if (isOpen) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    } else {
        sidebar.classList.add('open');
        overlay.classList.add('open');
    }
}

let cart = [];

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsDiv = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (!cartCount || !cartItemsDiv || !cartTotal || !checkoutBtn) {
        return;
    }
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        checkoutBtn.style.display = 'none';
    } else {
        let total = 0;
        cartItemsDiv.innerHTML = cart.map((item, idx) => {
            total += item.price;
            return `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                    <button onclick="removeCartItem(${idx})" class="remove-cart-item">×</button>
                </div>
            `;
        }).join('');
        cartTotal.textContent = `₹${total}`;
        checkoutBtn.style.display = 'block';
    }
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    showNotification('Item added to cart!');
}

function removeCartItem(idx) {
    cart.splice(idx, 1);
    updateCartUI();
    showNotification('Item removed from cart!');
}

function renderProducts(products) {
    const container = document.querySelector('.trending-products');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="trending-card">
            <span class="trending-badge">${product.badge}</span>
            <img src="${product.image}" alt="${product.name}">
            <div class="trending-name">${product.name}</div>
            <div class="trending-price">from ₹${product.price}</div>
        </div>
    `).join('');
}

function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    const overlay = document.getElementById('loginOverlay');
    
    if (!modal || !overlay) {
        return;
    }
    
    const isOpen = modal.classList.contains('open');
    
    if (isOpen) {
        modal.classList.remove('open');
        overlay.classList.remove('open');
    } else {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

function toggleSearchModal() {
    const modal = document.getElementById('searchModal');
    const overlay = document.getElementById('searchOverlay');
    
    if (!modal || !overlay) {
        return;
    }
    
    const isOpen = modal.classList.contains('open');
    
    if (isOpen) {
        modal.classList.remove('open');
        overlay.classList.remove('open');
    } else {
        modal.classList.add('open');
        overlay.classList.add('open');
    }
}

// Initialize all filter functionality
function initializeFilters() {
    // Add event listeners for filter headers (toggle sections)
    const filterHeaders = document.querySelectorAll('.filter-header');
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleFilterSection(this);
        });
    });
    
    // Add event listeners for brand filters
    const brandCheckboxes = document.querySelectorAll('input[id="nike"], input[id="adidas"], input[id="newbalance"], input[id="onrunning"], input[id="jordan"]');
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const brand = this.id.charAt(0).toUpperCase() + this.id.slice(1);
            if (this.id === 'newbalance') brand = 'New Balance';
            if (this.id === 'onrunning') brand = 'On Running';
            handleBrandFilter(brand, this.checked);
        });
    });
    
    // Add event listeners for category filters
    const categoryCheckboxes = document.querySelectorAll('input[id^="cat"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const categoryMap = {
                'cat1': 'Running',
                'cat2': 'Basketball',
                'cat3': 'Lifestyle',
                'cat4': 'Training',
                'cat5': 'Skateboarding',
                'cat6': 'Tennis',
                'cat7': 'Soccer'
            };
            const category = categoryMap[this.id];
            handleCategoryFilter(category, this.checked);
        });
    });
    
    // Add event listeners for price filters
    const priceCheckboxes = document.querySelectorAll('input[id^="price"]');
    priceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const priceMap = {
                'price1': 'Under ₱5,000',
                'price2': '₱5,000 - ₱10,000',
                'price3': '₱10,000 - ₱20,000',
                'price4': '₱20,000 - ₱50,000',
                'price5': 'Over ₱50,000'
            };
            const priceRange = priceMap[this.id];
            handlePriceFilter(priceRange, this.checked);
        });
    });
    
    // Add event listeners for size filters
    const sizeCheckboxes = document.querySelectorAll('input[id^="size"]');
    sizeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const sizeMap = {
                'size1': 'US 6-7',
                'size2': 'US 7-8',
                'size3': 'US 8-9',
                'size4': 'US 9-10',
                'size5': 'US 10-11'
            };
            const size = sizeMap[this.id];
            handleSizeFilter(size, this.checked);
        });
    });
    
    // Add event listeners for availability filters
    const availabilityCheckboxes = document.querySelectorAll('input[id^="avail"]');
    availabilityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const availabilityMap = {
                'avail1': 'In Stock',
                'avail2': 'Pre-order',
                'avail3': 'Coming Soon'
            };
            const availability = availabilityMap[this.id];
            handleAvailabilityFilter(availability, this.checked);
        });
    });
    
    // Add event listeners for shipping filters
    const shippingCheckboxes = document.querySelectorAll('input[id^="ship"]');
    shippingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const shippingMap = {
                'ship1': 'Instant Ship',
                'ship2': 'Free Shipping',
                'ship3': 'Express Delivery'
            };
            const shipping = shippingMap[this.id];
            handleShippingFilter(shipping, this.checked);
        });
    });
    
    // Add event listener for sort dropdown
    const sortDropdown = document.querySelector('.sort-dropdown');
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
    
    // Add event listener for search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            handleSearch(this.value);
        });
    }
    
    // Add clear filters button functionality
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
}

function addTrendingToCart(productName, price) {
    addToCart(productName, price);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #000;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    updateCartUI();
    
    // Initialize products and filters
    initializeProducts();
    
    // Initialize hamburger menu functionality
    initializeMobileMenu();
    
    // Add event listeners for cart buttons
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
    
    // Add event listeners for trending cards
    const trendingCards = document.querySelectorAll('.trending-card');
    trendingCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.trending-name').textContent;
            const price = this.querySelector('.trending-price').textContent.replace('from ₹', '');
            addTrendingToCart(name, parseInt(price));
        });
    });
    
    // Add event listeners for arrows
    const leftArrow = document.querySelector('.trending-arrow.left');
    const rightArrow = document.querySelector('.trending-arrow.right');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            // Scroll left
            const container = document.querySelector('.trending-products');
            if (container) {
                container.scrollBy({ left: -300, behavior: 'smooth' });
            }
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            // Scroll right
            const container = document.querySelector('.trending-products');
            if (container) {
                container.scrollBy({ left: 300, behavior: 'smooth' });
            }
        });
    }
    
    // Initialize filter functionality
    initializeFilters();
});

// Initialize mobile menu functionality
function initializeMobileMenu() {
    console.log('Initializing mobile menu...');
    
    // Add event listener for hamburger menu button
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMobileMenu);
        console.log('Hamburger menu event listener added');
    } else {
        console.log('Hamburger menu button not found');
    }
    
    // Add event listener for mobile nav close button
    const mobileNavClose = document.getElementById('mobileNavClose');
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
        console.log('Mobile nav close button event listener added');
    } else {
        console.log('Mobile nav close button not found');
    }
    
    // Close mobile menu when clicking on links
    closeMobileMenuOnLinkClick();
    
    // Close mobile menu when clicking outside
    closeMobileMenuOnOutsideClick();
    
    console.log('Mobile menu initialization complete');
}

// Product Data Management
let allProducts = [];
let filteredProducts = [];
let currentFilters = {
    search: '',
    brands: [],
    categories: [],
    priceRange: { min: 0, max: 100000 },
    sizes: [],
    availability: [],
    shipping: []
};

// Product data structure for sneakers collection
const sneakersProducts = [
    {
        id: 1,
        name: "On Running Cloud 5 Heather | Fossil",
        brand: "On Running",
        category: "Running",
        price: 15499,
        originalPrice: 18999,
        image: "images/oncloud5-heather.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship", "SALE"],
        rating: 4.5
    },
    {
        id: 2,
        name: "On Running Cloud 5 Nimbus | Alloy",
        brand: "On Running",
        category: "Running",
        price: 15499,
        originalPrice: 17999,
        image: "images/oncloud5-nimbus.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship", "SALE"],
        rating: 4.3
    },
    {
        id: 3,
        name: "Nike Dunk Low Next Nature 'Elemental Pink'",
        brand: "Nike",
        category: "Lifestyle",
        price: 11799,
        originalPrice: null,
        image: "images/nike-dunk-low-pink.jpg",
        sizes: ["US 6-7", "US 7-8", "US 8-9"],
        availability: "In Stock",
        shipping: "Free Shipping",
        labels: ["SALE"],
        rating: 4.7
    },
    {
        id: 4,
        name: "Adidas Samba OG 'Reflective Nylon Pack - Preloved Ink'",
        brand: "Adidas",
        category: "Lifestyle",
        price: 8999,
        originalPrice: null,
        image: "images/adidas-samba-navy.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.6
    },
    {
        id: 5,
        name: "Adidas Samba LT 'White Black'",
        brand: "Adidas",
        category: "Lifestyle",
        price: 9499,
        originalPrice: null,
        image: "images/adidas-samba-lt.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.4
    },
    {
        id: 6,
        name: "New Balance 9060 Slate Grey Arid Stone",
        brand: "New Balance",
        category: "Lifestyle",
        price: 14999,
        originalPrice: null,
        image: "images/nb9060-slate.jpg",
        sizes: ["US 8-9", "US 9-10", "US 10-11"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.8
    },
    {
        id: 7,
        name: "Nike Air Force 1 Low '07",
        brand: "Nike",
        category: "Lifestyle",
        price: 12999,
        originalPrice: null,
        image: "images/air-force-1-low.jpg",
        sizes: ["US 6-7", "US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Free Shipping",
        labels: [],
        rating: 4.9
    },
    {
        id: 8,
        name: "Jordan 1 Low OG 'Shadow'",
        brand: "Jordan",
        category: "Basketball",
        price: 18999,
        originalPrice: null,
        image: "images/jordan-1-low.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10", "US 10-11"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.7
    },
    {
        id: 9,
        name: "New Balance 550 'White Green'",
        brand: "New Balance",
        category: "Lifestyle",
        price: 11999,
        originalPrice: null,
        image: "images/nb550-white.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Free Shipping",
        labels: [],
        rating: 4.5
    },
    {
        id: 10,
        name: "Adidas Forum Low 'White Green'",
        brand: "Adidas",
        category: "Basketball",
        price: 9999,
        originalPrice: null,
        image: "images/adidas-forum-low.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.3
    },
    {
        id: 11,
        name: "Nike SB Dunk Low 'Matcha'",
        brand: "Nike",
        category: "Skateboarding",
        price: 15999,
        originalPrice: null,
        image: "images/dunk-sb-matcha.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "Pre-order",
        shipping: "Express Delivery",
        labels: ["Express Delivery"],
        rating: 4.6
    },
    {
        id: 12,
        name: "Jordan 3 Retro 'A Ma Maniere'",
        brand: "Jordan",
        category: "Basketball",
        price: 24999,
        originalPrice: null,
        image: "images/jordan3-amaniere.jpg",
        sizes: ["US 8-9", "US 9-10", "US 10-11"],
        availability: "Coming Soon",
        shipping: "Express Delivery",
        labels: ["Express Delivery"],
        rating: 4.9
    },
    {
        id: 13,
        name: "New Balance 2002R 'Kith Camellia'",
        brand: "New Balance",
        category: "Lifestyle",
        price: 17999,
        originalPrice: null,
        image: "images/nb-kith-camellia.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.7
    },
    {
        id: 14,
        name: "On Running CloudTilt 'Arctic'",
        brand: "On Running",
        category: "Running",
        price: 18999,
        originalPrice: null,
        image: "images/on-cloudtilt-arctic.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.4
    },
    {
        id: 15,
        name: "Adidas Handball Spezial 'Blue'",
        brand: "Adidas",
        category: "Lifestyle",
        price: 8999,
        originalPrice: null,
        image: "images/adidas-handball-blue.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10"],
        availability: "In Stock",
        shipping: "Free Shipping",
        labels: [],
        rating: 4.2
    },
    {
        id: 16,
        name: "Nike Pegasus 41 'Black'",
        brand: "Nike",
        category: "Running",
        price: 13999,
        originalPrice: null,
        image: "images/nike-pegasus41-black.jpg",
        sizes: ["US 7-8", "US 8-9", "US 9-10", "US 10-11"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.6
    }
];

// Accessories products data
const accessoriesProducts = [
    {
        id: 101,
        name: "Swatch X Blancpain Pacific Ocean Fifty Fathoms Watch",
        brand: "Swatch",
        category: "Accessories",
        price: 40199,
        originalPrice: 59999,
        image: "images/swatch-pacific-ocean.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship", "SALE"],
        rating: 4.8
    },
    {
        id: 102,
        name: "Swatch X Blancpain Indian Ocean Fifty Fathoms Watch",
        brand: "Swatch",
        category: "Accessories",
        price: 40199,
        originalPrice: 43999,
        image: "images/swatch-indian-ocean.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship", "SALE"],
        rating: 4.7
    },
    {
        id: 103,
        name: "Swatch X Blancpain Antarctic Ocean Fifty Fathoms Watch",
        brand: "Swatch",
        category: "Accessories",
        price: 40199,
        originalPrice: 43999,
        image: "images/swatch-antarctic-ocean.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship", "SALE"],
        rating: 4.6
    },
    {
        id: 104,
        name: "Swatch X Blancpain Atlantic Ocean Fifty Fathoms Watch",
        brand: "Swatch",
        category: "Accessories",
        price: 40199,
        originalPrice: 42999,
        image: "images/swatch-atlantic-ocean.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship", "SALE"],
        rating: 4.5
    },
    {
        id: 105,
        name: "Gentle Monster Kiira 02 Blue Lenses Sunglasses",
        brand: "Gentle Monster",
        category: "Accessories",
        price: 25999,
        originalPrice: null,
        image: "images/gentle-monster-kiira-blue.jpg",
        sizes: ["One Size"],
        availability: "Out of Stock",
        shipping: "Pre-order",
        labels: ["OUT OF STOCK"],
        rating: 4.9
    },
    {
        id: 106,
        name: "Gentle Monster Kiira 02 Brown Lenses Sunglasses",
        brand: "Gentle Monster",
        category: "Accessories",
        price: 25999,
        originalPrice: null,
        image: "images/gentle-monster-kiira-brown.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.8
    },
    {
        id: 107,
        name: "Lululemon Everywhere Belt Bag 1L",
        brand: "Lululemon",
        category: "Accessories",
        price: 8999,
        originalPrice: null,
        image: "images/lululemon-belt-bag.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.7
    },
    {
        id: 108,
        name: "Lululemon Everywhere Belt Bag 2L",
        brand: "Lululemon",
        category: "Accessories",
        price: 9999,
        originalPrice: null,
        image: "images/lululemon-belt-bag-2l.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.6
    },
    {
        id: 109,
        name: "Ray-Ban Aviator Classic Gold",
        brand: "Ray-Ban",
        category: "Accessories",
        price: 18999,
        originalPrice: null,
        image: "images/ray-ban-aviator-gold.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.9
    },
    {
        id: 110,
        name: "Ray-Ban Wayfarer Classic Black",
        brand: "Ray-Ban",
        category: "Accessories",
        price: 17999,
        originalPrice: null,
        image: "images/ray-ban-wayfarer-black.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.8
    },
    {
        id: 111,
        name: "Pop Mart Skullpanda Keychain Series 1",
        brand: "Pop Mart",
        category: "Accessories",
        price: 2999,
        originalPrice: null,
        image: "images/pop-mart-skullpanda-keychain.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.5
    },
    {
        id: 112,
        name: "Pop Mart Skullpanda Keychain Series 2",
        brand: "Pop Mart",
        category: "Accessories",
        price: 2999,
        originalPrice: null,
        image: "images/pop-mart-skullpanda-keychain-2.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.4
    },
    {
        id: 113,
        name: "Casio G-Shock DW5600E-1V",
        brand: "Casio",
        category: "Accessories",
        price: 8999,
        originalPrice: null,
        image: "images/casio-g-shock-dw5600.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.7
    },
    {
        id: 114,
        name: "Casio G-Shock GA2100-1A1",
        brand: "Casio",
        category: "Accessories",
        price: 12999,
        originalPrice: null,
        image: "images/casio-g-shock-ga2100.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.8
    },
    {
        id: 115,
        name: "Casio G-Shock GA110-1B",
        brand: "Casio",
        category: "Accessories",
        price: 10999,
        originalPrice: null,
        image: "images/casio-g-shock-ga110.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.6
    },
    {
        id: 116,
        name: "Casio G-Shock GW-B5600-2",
        brand: "Casio",
        category: "Accessories",
        price: 15999,
        originalPrice: null,
        image: "images/casio-g-shock-gwb5600.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.9
    },
    {
        id: 117,
        name: "Casio G-Shock GA700-1A",
        brand: "Casio",
        category: "Accessories",
        price: 11999,
        originalPrice: null,
        image: "images/casio-g-shock-ga700.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.7
    },
    {
        id: 118,
        name: "Casio G-Shock GA100-1A1",
        brand: "Casio",
        category: "Accessories",
        price: 9999,
        originalPrice: null,
        image: "images/casio-g-shock-ga100.jpg",
        sizes: ["One Size"],
        availability: "In Stock",
        shipping: "Instant Ship",
        labels: ["Instant Ship"],
        rating: 4.5
    }
];

// Initialize products based on current page
function initializeProducts() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('sneakers-collection')) {
        allProducts = [...sneakersProducts];
    } else if (currentPage.includes('running-collection')) {
        allProducts = sneakersProducts.filter(p => p.category === 'Running');
    } else if (currentPage.includes('streetwear-collection')) {
        // Add streetwear products here
        allProducts = [];
    } else if (currentPage.includes('accessories-collection')) {
        allProducts = [...accessoriesProducts];
    } else if (currentPage.includes('labubu-collection')) {
        // Add labubu products here
        allProducts = [];
    } else {
        allProducts = [...sneakersProducts];
    }
    
    filteredProducts = [...allProducts];
    renderProducts();
    updateProductCount();
}

// Filter products based on current filters
function filterProducts() {
    filteredProducts = allProducts.filter(product => {
        // Search filter
        if (currentFilters.search && !product.name.toLowerCase().includes(currentFilters.search.toLowerCase()) && 
            !product.brand.toLowerCase().includes(currentFilters.search.toLowerCase())) {
            return false;
        }
        
        // Brand filter
        if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(product.brand)) {
            return false;
        }
        
        // Category filter
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes(product.category)) {
            return false;
        }
        
        // Price range filter
        if (product.price < currentFilters.priceRange.min || product.price > currentFilters.priceRange.max) {
            return false;
        }
        
        // Size filter
        if (currentFilters.sizes.length > 0 && !currentFilters.sizes.some(size => product.sizes.includes(size))) {
            return false;
        }
        
        // Availability filter
        if (currentFilters.availability.length > 0 && !currentFilters.availability.includes(product.availability)) {
            return false;
        }
        
        // Shipping filter
        if (currentFilters.shipping.length > 0 && !currentFilters.shipping.includes(product.shipping)) {
            return false;
        }
        
        return true;
    });
    
    renderProducts();
    updateProductCount();
}

// Render products in the grid
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    if (filteredProducts.length === 0) {
        // Display "Coming Soon" message when no products match filters
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="font-size: 4rem; margin-bottom: 20px;">🚀</div>
                <h2 style="font-size: 2rem; font-weight: 700; color: #333; margin-bottom: 15px;">Coming Soon</h2>
                <p style="font-size: 1.1rem; color: #666; margin-bottom: 30px; line-height: 1.6;">
                    We're working hard to bring you amazing products in this category.<br>
                    Stay tuned for updates!
                </p>
                <button onclick="clearAllFilters()" style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; border: none; padding: 15px 30px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255,107,53,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(255,107,53,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(255,107,53,0.3)'">
                    View All Products
                </button>
            </div>
        `;
    } else {
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-product-id="${product.id}" onmouseover="this.style.transform='translateY(-10px)'; this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.transform='translateY(0)'; this.style.background='transparent'">
                <div class="product-labels">
                    ${product.labels.map(label => `<span class="label ${getLabelClass(label)}" onmouseover="this.style.background='${getLabelHoverColor(label)}'" onmouseout="this.style.background='${getLabelColor(label)}'">${label}</span>`).join('')}
                </div>
                <img src="${product.image}" alt="${product.name}" class="product-image" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <div class="product-info">
                    <h3 class="product-title" onmouseover="this.style.color='#666'" onmouseout="this.style.color='inherit'">${product.name}</h3>
                    <div class="product-price" onmouseover="this.style.color='#000'" onmouseout="this.style.color='#333'">
                        <span class="price-from">from</span>
                        <span class="current-price">₹${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Helper functions for labels
function getLabelClass(label) {
    if (label === 'SALE') return 'label-sale';
    if (label === 'Instant Ship') return 'label-instant';
    return 'label-default';
}

function getLabelColor(label) {
    if (label === 'SALE') return '#ff0000';
    if (label === 'Instant Ship') return 'black';
    return '#333';
}

function getLabelHoverColor(label) {
    if (label === 'SALE') return '#cc0000';
    if (label === 'Instant Ship') return '#333';
    return '#666';
}

// Update product count display
function updateProductCount() {
    const countElement = document.getElementById('productCount');
    const rangeElement = document.getElementById('productRange');
    
    if (countElement) {
        countElement.textContent = `${filteredProducts.length} products found`;
    }
    
    if (rangeElement) {
        const start = filteredProducts.length > 0 ? 1 : 0;
        const end = Math.min(filteredProducts.length, 16);
        rangeElement.textContent = `Showing ${start}-${end} of ${filteredProducts.length}`;
    }
}

// Search functionality
function handleSearch(searchTerm) {
    currentFilters.search = searchTerm;
    filterProducts();
    
    // Update search modal results
    updateSearchModalResults(searchTerm);
}

// Update search modal results
function updateSearchModalResults(searchTerm) {
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');
    
    if (!searchResults || !searchResultsList) return;
    
    if (!searchTerm || searchTerm.trim() === '') {
        searchResults.style.display = 'none';
        return;
    }
    
    // Filter products for search modal
    const searchResultsProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Show only first 5 results
    
    if (searchResultsProducts.length > 0) {
        searchResultsList.innerHTML = searchResultsProducts.map(product => `
            <div style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 0.9rem; color: #fff; cursor: pointer; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);" onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateX(5px)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.transform='translateX(0)'; this.style.boxShadow='none'" onclick="selectSearchResult('${product.name}')">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; margin-bottom: 4px;">${product.name}</div>
                        <div style="color: #ff6b35; font-size: 0.8rem;">₹${product.price.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        `).join('');
        searchResults.style.display = 'block';
    } else {
        searchResultsList.innerHTML = `
            <div style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 0.9rem; color: #ccc; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
                No products found for "${searchTerm}"
            </div>
        `;
        searchResults.style.display = 'block';
    }
}

// Select search result
function selectSearchResult(productName) {
    // Close search modal
    toggleSearchModal();
    
    // Update search filter
    currentFilters.search = productName;
    filterProducts();
    
    // Update search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = productName;
    }
}

// Filter event handlers
function handleBrandFilter(brand, isChecked) {
    if (isChecked) {
        if (!currentFilters.brands.includes(brand)) {
            currentFilters.brands.push(brand);
        }
    } else {
        currentFilters.brands = currentFilters.brands.filter(b => b !== brand);
    }
    filterProducts();
}

function handleCategoryFilter(category, isChecked) {
    if (isChecked) {
        if (!currentFilters.categories.includes(category)) {
            currentFilters.categories.push(category);
        }
    } else {
        currentFilters.categories = currentFilters.categories.filter(c => c !== category);
    }
    filterProducts();
}

function handlePriceFilter(priceRange, isChecked) {
    if (isChecked) {
        // Parse price range and update filters
        const [min, max] = parsePriceRange(priceRange);
        currentFilters.priceRange = { min, max };
    } else {
        currentFilters.priceRange = { min: 0, max: 100000 };
    }
    filterProducts();
}

function parsePriceRange(priceRange) {
    if (priceRange === 'Under ₱5,000') return [0, 5000];
    if (priceRange === '₱5,000 - ₱10,000') return [5000, 10000];
    if (priceRange === '₱10,000 - ₱20,000') return [10000, 20000];
    if (priceRange === '₱20,000 - ₱50,000') return [20000, 50000];
    if (priceRange === 'Over ₱50,000') return [50000, 100000];
    return [0, 100000];
}

function handleSizeFilter(size, isChecked) {
    if (isChecked) {
        if (!currentFilters.sizes.includes(size)) {
            currentFilters.sizes.push(size);
        }
    } else {
        currentFilters.sizes = currentFilters.sizes.filter(s => s !== size);
    }
    filterProducts();
}

function handleAvailabilityFilter(availability, isChecked) {
    if (isChecked) {
        if (!currentFilters.availability.includes(availability)) {
            currentFilters.availability.push(availability);
        }
    } else {
        currentFilters.availability = currentFilters.availability.filter(a => a !== availability);
    }
    filterProducts();
}

function handleShippingFilter(shipping, isChecked) {
    if (isChecked) {
        if (!currentFilters.shipping.includes(shipping)) {
            currentFilters.shipping.push(shipping);
        }
    } else {
        currentFilters.shipping = currentFilters.shipping.filter(s => s !== shipping);
    }
    filterProducts();
}

// Clear all filters
function clearAllFilters() {
    currentFilters = {
        search: '',
        brands: [],
        categories: [],
        priceRange: { min: 0, max: 100000 },
        sizes: [],
        availability: [],
        shipping: []
    };
    
    // Reset all checkboxes
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset brands dropdown button
    updateBrandsDropdownButton('all');
    
    filteredProducts = [...allProducts];
    renderProducts();
    updateProductCount();
}

// Sort products
function sortProducts(sortBy) {
    switch(sortBy) {
        case 'Price: Low to High':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'Price: High to Low':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'Newest First':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'Most Popular':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'Best Rated':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Default sorting (by ID)
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    renderProducts();
}

// Toggle filter sections
function toggleFilterSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('svg');
    
    content.classList.toggle('show');
    
    if (content.classList.contains('show')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Navigation function to handle category links
function navigateToCategory(category) {
    // Close mobile menu if open
    // closeHamburgerMenu(); // This function is removed
    
    const categoryPages = {
        'SNEAKERS': 'sneakers-collection.html',
        'RUNNING': 'running-collection.html',
        'STREETWEAR': 'streetwear-collection.html',
        'ACCESSORIES': 'accessories-collection.html',
        'LABUBU': 'labubu-collection.html'
    };
    
    const targetPage = categoryPages[category];
    if (targetPage) {
        window.location.href = targetPage;
    } else {
        // For categories without specific pages, show "Coming Soon" message
        showComingSoonMessage(category);
    }
}

// Navigation function to handle brand links
function navigateToBrand(brand) {
    // Close mobile menu if open
    // closeHamburgerMenu(); // This function is removed
    
    // Check if we're on a collection page
    const currentPage = window.location.pathname;
    const isCollectionPage = currentPage.includes('-collection.html');
    
    if (isCollectionPage) {
        // On collection pages, filter by brand
        filterByBrand(brand);
    } else {
        // On index page, navigate to appropriate collection page
        const brandToCategory = {
            'Nike': 'SNEAKERS',
            'Adidas': 'SNEAKERS', 
            'New Balance': 'SNEAKERS',
            'Jordan': 'SNEAKERS',
            'On Running': 'RUNNING'
        };
        
        const category = brandToCategory[brand];
        if (category) {
            navigateToCategory(category);
        } else {
            showComingSoonMessage(brand);
        }
    }
}

// Function to filter products by brand on collection pages
function filterByBrand(brand) {
    // Update active state
    updateActiveNavLink(event.target);
    
    // Update breadcrumb
    updateBreadcrumb(brand);
    
    // Update page title
    updatePageTitle(brand);
    
    // Filter products based on brand
    const filteredProducts = allProducts.filter(product => 
        product.brand.toLowerCase() === brand.toLowerCase()
    );
    
    if (filteredProducts.length === 0) {
        showComingSoonMessage(brand);
    } else {
        // Update product display
        renderProducts(filteredProducts);
        updateProductCount(filteredProducts.length);
    }
}

// Function to update active navigation link
function updateActiveNavLink(clickedLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (clickedLink) {
        clickedLink.classList.add('active');
    }
}

// Function to update breadcrumb
function updateBreadcrumb(item) {
    const breadcrumbContent = document.querySelector('.breadcrumb-content');
    if (breadcrumbContent) {
        breadcrumbContent.innerHTML = `
            <a href="index.html">Home</a> / 
            <a href="#">Collection</a> / 
            <span style="color: #333;">${item}</span>
        `;
    }
}

// Function to update page title
function updatePageTitle(title) {
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        pageTitle.textContent = title;
    }
}

// Function to show "Coming Soon" message for categories without pages
function showComingSoonMessage(category) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    // Update page title to reflect the category
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        pageTitle.textContent = category.charAt(0) + category.slice(1).toLowerCase();
    }
    
    // Clear all filters to show the message
    clearAllFilters();
    
    // Display "Coming Soon" message
    productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 4rem; margin-bottom: 20px;">🚀</div>
            <h2 style="font-size: 2rem; font-weight: 700; color: #333; margin-bottom: 15px;">Coming Soon</h2>
            <p style="font-size: 1.1rem; color: #666; margin-bottom: 30px; line-height: 1.6;">
                We're working hard to bring you amazing ${category.toLowerCase()} products.<br>
                Stay tuned for updates!
            </p>
            <button onclick="window.location.href='index.html'" style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; border: none; padding: 15px 30px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255,107,53,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(255,107,53,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(255,107,53,0.3)'">
                Back to Home
            </button>
        </div>
    `;
    
    // Update product count to show 0 products
    updateProductCount();
}

// Brands Dropdown Functions
function toggleBrandsDropdown() {
    const dropdown = document.querySelector('.brands-dropdown');
    const dropdownContent = document.getElementById('brandsDropdownContent');
    
    // Check if we're on the index page (different structure)
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    
    if (isIndexPage) {
        // For index.html, use the existing dropdown structure
        if (!dropdownContent) return;
        
        // Toggle dropdown visibility
        dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
        
        // Populate brands if dropdown is opening
        if (dropdownContent.style.display === 'block') {
            populateBrandsDropdown();
        }
    } else {
        // For collection pages, use the brands-dropdown structure
        if (!dropdown || !dropdownContent) return;
        
        // Toggle dropdown visibility
        dropdown.classList.toggle('active');
        dropdownContent.classList.toggle('show');
        
        // Populate brands if dropdown is opening
        if (dropdownContent.classList.contains('show')) {
            populateBrandsDropdown();
        }
    }
}

function populateBrandsDropdown() {
    const dropdownContent = document.getElementById('brandsDropdownContent');
    if (!dropdownContent) return;
    
    // Get unique brands from all products
    const brands = [...new Set(allProducts.map(product => product.brand))];
    
    // Check if we're on the index page (different structure)
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    
    if (isIndexPage) {
        // For index.html, use the dropdown-col structure
        const brandOptions = brands.map(brand => {
            const productCount = allProducts.filter(product => product.brand === brand).length;
            return `
                <a href="javascript:void(0)" onclick="selectBrand('${brand}')">
                    <span class="dropdown-title">${brand}</span>
                    <span class="dropdown-desc">${productCount} products available</span>
                </a>
            `;
        }).join('');
        
        // Add "All Brands" option at the top
        const allBrandsOption = `
            <a href="javascript:void(0)" onclick="selectBrand('all')">
                <span class="dropdown-title">All Brands</span>
                <span class="dropdown-desc">${allProducts.length} products available</span>
            </a>
        `;
        
        dropdownContent.innerHTML = allBrandsOption + brandOptions;
    } else {
        // For collection pages, use the simple button structure
        const brandOptions = brands.map(brand => {
            const productCount = allProducts.filter(product => product.brand === brand).length;
            return `
                <button class="brand-option" onclick="selectBrand('${brand}')">
                    ${brand} (${productCount})
                </button>
            `;
        }).join('');
        
        // Add "All Brands" option at the top
        const allBrandsOption = `
            <button class="brand-option selected" onclick="selectBrand('all')">
                All Brands (${allProducts.length})
            </button>
        `;
        
        dropdownContent.innerHTML = allBrandsOption + brandOptions;
    }
}

function selectBrand(brand) {
    const dropdown = document.querySelector('.brands-dropdown');
    const dropdownContent = document.getElementById('brandsDropdownContent');
    
    // Check if we're on the index page (different structure)
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    
    if (isIndexPage) {
        // For index.html, close dropdown
        if (dropdownContent) {
            dropdownContent.style.display = 'none';
        }
    } else {
        // For collection pages, close dropdown
        if (dropdown && dropdownContent) {
            dropdown.classList.remove('active');
            dropdownContent.classList.remove('show');
        }
    }
    
    // Clear all existing brand filters first
    currentFilters.brands = [];
    
    if (brand === 'all') {
        // Show all products
        filteredProducts = [...allProducts];
    } else {
        // Filter by selected brand
        const brandProducts = allProducts.filter(product => product.brand === brand);
        
        if (brandProducts.length === 0) {
            // No products for this brand - show "Coming Soon" message
            showBrandComingSoonMessage(brand);
            return;
        }
        
        // Apply brand filter
        currentFilters.brands = [brand];
        filteredProducts = brandProducts;
    }
    
    // Apply other existing filters
    filterProducts();
    renderProducts();
    updateProductCount();
    
    // Update dropdown button text
    updateBrandsDropdownButton(brand);
}

function showBrandComingSoonMessage(brand) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    // Update page title to reflect the brand
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        pageTitle.textContent = brand;
    }
    
    // Display "Coming Soon" message
    productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 4rem; margin-bottom: 20px;">🚀</div>
            <h2 style="font-size: 2rem; font-weight: 700; color: #333; margin-bottom: 15px;">Coming Soon</h2>
            <p style="font-size: 1.1rem; color: #666; margin-bottom: 30px; line-height: 1.6;">
                We're working hard to bring you amazing ${brand} products.<br>
                Stay tuned for updates!
            </p>
            <button onclick="clearAllFilters()" style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; border: none; padding: 15px 30px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255,107,53,0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(255,107,53,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(255,107,53,0.3)'">
                View All Products
            </button>
        </div>
    `;
    
    // Update product count to show 0 products
    updateProductCount();
}

function updateBrandsDropdownButton(selectedBrand) {
    // Check if we're on the index page (different structure)
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    
    if (isIndexPage) {
        // For index.html, update the dropdown link text
        const brandsLink = document.querySelector('a[onclick="toggleBrandsDropdown()"]');
        if (brandsLink) {
            if (selectedBrand === 'all') {
                brandsLink.innerHTML = `Brands <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
            } else {
                brandsLink.innerHTML = `${selectedBrand} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
            }
        }
    } else {
        // For collection pages, update the brands dropdown button
        const dropdownBtn = document.querySelector('.brands-dropdown-btn');
        if (!dropdownBtn) return;
        
        if (selectedBrand === 'all') {
            dropdownBtn.innerHTML = `
                BRANDS 
                <svg class="brands-arrow" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="transition: transform 0.3s ease;">
                    <polyline points="6,9 12,15 18,9"/>
                </svg>
            `;
        } else {
            dropdownBtn.innerHTML = `
                ${selectedBrand.toUpperCase()} 
                <svg class="brands-arrow" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="transition: transform 0.3s ease;">
                    <polyline points="6,9 12,15 18,9"/>
                </svg>
            `;
        }
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.brands-dropdown');
    const dropdownContent = document.getElementById('brandsDropdownContent');
    
    // Check if we're on the index page (different structure)
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
    
    if (isIndexPage) {
        // For index.html, close dropdown if clicking outside
        if (dropdownContent && !dropdownContent.contains(event.target) && !event.target.closest('a[onclick="toggleBrandsDropdown()"]')) {
            dropdownContent.style.display = 'none';
        }
    } else {
        // For collection pages, close dropdown if clicking outside
        if (dropdown && !dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
            if (dropdownContent) {
                dropdownContent.classList.remove('show');
            }
        }
    }
});

// Initialize navigation functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Update active state
            updateActiveNavLink(this);
        });
    });
    

});
