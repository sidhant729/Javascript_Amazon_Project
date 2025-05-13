import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
const showProducts = (product) => {
  let content = "";
  product.forEach((element) => {
    content += `   
        <div class="product-container"> 
        <div class="product-image-container">
            <img class="product-image"
            src="${element.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${element.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
            src="/images/ratings/rating-${element.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${element.rating.count}
            </div>
        </div>

        <div class="product-price">
            $${formatCurrency(element.priceCents)}
        </div>

        <div class="product-quantity-container">
            <select class="js-quantity-selector-${element.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${element.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${element.id}">
            Add to Cart
        </button>
        </div>
        </div>`;
  });
  document.querySelector(".js-products-grid").innerHTML = content;
};
showProducts(products);

let currentTimeout = null;
const showCartAdded = (productId) => {
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }

  const currentElement = document.querySelector(`.js-added-to-cart-${productId}`);
  currentElement.style.opacity = "1";

  currentTimeout = setTimeout(() => {
    currentElement.style.opacity = "0";
  }, 2000);
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const currentQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    showCartAdded(productId);
    addToCart(productId, currentQuantity);
    updateCartQuantity();
  });
});

export const updateCartQuantity = () => {
  const currentQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-update-cart-quantity"
  ).innerHTML = `${currentQuantity}`;
};

updateCartQuantity();