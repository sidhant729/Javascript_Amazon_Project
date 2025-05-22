export const getDeliveryOption = (deliveryOptionId) => {
    let matchingDelivery;
    deliveryOptions.forEach((deliveryOption) => {
        if(deliveryOption.id === deliveryOptionId) {
            matchingDelivery = deliveryOption;
        }
    })
    return matchingDelivery || deliveryOptions[0];
}
export const deliveryOptions = [
    {
        id : '1',
        deliveryTime: 7,
        priceCents: 0,
    },
    {
        id: '2',
        deliveryTime: 3,
        priceCents: 499,
    },
    {
        id:'3',
        deliveryTime: 1,
        priceCents: 999
    }
]