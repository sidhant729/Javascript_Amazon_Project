import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export const renderPaymentSummary = () => {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalQuantity = 0;
    cart.forEach((item) => {
        const productId = item.productId;
        const deliveryOptionId = item.deliveryOptionId;
        const product = getProduct(productId);
        const matchingDelivery = getDeliveryOption(deliveryOptionId);
        totalQuantity += Number(item.quantity);
        productPriceCents += (Number(item.quantity) * Number(product.priceCents));
        shippingPriceCents += Number(matchingDelivery.priceCents);
    })
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHtml = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>`;
    
    // Update the payment summary HTML
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
    
    // Add event listener to the button AFTER it's been added to the DOM
    const placeOrderButton = document.querySelector('.js-place-order-button');
    if (placeOrderButton) {
      console.log('Inside');
      //data is {'cart': [{'id': 'f79baf68-548c-4058-a4b3-f792453bf495', 
      // 'productId': '83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 'quantity': 1, 
      // 'deliveryOptionId': '1'}, {'id': 'b7de9bd5-3c8b-465f-8291-133cd07b87c7', 
      // 'productId': '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
      //  'quantity': 1, 'deliveryOptionId': '1'}]}
        placeOrderButton.addEventListener('click', async () => {
            try {
                await fetch('/order/', {
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    method : 'POST',
                    body : JSON.stringify({cart, totalCents})
                }).then(response => response.json())
                .then((data) => {
                    console.log('data is ', data);
                })
                
                // Clear the cart
                clearCart();
                
                // Redirect to order page
                window.location.href = '/order/';
            } catch (error) {
                console.error('Error placing order:', error);
                alert('There was a problem placing your order. Please try again.');
            }
        });
    } else {
        console.error('Place order button not found in the DOM');
    }
};

// Function to clear the cart
function clearCart() {
    // Empty the cart array by removing all items
    while(cart.length > 0) {
        cart.pop();
    }
    
    // Save the empty cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    console.log('Cart has been cleared after order placement');
}

// Remove the DOMContentLoaded event listener that was causing the error