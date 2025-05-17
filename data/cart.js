export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId : '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    },
  ];
}

const saveToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
      deliveryOptionId: '1'
    });
  }
  saveToStorage(cart);
};

export const calculateCartQuantity = () => {
  // Calculate total Quantity to show number of Items in cart on UI
  let totalQuantity = 0;
  cart.forEach((cartItem) => (totalQuantity += cartItem.quantity));
  return totalQuantity;
};

export const removeFromCart = (productId) => {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToStorage(cart);
}