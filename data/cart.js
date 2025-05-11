export const cart = []

export const addToCart = (productId, currentQuantity) => {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += currentQuantity;
  } else {
    cart.push({
      productId,
      quantity: currentQuantity,
    });
  }
  console.log(cart);
};

export const updateCartQuantity = () => {
  // Calculate total Quantity to show number of Items in cart on UI
  let totalQuantity = 0;
  cart.forEach((cartItem) => (totalQuantity += cartItem.quantity));
  document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
};