import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formattedDate } from "./utils/formattedDate.js";
import { cart, addToCart } from "../data/cart.js";
let orderArray = JSON.parse(localStorage.getItem('orders')) || [];

export const addOrder = (order) => {
    console.log('my order is', order);
    orderArray.unshift(order);
    addToLocalStorage(orderArray);
}

const addToLocalStorage = (orderArray) => {
    localStorage.setItem('orders', JSON.stringify(orderArray));
}
let content = ``;
export const showOrders = () => {
    orderArray.forEach((order) => {
        const orderId = order.id;
        const orderDate = formattedDate(order.orderTime);
        const totalPriceCents = order.totalCostCents;
        const orderProducts = order.products;
        
        let orderDetailsContent = '';
        
        orderProducts.forEach((product) => {
            const matchingProduct = getProduct(product.productId);
            if (!matchingProduct) {
                console.error(`Product not found: ${product.productId}`);
                return; // Skip this product
            }
            const deliveryDate = formattedDate(product.estimatedDeliveryTime);
            orderDetailsContent += `
            <div class="product-image-container">
                <img src="/static/${matchingProduct.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${deliveryDate}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
                    <img class="buy-again-icon" src="/static/images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>`;
        });
        
        content += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDate}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(totalPriceCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderId}</div>
                </div>
            </div>
            <div class="order-details-grid">
                ${orderDetailsContent}
            </div>
        </div>`;
    });
}

loadProductsFetch().then(() => {
  showOrders();
  document.querySelector('.orders-grid').innerHTML = content;
  updateCartQuantity();
}).then(() => {
    
    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
            const {productId} = button.dataset;
            addToCart(productId, 1);
            updateCartQuantity();
        })
    })
});
const updateCartQuantity = () => {
    let totalQuantity = 0;
    cart.forEach((item) => (totalQuantity += item.quantity));
    document.querySelector('.js-order-cart-quantity').innerHTML = `${totalQuantity}`;
}

