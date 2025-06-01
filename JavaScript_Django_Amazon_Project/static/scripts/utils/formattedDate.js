import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
export const formattedDate = (deliveryOptionId) => {
    let deliveryTime;
    if (deliveryOptionId == '1') {
        deliveryTime = 7;
    } else if (deliveryOptionId == '2') {
        deliveryTime = 3;
    } else if (deliveryOptionId == '3') {
        deliveryTime = 1;
    }
        const today = dayjs();
        const deliveryDate = today.add(deliveryTime, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D' );
        return dateString;
}

export const formattedDateISO = (deliveryTime) => {
    return `${dayjs(deliveryTime).format('MMMM D')}`
}