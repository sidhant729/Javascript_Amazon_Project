import {cart} from "../data/cart.js";
export const updateCartQuantity = () => {
  let totalQuantity = 0;
  cart.forEach((cartItem) => (totalQuantity += cartItem.quantity));
  document.querySelector(".js-cart-quantity").innerHTML = `${totalQuantity}`;
  return totalQuantity;
};
