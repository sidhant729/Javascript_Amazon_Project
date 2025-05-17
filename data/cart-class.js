class Cart {
    cartItems;
    localStorageKey;
    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: '1'
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: '2'
                },
            ];
        }
    };
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    };
    addToCart(productId, currentQuantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += currentQuantity;
        } else {
            this.cartItems.push({
                productId,
                quantity: currentQuantity,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage(this.cartItems);
    };
    calculateCartQuantity() {
        // Calculate total Quantity to show number of Items in cart on UI
        let totalQuantity = 0;
        this.cartItems.forEach((cartItem) => (totalQuantity += cartItem.quantity));
        return totalQuantity;
    };
    removeFromCart() {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        })
        this.cartItems = newCart;
        this.saveToStorage(this.cartItems);
    };
    updateDeliveryOption() {
        let matchingItem;
        this.cartItems.forEach((item) => {
            if (item.productId === productId) {
                matchingItem = item;
            }
        })
        matchingItem.deliveryOptionId = deliveryOption;
        this.saveToStorage(this.cartItems);
    };
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
console.log(cart);
console.log(businessCart);
console.log(cart instanceof Cart);
console.log(businessCart instanceof Cart);