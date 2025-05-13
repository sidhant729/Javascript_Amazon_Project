import { cart, removeFromCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const showItems = (items) => {
  let content = "";
  items.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    console.log(product);
    content += `
    <div class="cart-item-container js-cart-item-container-${item.productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(product.priceCents)}
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${item.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
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
    const element = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    element.remove();
    removeFromCart(productId);
    updateCheckoutCartQuantity();
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
      });
    })

});
