import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
export const deliveryDate = (deliveryTime) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryTime, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D' );
    return dateString;
}