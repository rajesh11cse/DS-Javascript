/* 
    Take N% off each individual item in the cart
    Take P% off the next item in the cart
    Take $D off your Nth item of type T

    Cart
    1. Coupon: Take 10% off your next item
    2. $10 postcard sorter
    Take N% off each individual item in the cart
    Take P% off the next item in the cart
    Take $D off your Nth item of type T

    Cart #1
    1. Coupon: Take 10% off your next item
    2. $10 postcard sorter
    3. $20 stationery organizer
    Total = $29

    Cart #2
    1. $10 postcard sorter
    2. Coupon: Take 10% off your next item
    3. $20 stationery organizer
    Total = $28

    Cart #3
    1. $10 postcard sorter
    2. Coupon: Take $2 off your 2nd postcard sorter
    3. Coupon: 25% off each individual item
    4. Coupon: Take 10% off the next item in the cart
    5. $10 postcard sorter
    Total = ($10 * 75%) + (($10 - $2) * 75% * 90%) = $7.50 + $5.40 = $12.90
 */


    

// Solution

// Define the items and their prices
const items = [
    { name: "postcard sorter", price: 10 },
    { name: "stationery organizer", price: 20 }
];

// Define the carts with their respective coupons
const carts = [
    { 
    items: [items[0], items[1]], 
    coupons: [{ type: 'percentage', value: 10, index:0 }]
    },
    { 
    items: [items[0], items[1]], 
    coupons: [{ type: 'percentage', value: 10, index:1 }]
    },
    { 
    items: [items[0], items[0]], 
    coupons: [
        { type: 'fixed', value: 2, index: 1 },
        { type: 'percentageEach', value: 25 },
        { type: 'percentage', value: 10, index:1 }
    ]
    }
];

// Function to apply the coupon
function applyCoupon(cart) {
    let total = 0;
    cart.items.forEach((item, index) => {
    let finalPrice = item.price;
    
    cart.coupons.forEach(coupon => {
        if (coupon.type === 'percentage' && index === coupon.index) {
        finalPrice *= (1 - coupon.value / 100);
        } else if (coupon.type === 'fixed' && index === coupon.index) {
        finalPrice -= coupon.value;
        } else if (coupon.type === 'percentageEach') {
        finalPrice *= (1 - coupon.value / 100);
        }
    });
    total += finalPrice;
    });
    return total.toFixed(2);
}

// Calculate the total for each cart
carts.forEach((cart, index) => {
    const total = applyCoupon(cart);
    console.log(`Cart #${index + 1} Total = $${total}`);
});

  
// Output:
// Cart #1 Total = $29.00
// Cart #2 Total = $28.00
// Cart #3 Total = $12.90

