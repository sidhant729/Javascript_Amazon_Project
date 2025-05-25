import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { getProductsFromDB } from "../data/products.js";
import { getCartFromDB } from "../data/cart.js";

Promise.all([
    getProductsFromDB(),
    new Promise((resolve) => {
        getCartFromDB().then(() => {
            resolve();
        })
    })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})

