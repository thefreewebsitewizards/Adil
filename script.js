// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount();
        this.updateCartDisplay();
        this.bindEvents();
    }

    bindEvents() {
        // Remove existing event listeners to prevent duplicates
        if (this.clickHandler) {
            document.removeEventListener('click', this.clickHandler);
        }
        
        // Create a single click handler for all buttons
        this.clickHandler = (e) => {
            // View Details buttons
            if (e.target.classList.contains('view-details-btn') || e.target.closest('.view-details-btn')) {
                e.preventDefault();
                e.stopPropagation();
                
                const button = e.target.classList.contains('view-details-btn') ? e.target : e.target.closest('.view-details-btn');
                const productId = parseInt(button.dataset.id);
                
                // Get complete product data from collection.js
                let product = null;
                if (typeof products !== 'undefined') {
                    // Search in all product categories
                    const allProducts = [...(products.sneakers || []), ...(products.streetwear || []), ...(products.accessories || [])];
                    product = allProducts.find(p => p.id === productId);
                }
                
                // Fallback to button data if product not found
                if (!product) {
                    product = {
                        id: productId,
                        name: button.dataset.name,
                        price: parseFloat(button.dataset.price),
                        image: button.dataset.image
                    };
                }
                
                this.openProductDetailsModal(product);
                return;
            }
            
            // Add to cart buttons
            let button = null;
            if (e.target.classList.contains('add-to-cart-btn')) {
                button = e.target;
            } else if (e.target.closest('.add-to-cart-btn')) {
                button = e.target.closest('.add-to-cart-btn');
            }
            
            if (button && !button.disabled) {
                e.preventDefault();
                e.stopPropagation();
                
                const product = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: parseFloat(button.dataset.price),
                    image: button.dataset.image
                };
                
                this.openSizeModal(product);
                return;
            }
        };
        
        document.addEventListener('click', this.clickHandler);

        // Cart toggle
        const cartToggle = document.getElementById('cart-toggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCart();
            });
        }

        // Close cart
        const closeCart = document.getElementById('close-cart');
        const cartBackdrop = document.getElementById('cart-backdrop');
        if (closeCart) closeCart.addEventListener('click', () => this.closeCart());
        if (cartBackdrop) cartBackdrop.addEventListener('click', () => this.closeCart());
        
        // Close cart when clicking outside (on modal backdrop)
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.addEventListener('click', (e) => {
                if (e.target === cartModal) {
                    this.closeCart();
                }
            });
        }

        // Clear cart
        const clearCart = document.getElementById('clear-cart');
        if (clearCart) {
            clearCart.addEventListener('click', () => this.clearCart());
        }

        // Remove item buttons (delegated)
        document.addEventListener('click', (e) => {
            if (e.target.matches('.remove-item')) {
                const productId = e.target.dataset.id;
                this.removeItem(productId);
            }
        });
        
        // Shipping option change listener
        document.addEventListener('change', (e) => {
            if (e.target.name === 'shipping') {
                this.updateCartDisplay();
            }
        });
        

        
        // Checkout button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#checkout-btn') || e.target.matches('#proceed-checkout')) {
                this.proceedToCheckout();
            }
        });
        
        // Checkout modal events
        document.addEventListener('click', (e) => {
            if (e.target.matches('#close-checkout-modal') || e.target.matches('#close-checkout') || e.target.matches('#cancel-checkout')) {
                this.closeCheckoutModal();
            }
            if (e.target.matches('#clear-cart')) {
                this.clearCart();
            }
        });
        
        // Checkout form submission
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#checkout-form')) {
                e.preventDefault();
                this.confirmCheckout();
            }
        });
        
        // Checkout backdrop
        document.addEventListener('click', (e) => {
            if (e.target.matches('#checkout-backdrop')) {
                this.closeCheckoutModal();
            }
        });
        
        // Shipping option change
        document.addEventListener('change', (e) => {
            if (e.target.matches('input[name="shipping"]')) {
                this.updateCartTotals();
            }
        });
        
        // Size modal events
        this.bindSizeModalEvents();
        this.bindSuccessModalEvents();
        this.bindProductDetailsModalEvents();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showToast(`${product.name} added to cart!`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
                this.updateCartDisplay();
            }
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showToast('Cart cleared!');
    }
    
    proceedToCheckout() {
        if (this.items.length === 0) {
            this.showToast('Your cart is empty!');
            return;
        }
        
        // Show sign-in modal instead of proceeding directly to checkout
        this.showSignInModal();
    }
    
    // New method to show sign-in modal
    showSignInModal() {
        const modal = document.getElementById('signin-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Bind sign-in modal events if not already bound
            this.bindSignInModalEvents();
        }
    }
    
    // New method to close sign-in modal
    closeSignInModal() {
        const modal = document.getElementById('signin-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
    
    // New method to bind sign-in modal events
    bindSignInModalEvents() {
        // Prevent multiple event bindings
        if (this.signInEventsbound) return;
        this.signInEventsbound = true;
        
        // Close modal events
        const closeBtn = document.getElementById('close-signin-modal');
        const backdrop = document.getElementById('signin-backdrop');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeSignInModal());
        }
        
        if (backdrop) {
            backdrop.addEventListener('click', () => this.closeSignInModal());
        }
        
        // Sign in form submission (mock functionality)
        const signInForm = document.getElementById('signin-form');
        const signInSubmit = document.getElementById('signin-submit');
        
        if (signInSubmit) {
            signInSubmit.addEventListener('click', (e) => {
                e.preventDefault();
                // Mock sign-in success
                this.closeSignInModal();
                this.showToast('Successfully signed in! Proceeding to checkout...');
                
                // Now proceed with actual checkout after "signing in"
                setTimeout(() => {
                    this.actualProceedToCheckout();
                }, 1000);
            });
        }
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSignInModal();
            }
        });
    }
    
    // Original checkout logic moved to separate method
    actualProceedToCheckout() {
        const shippingOption = document.querySelector('input[name="shipping"]:checked')?.value || 'standard';
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'card';
        
        // Calculate totals
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let shippingCost = 0;
        switch(shippingOption) {
            case 'express': shippingCost = 12.99; break;
            case 'overnight': shippingCost = 24.99; break;
            default: shippingCost = 0; break;
        }
        const tax = subtotal * 0.085;
        const total = subtotal + shippingCost + tax;
        
        // Show checkout confirmation
        const checkoutData = {
            items: this.items,
            subtotal: subtotal.toFixed(2),
            shipping: shippingCost.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
            shippingOption,
            paymentMethod
        };
        
        this.showCheckoutModal(checkoutData);
    }
    
    showCheckoutModal(checkoutData) {
        const modal = document.getElementById('checkout-modal');
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutShipping = document.getElementById('checkout-shipping');
        const checkoutTax = document.getElementById('checkout-tax');
        const checkoutTotal = document.getElementById('checkout-total');
        
        // Populate items
        if (checkoutItems) {
            checkoutItems.innerHTML = checkoutData.items.map(item => `
                <div class="flex items-center bg-gray-800 rounded-lg p-3">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-1 ml-3">
                        <h5 class="text-white text-sm font-semibold">${item.name}</h5>
                        <p class="text-gray-400 text-xs">${item.size ? `Size: ${item.size}` : ''}</p>
                        <p class="text-green-400 text-sm">$${item.price} x ${item.quantity}</p>
                    </div>
                </div>
            `).join('');
        }
        
        // Populate totals
        if (checkoutSubtotal) checkoutSubtotal.textContent = `$${checkoutData.subtotal}`;
        if (checkoutShipping) checkoutShipping.textContent = `$${checkoutData.shipping}`;
        if (checkoutTax) checkoutTax.textContent = `$${checkoutData.tax}`;
        if (checkoutTotal) checkoutTotal.textContent = `$${checkoutData.total}`;
        
        // Show modal
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeCheckoutModal() {
        const modal = document.getElementById('checkout-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    confirmCheckout() {
        // Simulate order processing
        this.showToast('Order placed successfully! Thank you for your purchase.');
        
        // Clear cart
        this.clearCart();
        
        // Close modals
        this.closeCheckoutModal();
        this.closeCart();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
            // Always show the cart count badge
            cartCount.style.display = 'flex';
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');
        const cartFooter = document.getElementById('cart-footer');

        // Return early if cart elements don't exist on this page
        if (!cartItems || !emptyCart) {
            return;
        }

        if (this.items.length === 0) {
            emptyCart.style.display = 'block';
            // Clear any existing cart items but keep the empty cart message
            const cartItemsContent = cartItems.querySelectorAll('.cart-item');
            cartItemsContent.forEach(item => item.remove());
            if (cartFooter) {
                cartFooter.style.display = 'block';
                // Disable the proceed to checkout button when cart is empty
                const checkoutBtn = document.getElementById('checkout-btn') || document.getElementById('proceed-checkout');
                if (checkoutBtn) {
                    checkoutBtn.disabled = true;
                    checkoutBtn.classList.remove('bg-green-400', 'hover:bg-green-500');
                    checkoutBtn.classList.add('bg-gray-500', 'cursor-not-allowed');
                }
            }
        } else {
            emptyCart.style.display = 'none';
            if (cartFooter) {
                cartFooter.style.display = 'block';
                // Re-enable the proceed to checkout button when cart has items
                const checkoutBtn = document.getElementById('checkout-btn') || document.getElementById('proceed-checkout');
                if (checkoutBtn) {
                    checkoutBtn.disabled = false;
                    checkoutBtn.classList.remove('bg-gray-500', 'cursor-not-allowed');
                    checkoutBtn.classList.add('bg-green-400', 'hover:bg-green-500');
                }
            }
            
            // Clear existing items and add new ones
            const cartItemsContent = cartItems.querySelectorAll('.cart-item');
            cartItemsContent.forEach(item => item.remove());
            
            const itemsHTML = this.items.map(item => `
                <div class="cart-item flex items-center bg-gray-800 rounded-lg p-3">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                    <div class="flex-1 ml-3">
                        <h4 class="font-semibold text-white text-sm">${item.name}</h4>
                        <p class="text-gray-400 text-xs">${item.size ? `Size: ${item.size}` : ''}</p>
                        <p class="text-green-400 font-bold">$${item.price}</p>
                        <div class="flex items-center mt-2">
                            <button class="quantity-btn bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center" 
                                    onclick="window.cart.updateQuantity('${item.id}', ${item.quantity - 1})">
                                <i class="fas fa-minus text-xs"></i>
                            </button>
                            <span class="mx-3 text-white font-semibold">${item.quantity}</span>
                            <button class="quantity-btn bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded flex items-center justify-center" 
                                    onclick="window.cart.updateQuantity('${item.id}', ${item.quantity + 1})">
                                <i class="fas fa-plus text-xs"></i>
                            </button>
                        </div>
                    </div>
                    <button class="text-red-400 hover:text-red-300 ml-2" onclick="window.cart.removeItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
            
            // Insert the items HTML into the cart
            cartItems.insertAdjacentHTML('beforeend', itemsHTML);
        }
        
        this.updateCartTotals();
    }

    updateCartTotals() {
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartShipping = document.getElementById('cart-shipping');
        const cartTax = document.getElementById('cart-tax');
        const cartTotal = document.getElementById('cart-total');
        
        // Calculate subtotal
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Calculate shipping based on selected option
        const shippingOption = document.querySelector('input[name="shipping"]:checked')?.value || 'standard';
        let shippingCost = 0;
        switch(shippingOption) {
            case 'express': shippingCost = 12.99; break;
            case 'overnight': shippingCost = 24.99; break;
            default: shippingCost = 0; break;
        }
        
        // Calculate tax (8.5% tax rate)
        const taxRate = 0.085;
        const tax = subtotal * taxRate;
        
        // Calculate total
        const total = subtotal + shippingCost + tax;
        
        // Update display
        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (cartShipping) cartShipping.textContent = `$${shippingCost.toFixed(2)}`;
        if (cartTax) cartTax.textContent = `$${tax.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    toggleCart() {
        const cartModal = document.getElementById('cart-modal');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartBackdrop = document.getElementById('cart-backdrop');
        
        // Return early if cart sidebar doesn't exist on this page
        if (!cartSidebar || !cartModal) {
            return;
        }
        
        // Show cart modal and sidebar
        cartModal.classList.remove('hidden');
        cartSidebar.classList.remove('translate-x-full');
        
        // Create backdrop if it doesn't exist
        if (!cartBackdrop) {
            const backdrop = document.createElement('div');
            backdrop.id = 'cart-backdrop';
            backdrop.className = 'fixed inset-0 bg-black bg-opacity-50 z-40';
            document.body.appendChild(backdrop);
            backdrop.addEventListener('click', () => this.closeCart());
        } else {
            cartBackdrop.style.display = 'block';
        }
        
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        const cartModal = document.getElementById('cart-modal');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartBackdrop = document.getElementById('cart-backdrop');
        
        // Return early if cart sidebar doesn't exist on this page
        if (!cartSidebar || !cartModal) {
            return;
        }
        
        // Hide cart sidebar
        cartSidebar.classList.add('translate-x-full');
        
        // Hide cart modal after animation
        setTimeout(() => {
            cartModal.classList.add('hidden');
        }, 300);
        
        document.body.style.overflow = 'auto';
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.remove('hidden', 'translate-x-full');
            
            setTimeout(() => {
                toast.classList.add('translate-x-full');
                setTimeout(() => {
                    toast.classList.add('hidden');
                }, 300); // Wait for animation to complete
            }, 3000);
        }
    }

    openSizeModal(product) {
        console.log('Opening size modal for product:', product);
        this.currentProduct = product;
        this.selectedSize = null;
        this.quantity = 1;
        
        const sizeModal = document.getElementById('size-modal');
        const productImage = document.getElementById('size-modal-image');
        const productTitle = document.getElementById('size-modal-title');
        const productPrice = document.getElementById('size-modal-price');
        const quantityDisplay = document.getElementById('quantity-display');
        const confirmButton = document.getElementById('confirm-add-to-cart');
        
        if (!sizeModal) {
            console.error('Size modal not found!');
            return;
        }
        
        if (sizeModal && productImage && productTitle && productPrice) {
            productImage.src = product.image;
            productTitle.textContent = product.name;
            productPrice.textContent = `$${product.price}`;
            if (quantityDisplay) quantityDisplay.textContent = this.quantity;
            
            // Reset size selection
            document.querySelectorAll('.size-option').forEach(opt => {
                opt.classList.remove('border-green-400', 'text-green-400');
                opt.classList.add('border-gray-600', 'text-white');
            });
            
            // Disable confirm button initially
            if (confirmButton) {
                confirmButton.disabled = true;
                confirmButton.classList.add('opacity-50', 'cursor-not-allowed');
                confirmButton.classList.remove('hover:bg-green-600');
            }
            
            sizeModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            console.log('Size modal should now be visible');
        }
    }

    closeSizeModal() {
        const sizeModal = document.getElementById('size-modal');
        if (sizeModal) {
            sizeModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    bindSizeModalEvents() {
        // Close size modal
        const closeSizeModal = document.getElementById('close-size-modal');
        const closeSizeModalBtn = document.getElementById('close-size-modal-btn');
        const sizeModalBackdrop = document.getElementById('size-backdrop');
        const confirmAddToCart = document.getElementById('confirm-add-to-cart');
        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        
        if (closeSizeModal) {
            closeSizeModal.addEventListener('click', () => this.closeSizeModal());
        }
        
        if (closeSizeModalBtn) {
            closeSizeModalBtn.addEventListener('click', () => this.closeSizeModal());
        }
        
        if (sizeModalBackdrop) {
            sizeModalBackdrop.addEventListener('click', () => this.closeSizeModal());
        }

        // Size selection
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                // Remove selection from all options
                document.querySelectorAll('.size-option').forEach(opt => {
                    opt.classList.remove('border-green-400', 'text-green-400');
                    opt.classList.add('border-gray-600', 'text-white');
                });
                
                // Add selection to clicked option
                option.classList.remove('border-gray-600', 'text-white');
                option.classList.add('border-green-400', 'text-green-400');
                
                this.selectedSize = option.textContent;
                
                // Enable confirm button if size is selected
                if (confirmAddToCart) {
                    confirmAddToCart.disabled = false;
                    confirmAddToCart.classList.remove('opacity-50', 'cursor-not-allowed');
                    confirmAddToCart.classList.add('hover:bg-green-600');
                }
            });
        });
        
        // Quantity controls
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                if (this.quantity > 1) {
                    this.quantity--;
                    document.getElementById('quantity-display').textContent = this.quantity;
                }
            });
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                this.quantity++;
                document.getElementById('quantity-display').textContent = this.quantity;
            });
        }

        // Add to cart with size
        if (confirmAddToCart) {
            confirmAddToCart.addEventListener('click', () => {
                if (this.currentProduct && this.selectedSize) {
                    const productWithSize = {
                        ...this.currentProduct,
                        size: this.selectedSize,
                        id: `${this.currentProduct.id}-${this.selectedSize}`
                    };
                    
                    // Add item with selected quantity
                    for (let i = 0; i < this.quantity; i++) {
                        this.addItem(productWithSize);
                    }
                    this.closeSizeModal();
                    this.showSuccessModal(productWithSize, this.selectedSize, this.quantity);
                }
            });
        }
    }

    showSuccessModal(product, size, quantity) {
        const successModal = document.getElementById('success-modal');
        const successImage = document.getElementById('success-modal-image');
        const successTitle = document.getElementById('success-modal-title');
        const successSize = document.getElementById('success-modal-size');
        const successQty = document.getElementById('success-modal-qty');
        const successPrice = document.getElementById('success-modal-price');
        
        if (successModal && successImage && successTitle && successSize) {
            successImage.src = product.image;
            successTitle.textContent = product.name;
            successSize.textContent = size || product.size || 'N/A';
            successPrice.textContent = `$${product.price}`;
            
            if (successQty && quantity) {
                successQty.textContent = quantity;
            }
            
            successModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Auto close after 3 seconds
            setTimeout(() => {
                this.closeSuccessModal();
            }, 3000);
        }
    }

    closeSuccessModal() {
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.classList.add('hidden');
        }
    }

    bindSuccessModalEvents() {
        const successModal = document.getElementById('success-modal');
        const successBackdrop = document.getElementById('success-backdrop');
        const continueShoppingBtn = document.getElementById('continue-shopping');
        const viewCartBtn = document.getElementById('view-cart');
        
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => this.closeSuccessModal());
        }
        
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', () => {
                this.closeSuccessModal();
                this.toggleCart();
            });
        }
        
        if (successBackdrop) {
            successBackdrop.addEventListener('click', () => this.closeSuccessModal());
        }
    }

    openProductDetailsModal(product) {
        // Try both modal IDs - index.html uses 'productDetailsModal', other pages use 'product-details-modal'
        let modal = document.getElementById('product-details-modal');
        if (!modal) {
            modal = document.getElementById('productDetailsModal');
        }
        if (!modal) {
            console.error('Product details modal not found!');
            return;
        }
        
        // Populate product information - try both sets of element IDs
        let productImage = document.getElementById('product-details-image');
        if (!productImage) productImage = document.getElementById('detailsProductImage');
        
        let productTitle = document.getElementById('product-details-title');
        if (!productTitle) productTitle = document.getElementById('detailsProductName');
        
        let productPrice = document.getElementById('product-details-price');
        if (!productPrice) productPrice = document.getElementById('detailsProductPrice');
        
        const productDescription = document.getElementById('product-details-description');
        
        let sizesContainer = document.getElementById('product-details-sizes');
        if (!sizesContainer) sizesContainer = document.getElementById('detailsSizeOptions');
        
        if (productImage) productImage.src = product.image;
        if (productTitle) productTitle.textContent = product.title || product.name;
        if (productPrice) {
            // Handle different price display formats
            if (productPrice.id === 'detailsProductPrice') {
                productPrice.textContent = product.price; // For index.html span element
            } else {
                productPrice.textContent = `$${product.price}`; // For other pages
            }
        }
        if (productDescription) {
            productDescription.textContent = `Premium quality ${(product.title || product.name).toLowerCase()} from a top brand. Perfect for style and comfort.`;
        }
        
        // Populate size options for accessories (one size fits all)
        if (sizesContainer) {
            sizesContainer.innerHTML = '';
            const sizeButton = document.createElement('button');
            sizeButton.className = 'product-size-option border-2 border-gray-600 text-white py-2 px-4 rounded transition-colors hover:border-green-400';
            sizeButton.dataset.size = 'One Size';
            sizeButton.textContent = 'One Size';
            
            // Add click event for size selection
            sizeButton.addEventListener('click', () => {
                // Remove selection from all options
                const allSizeOptions = document.querySelectorAll('#product-details-sizes .product-size-option');
                allSizeOptions.forEach(opt => {
                    opt.classList.remove('border-green-400', 'bg-green-400', 'text-black');
                    opt.classList.add('border-gray-600');
                });
                
                // Add selection to clicked option
                sizeButton.classList.remove('border-gray-600');
                sizeButton.classList.add('border-green-400', 'bg-green-400', 'text-black');
                
                this.selectedDetailsSize = sizeButton.dataset.size;
                
                // Enable add to cart button when size is selected
                const addToCartBtn = document.getElementById('product-details-add-to-cart');
                if (addToCartBtn) {
                    addToCartBtn.disabled = false;
                }
            });
            
            sizesContainer.appendChild(sizeButton);
        }
        
        // Store current product
        this.currentDetailsProduct = product;
        
        // Populate recommendations
        this.populateRecommendations(product);
        
        // Reset form state
        this.resetProductDetailsForm();
        
        // Bind events for this modal instance
        this.bindProductDetailsModalEvents();
        
        // Show modal with proper animation for index.html
        modal.classList.remove('hidden');
        
        // Handle different modal structures
        if (modal.id === 'productDetailsModal') {
            // For index.html modal with animation classes
            modal.classList.add('flex'); // Show backdrop
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                setTimeout(() => {
                    modalContent.classList.remove('scale-95', 'opacity-0');
                    modalContent.classList.add('scale-100', 'opacity-100');
                }, 10);
            }
        }
        
        document.body.style.overflow = 'hidden';
    }

    closeProductDetailsModal() {
        // Try both modal IDs
        let modal = document.getElementById('product-details-modal');
        if (!modal) {
            modal = document.getElementById('productDetailsModal');
        }
        if (!modal) return;
        
        // Handle different modal structures
        if (modal.id === 'productDetailsModal') {
            // For index.html modal with animation classes
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.remove('scale-100', 'opacity-100');
                modalContent.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }, 300);
            } else {
                modal.classList.add('hidden');
            }
        } else {
            modal.classList.add('hidden');
        }
        document.body.style.overflow = 'auto';
    }

    populateRecommendations(currentProduct) {
        const recommendationsContainer = document.getElementById('product-recommendations');
        if (!recommendationsContainer || typeof products === 'undefined') {
            return;
        }
        
        // Get all products from the same category, excluding the current product
        let allProducts = [];
        if (currentProduct.category === 'sneakers') {
            allProducts = products.sneakers || [];
        } else if (currentProduct.category === 'accessories') {
            allProducts = products.accessories || [];
        } else if (currentProduct.category === 'streetwear') {
            allProducts = products.streetwear || [];
        }
        
        // Filter out current product and get random 4 recommendations
        const recommendations = allProducts
            .filter(p => p.id !== currentProduct.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
        
        // Generate HTML for recommendations
        recommendationsContainer.innerHTML = recommendations.map(product => `
            <div class="recommendation-item cursor-pointer hover:opacity-80 transition" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="w-full h-16 object-cover rounded">
                <p class="text-xs text-white mt-1 truncate">${product.name}</p>
                <p class="text-xs text-green-400">$${product.price}</p>
            </div>
        `).join('');
        
        // Add click handlers for recommendations
        recommendationsContainer.querySelectorAll('.recommendation-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = parseInt(item.dataset.productId);
                const recommendedProduct = allProducts.find(p => p.id === productId);
                if (recommendedProduct) {
                    this.openProductDetailsModal(recommendedProduct);
                }
            });
        });
    }

    resetProductDetailsForm() {
        // Reset size selection
        const sizeOptions = document.querySelectorAll('#product-details-sizes .product-size-option');
        sizeOptions.forEach(option => {
            option.classList.remove('border-green-400', 'bg-green-400', 'text-black');
            option.classList.add('border-gray-600');
        });
        
        // Reset quantity
        const quantityElement = document.getElementById('product-details-quantity');
        if (quantityElement) {
            quantityElement.textContent = '1';
        }
        
        // Disable add to cart button
        const addToCartBtn = document.getElementById('product-details-add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.disabled = true;
        }
        
        // Reset selected values
        this.selectedDetailsSize = null;
        this.detailsQuantity = 1;
    }

    bindProductDetailsModalEvents() {
        // Try both modal IDs
        let modal = document.getElementById('product-details-modal');
        if (!modal) {
            modal = document.getElementById('productDetailsModal');
        }
        const closeBtn = document.getElementById('close-product-details');
        
        // Try both sets of quantity control IDs
        let decreaseBtn = document.getElementById('product-details-decrease-qty');
        if (!decreaseBtn) decreaseBtn = document.getElementById('detailsDecreaseQty');
        
        let increaseBtn = document.getElementById('product-details-increase-qty');
        if (!increaseBtn) increaseBtn = document.getElementById('detailsIncreaseQty');
        
        let addToCartBtn = document.getElementById('product-details-add-to-cart');
        if (!addToCartBtn) addToCartBtn = document.getElementById('detailsAddToCart');
        
        // Check if modal exists
        if (!modal) {
            console.log('Product details modal not found on this page');
            return;
        }
        
        // Remove existing event listeners to prevent duplicates
        if (this.detailsModalBound) {
            return;
        }
        
        // Close modal events
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeProductDetailsModal());
        }
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.id === 'product-details-backdrop') {
                this.closeProductDetailsModal();
            }
        });
        
        // Quantity controls
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                if (this.detailsQuantity > 1) {
                    this.detailsQuantity--;
                    // Try both quantity display IDs
                    let quantityDisplay = document.getElementById('product-details-quantity');
                    if (!quantityDisplay) quantityDisplay = document.getElementById('detailsQuantity');
                    if (quantityDisplay) quantityDisplay.textContent = this.detailsQuantity;
                }
            });
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                this.detailsQuantity++;
                // Try both quantity display IDs
                let quantityDisplay = document.getElementById('product-details-quantity');
                if (!quantityDisplay) quantityDisplay = document.getElementById('detailsQuantity');
                if (quantityDisplay) quantityDisplay.textContent = this.detailsQuantity;
            });
        }
        
        // Add to cart from details modal
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                if (!this.selectedDetailsSize) {
                    // Show error or disable button if no size selected
                    return;
                }
                
                const productWithDetails = {
                    ...this.currentDetailsProduct,
                    size: this.selectedDetailsSize,
                    quantity: this.detailsQuantity
                };
                
                // Add to cart
                const existingItem = this.items.find(item => 
                    item.id === productWithDetails.id && item.size === productWithDetails.size
                );
                
                if (existingItem) {
                    existingItem.quantity += productWithDetails.quantity;
                } else {
                    this.items.push(productWithDetails);
                }
                
                this.saveCart();
                this.updateCartCount();
                this.updateCartDisplay();
                
                // Close details modal and show success modal
                this.closeProductDetailsModal();
                this.showSuccessModal(productWithDetails, productWithDetails.size, productWithDetails.quantity);
            });
        }
        
        // Mark as bound to prevent duplicate binding
        this.detailsModalBound = true;
        
        // Initialize quantity and size variables
        this.detailsQuantity = 1;
        this.selectedDetailsSize = null;
    }
}

// Initialize cart
let cart;

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('button[class*="md:hidden"]');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
    }
}

// Product modal functionality
function initProductModal() {
    const productModal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-modal');

    if (productModal && closeModal) {
        // Open modal when clicking on a product (for demo purposes)
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't open modal if clicking on add to cart button
                if (e.target.closest('.add-to-cart-btn')) return;
                
                // Don't open modal if clicking on view details button
                if (e.target.closest('.view-details-btn')) return;
                
                // Don't open modal if clicking on featured collection cards
                const featuredSection = card.closest('section');
                if (featuredSection && featuredSection.querySelector('h2') && 
                    featuredSection.querySelector('h2').textContent.includes('FEATURED COLLECTIONS')) {
                    return;
                }
                
                // Don't open modal if clicking on a link (Shop Now buttons)
                if (e.target.closest('a')) return;
                
                productModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        closeModal.addEventListener('click', function() {
            productModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === productModal) {
                productModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Change main product image
function changeMainImage(src) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = src;
    }
}

// Tab functionality
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
        evt.currentTarget.classList.add('active');
    }
}

// Size selection
function initSizeSelection() {
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Image Modal functionality
function initImageModal() {
    const imageModal = document.getElementById('image-modal');
    // Check if image modal elements exist before proceeding
    if (!imageModal) {
        console.log('Image modal not found, skipping initialization');
        return;
    }
    
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.getElementById('close-image-modal');
    const backdrop = document.getElementById('image-backdrop');
    
    // Make sure all required elements exist
    if (!modalImage || !closeBtn || !backdrop) {
        console.log('Image modal elements missing, skipping initialization');
        return;
    }
    
    // Make product card images clickable (exclude featured collections)
    document.querySelectorAll('.product-card img').forEach(img => {
        // Skip images in featured collections section
        const featuredSection = img.closest('section');
        if (featuredSection && featuredSection.querySelector('h2') && 
            featuredSection.querySelector('h2').textContent.includes('FEATURED COLLECTIONS')) {
            return;
        }
        
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openImageModal(img.src, img.alt);
        });
    });
    
    // Close modal events
    closeBtn.addEventListener('click', closeImageModal);
    backdrop.addEventListener('click', closeImageModal);
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
            closeImageModal();
        }
    });
    
    // Touch events for mobile swipe-to-close
    let startY = 0;
    let startX = 0;
    
    imageModal.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });
    
    imageModal.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const diffY = startY - endY;
        const diffX = startX - endX;
        
        // Swipe up or down to close (minimum 100px)
        if (Math.abs(diffY) > 100 && Math.abs(diffY) > Math.abs(diffX)) {
            closeImageModal();
        }
    });
}

function openImageModal(src, alt) {
    const imageModal = document.getElementById('image-modal');
    if (!imageModal) {
        console.log('Image modal not found, cannot open');
        return;
    }
    
    const modalImage = document.getElementById('modal-image');
    if (!modalImage) {
        console.log('Modal image element not found, cannot open');
        return;
    }
    
    modalImage.src = src;
    modalImage.alt = alt;
    
    imageModal.classList.remove('hidden');
    imageModal.style.opacity = '0';
    
    // Fade in animation
    setTimeout(() => {
        imageModal.style.transition = 'opacity 0.3s ease-in-out';
        imageModal.style.opacity = '1';
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const imageModal = document.getElementById('image-modal');
    if (!imageModal) {
        console.log('Image modal not found, cannot close');
        return;
    }
    
    // Fade out animation
    imageModal.style.opacity = '0';
    
    setTimeout(() => {
        imageModal.classList.add('hidden');
        imageModal.style.transition = '';
        document.body.style.overflow = '';
    }, 300);
}

// User Icon functionality
function initUserIcon() {
    const userIcon = document.getElementById('user-icon');
    
    if (userIcon && window.cart) {
        userIcon.addEventListener('click', function() {
            window.cart.showSignInModal();
        });
    }
}

// Modern Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Parallax Effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
            
            if (isVisible) {
                element.style.transform = `translate3d(0, ${rate * 0.1}px, 0)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Enhanced Navigation Scroll Effect
function initNavScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
            if (currentScrollY > lastScrollY) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.classList.remove('scrolled');
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing cart...');
    // Initialize all functionality
    window.cart = new ShoppingCart();
    console.log('Cart initialized:', window.cart);
    initMobileMenu();
    initProductModal();
    initSizeSelection();
    initImageModal();
    initUserIcon();
    initScrollAnimations();
    initParallaxEffect();
    initNavScrollEffect();
    console.log('All initialization complete');
});

// Listen for products being rendered on collection pages
document.addEventListener('productsRendered', function() {
    // Re-bind event listeners for dynamically rendered products
    if (window.cart) {
        window.cart.bindEvents();
    }
});