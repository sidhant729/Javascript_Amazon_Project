import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
export const formattedDate = (deliveryTime) => {
    return `${dayjs(deliveryTime).format('MMMM D')}`
}