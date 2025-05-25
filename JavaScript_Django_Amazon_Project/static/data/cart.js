// export let cart = JSON.parse(localStorage.getItem('cart'));

// if (!cart) {
//   cart = [
//     {
//       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//       quantity: 1,
//       deliveryOptionId : '1'
//     },
//     {
//       productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//       quantity: 1,
//       deliveryOptionId: '2'
//     },
//   ];
// }
export let cart = [];

export const updateDeliveryOption = (productId, deliveryOption) => {
  let matchingItem;
  cart.forEach((item) => {
    if(item.productId === productId) {
      matchingItem = item;
    }
  })
  matchingItem.deliveryOptionId = deliveryOption;
  updateCartInDB(cart);
}

export const getCartFromDB = async () => {
  console.log('executed');
  const response = fetch('/', {
    headers : {
      'Content-Type' : 'application/json',
      'X-Action' : 'get_cart',
    },
    method : 'GET'
  })
  .then((response) => {
    return response.json()
  }).then((cartData) => {
    cart = cartData;
    console.log('cart is', cart);
  });
  return response;  
}

export const addToCart = (productId, currentQuantity) => {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
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
  // saveToStorage(cart);
  updateCartInDB(cart);
};

export const updateCartInDB = async (cart) => {
  console.log('cart in updateCart', cart);
  const response = await fetch('/checkout/', {
    headers : {
      'Content-Type' : 'application/json',
      'X-Action' : 'update_cart',
    },
    method : 'POST',
    body : JSON.stringify(cart)
  })
  .then((response) => {
    return response.json()
  }).then((cartData) => {
    console.log('cart data is ', cart);
    cart = cartData;
  });
  return response;
}

export const calculateCartQuantity = () => {
  // Calculate total Quantity to show number of Items in cart on UI
  let totalQuantity = 0;
  cart.forEach((cartItem) => (totalQuantity += Number(cartItem.quantity)));
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
  updateCartInDB(cart);
}