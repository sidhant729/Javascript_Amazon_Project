import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { orderArray, getOrdersFromDB } from "./order.js";
import {getProduct, getProductsFromDB } from "../data/products.js";
import {getCartFromDB } from "../data/cart.js";
const {orderId, productId} = document.querySelector('.main').dataset;
import { formattedDate, formattedDateISO } from "./utils/formattedDate.js";

getProductsFromDB()
  .then(() => {
    return getCartFromDB();
  })
  .then(() => {
    return getOrdersFromDB();
  })
  .then(() => {
    console.log("All data fetched from the DB");
    renderTrackingPage();
  })
  .catch(error => {
    console.error("Error loading data:", error);
  });

  const renderTrackingPage = () => {
    // Get the Order time, after that get the actual delivery date by adding deliveryOptionId
    const order = orderArray.find((order) => order.id == orderId);
    const orderTime = formattedDateISO(order.orderTime);
    const deliveryOptionId = order.products.find((product) => product.productId == productId).deliveryOptionId;
    const date = dayjs(orderTime).format('dddd, MMMM D');
    let deliveryDate;
    if(deliveryOptionId == '1') {
        deliveryDate = dayjs(date).add(7, 'days').format('dddd, MMMM D');
    } else if (deliveryOptionId == '2') {
        deliveryDate = dayjs(date).add(3, 'days').format('dddd, MMMM D');
    } else if (deliveryOptionId == '3') {
        deliveryDate = dayjs(date).add(1, 'days').format('dddd, MMMM D');
    }

    const productName = getProduct(productId).name;
    const productQuantity = order.products.find((product) => product.productId == productId).quantity;
    const productImage = getProduct(productId).image;

    let content = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="/order/">
          View all orders
        </a>

        <div class="delivery-date js-delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info js-product-info-name">
          ${productName}
        </div>

        <div class="product-info js-product-info-image">
          Quantity: ${productQuantity}
        </div>

        <img class="product-image js-product-image" src="/static/${productImage}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`
    document.querySelector('.main').innerHTML = content;
  }