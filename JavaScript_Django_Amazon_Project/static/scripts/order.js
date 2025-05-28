import { formatCurrency } from "./utils/money.js";
import { getProduct, getProductsFromDB, products } from "../data/products.js";
import { formattedDate } from "./utils/formattedDate.js";
import { cart, addToCart, getCartFromDB } from "../data/cart.js";
console.log('cart in order.js is', cart);

let orderArray = [];
export const getOrdersFromDB = async () => {
    console.log('inside GET request');
    const response = await fetch('/order/', {
        headers : {
          'Content-Type' : 'application/json',
        },
        method : 'GET'
      })
      .then((response) => {
        return response.json()
      }).then((orderData) => {
        orderArray = orderData;
        console.log('orderArray is', orderArray);
        showOrders();
      });
      return response;
}

// Promise.all([
//     getCartFromDB()
//   ]).then(() => {
//     console.log("Product and Cart is fetched from the DB");
//     showOrders();
//     document.querySelector('.orders-grid').innerHTML = content;
//     // updateCartQuantity();
//   }).then(() => {
//         document.querySelectorAll('.js-buy-again-button').forEach((button) => {
//         button.addEventListener('click', () => {
//             const {productId} = button.dataset;
//             addToCart(productId, 1);
//             updateCartQuantity();
//         })
//     })
//   });

// Load products first, then cart, then orders in sequence
getProductsFromDB()
  .then(() => {
    console.log('Products loaded successfully:', products);
    return getCartFromDB();
  })
  .then(() => {
    console.log('Cart loaded successfully:', cart);
    return getOrdersFromDB();
  })
  .then(() => {
    console.log("All data fetched from the DB");
    document.querySelector('.orders-grid').innerHTML = content;
    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
            const {productId} = button.dataset;
            addToCart(productId, 1);
            updateCartQuantity();
        });
    });
  })
  .catch(error => {
    console.error("Error loading data:", error);
  });
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
            console.log('product is', product);
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

// const updateCartQuantity = () => {
//     let totalQuantity = 0;
//     cart.forEach((item) => (totalQuantity += item.quantity));
//     document.querySelector('.js-order-cart-quantity').innerHTML = `${totalQuantity}`;
// }

