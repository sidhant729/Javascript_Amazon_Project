import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
let orderArray = JSON.parse(localStorage.getItem('orders')) || [];
console.log(orderArray);


export const addOrder = (order) => {
    orderArray.unshift(order);
    addToLocalStorage(orderArray);
}

const addToLocalStorage = (orderArray) => {
    localStorage.setItem('orders', JSON.stringify(orderArray));
}

export const showOrders = () => {
    let content = ``;
    orderArray.forEach((order) => {
        const orderId = order.id;
        const orderDate = order.orderTime;
        const totalPriceCents = order.totalCostCents;
        const orderProducts = order.products;
        
        let orderDetailsContent = '';
        
        orderProducts.forEach((product) => {
            const matchingProduct = getProduct(product.productId);
            if (!matchingProduct) {
                console.error(`Product not found: ${product.productId}`);
                return; // Skip this product
            }
            
            orderDetailsContent += `
            <div class="product-image-container">
                <img src="/static/${matchingProduct.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${product.deliveryTime}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary">
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
    document.querySelector('.orders-grid').innerHTML = content;
}

loadProductsFetch().then(() => {
  showOrders();
});