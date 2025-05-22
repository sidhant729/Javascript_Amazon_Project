import { cart, removeFromCart, calculateCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { deliveryDate } from "../utils/deliveryDate.js";
export const renderOrderSummary = () => {
  const showItems = (items) => {
    let content = "";
    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      const deliveryOptionId = item.deliveryOptionId;
      const matchingDelivery = getDeliveryOption(deliveryOptionId);
      const dateString = deliveryDate(matchingDelivery.deliveryTime);
      content += `
      <div class="cart-item-container js-cart-item-container-${item.productId}">
              <div class="delivery-date js-delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="/static/${product.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">
                    ${product.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-${item.productId}">${
                        item.quantity
                      }</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link js-update-link-${
                      item.productId
                    }" data-product-id="${item.productId}">
                      Update
                    </span>
                        <input class="quantity-input js-quantity-input-${item.productId}" type="number" />
                        <span class="save-quantity-link link-primary js-save-link-${item.productId}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                      item.productId
                    }>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHtml(item.productId, item)}
                  </div>
                  </div>
                </div>
              </div>
            </div>`;
    });
    document.querySelector(".order-summary").innerHTML = content;
  };
  showItems(cart);

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      updateCheckoutCartQuantity();
      renderOrderSummary();
      renderPaymentSummary();
      console.log(cart);
    });
  });

  const updateCheckoutCartQuantity = () => {
    const currentQuantity = calculateCartQuantity();
    console.log(calculateCartQuantity)
    document.querySelector(
      ".js-total-cart-quantity"
    ).innerHTML = `${currentQuantity}`;
  };

  updateCheckoutCartQuantity();

  document.querySelectorAll(".js-update-quantity-link").forEach((item) => {
    item.addEventListener('click', () => {
      const { productId } = item.dataset;
      document
        .querySelector(`.js-quantity-input-${productId}`)
        .classList.add("is-editing-quantity");
      
      document
        .querySelector(`.js-save-link-${productId}`)
        .classList.add("is-editing-quantity");
      // When user Clicks save, fetch the value from the input box and change the quantity of the product;
      document
        .querySelector(`.js-save-link-${productId}`)
        .addEventListener("click", () => {
          const fetchValue = Number(
            document.querySelector(`.js-quantity-input-${productId}`).value
          );
          console.log(fetchValue);

          cart.forEach((item) => {
            if (item.productId === productId) {
              item.quantity = fetchValue;
            }
          });

          // Save to Local Storage
          localStorage.setItem('cart', JSON.stringify(cart));

          document.querySelector(`.js-quantity-${productId}`).innerHTML = `${fetchValue}`;
          updateCheckoutCartQuantity();
          document
            .querySelector(`.js-save-link-${productId}`)
            .classList.remove("is-editing-quantity");
            document
              .querySelector(`.js-quantity-input-${productId}`)
              .classList.remove("is-editing-quantity");
          renderPaymentSummary();
        });
      })
  });

  function deliveryOptionsHtml(productId, cartItem) {
    let content = '';
    deliveryOptions.forEach(deliveryOption => {
      const dateString = deliveryDate(deliveryOption.deliveryTime);
      const priceString = deliveryOption.priceCents === 0 ? "Free" : `$${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      content += `<div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>`
      
    });
    return content;
  }

  document.querySelectorAll('.js-delivery-option').forEach((option) => {
    option.addEventListener('click', () => {
      const {productId, deliveryOptionId} = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      showItems(cart);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}
