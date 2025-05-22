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

          <button class="place-order-button button-primary">
            Place your order
          </button>`
    
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}