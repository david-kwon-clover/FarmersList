const { Product, Cart, Customer, Auth } = require('./index.js');
const { describe, test, expect } = require("@jest/globals");

describe("Product Tests", () => {
    test('Can create instance of product class', () => {
        const carrots = new Product("Carrots", 4, "Bushel of carrots that have been freshly harvested for you");
        expect(carrots instanceof Product).toEqual(true);
    });

    test('Correctly sets values of name, price, description, quantity, inStock, and rewardPoints', () => {
        const carrots = new Product("Carrots", 4, "Bushel of carrots that have been freshly harvested for you", 7);
        expect(carrots.name).toEqual("Carrots");
        expect(carrots.price).toEqual(4);
        expect(carrots.description).toEqual("Bushel of carrots that have been freshly harvested for you");
        expect(carrots.quantity).toBe(7);
        expect(carrots.inStock).toEqual(true);
        expect(carrots.rewardPoints).toBe(3);
    });

    test('display method returns correct string', () => {
        const carrots = new Product("Carrots", 4, "Bushel of carrots that have been freshly harvested for you");
        expect(carrots.display()).toEqual("Name: Carrots, Price: $4, Description: Bushel of carrots that have been freshly harvested for you");
    });
})

describe("Cart Tests", () => {

    test('Instance of Cart initializes with empty products array and total of 0', () => {
        const myCart = new Cart();
        expect(Array.isArray(myCart.products)).toEqual(true);
        expect(myCart.products.length).toEqual(0);
        expect(myCart.total).toEqual(0);
    });

    test('Can add products to array with addProduct', () => {
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 7);
        const myCart = new Cart();
        myCart.addProduct(carrots, 2);
        expect(myCart.products.length).toEqual(1);
        expect(myCart.total).toEqual(carrots.price * 2);
    });
    
    test('Can increase the total with addProduct', () => {
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 7);
        const myCart = new Cart();
        myCart.addProduct(carrots, 2);
        expect(myCart.total).toBe(4);
    })
    
    test('addProduct should decrease product quantity', () => {
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 7);
        const myCart = new Cart();
        myCart.addProduct(carrots, 2);
        expect(carrots.quantity).toBe(5);
    })
    
    test('addProduct should update product inStock property if depleted', () => {
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 7);
        const myCart = new Cart();
        myCart.addProduct(carrots, 7);
        expect(carrots.inStock).toBe(false);
    })
    
    test('addProduct should handle error if quantity is too large', () => {
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 7);
        const myCart = new Cart();
        expect(() => {
            myCart.addProduct(carrots, 10);
        }).toThrow("I'm sorry there are only 7 of this product left");
    })

    test('Can remove products to array with removeProduct and total is updated', () => {
        const strawberries = new Product("Strawberries", 5, "The freshest fresas on the market", 5);
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack" , 3);
        const mangos = new Product("Mangos", 3, "The tastiest fruit you can buy" , 2);
        const myCart = new Cart();
        myCart.addProduct(carrots, 1);
        myCart.addProduct(mangos, 1);
        myCart.addProduct(strawberries, 1);
        myCart.removeProduct(0);
        expect(myCart.products.length).toEqual(2);
        expect(myCart.total).toEqual(8);
    });
    
    test('Can get the total of all products from getTotal', () => {
        const strawberries = new Product("Strawberries", 5, "The freshest fresas on the market", 1);
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack", 1);
        const mangos = new Product("Mangos", 3, "The tastiest fruit you can buy", 1);
        const myCart = new Cart();
        myCart.addProduct(carrots, 1);
        myCart.addProduct(mangos, 1);
        myCart.addProduct(strawberries, 1);
        expect(myCart.getTotal()).toBe(10);
    })
    
    test('Using clear method clears all products and sets total to 0', () => {
        const strawberries = new Product("Strawberries", 5, "The freshest fresas on the market");
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack");
        const mangos = new Product("Mangos", 3, "The tastiest fruit you can buy");
        const myCart = new Cart();
        myCart.addProduct(carrots);
        myCart.addProduct(mangos);
        myCart.addProduct(strawberries);
        myCart.clear();
        expect(myCart.products).toHaveLength(0);
        expect(myCart.total).toBe(0);
    })
    
    test('removeItemByName removes a specified item from the cart', () => {
        const strawberries = new Product("Strawberries", 5, "The freshest fresas on the market");
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack");
        const mangos = new Product("Mangos", 3, "The tastiest fruit you can buy");
        const myCart = new Cart();
        myCart.addProduct(carrots);
        myCart.addProduct(mangos);
        myCart.addProduct(strawberries);
        myCart.removeItemByName("Carrots");
        expect(myCart.products).toHaveLength(2);
    })
})

describe("Customer Tests", () => {
    test('Can create Customer instance', () => {
        const francis = new Customer("Francis", "francis@gmail.com", "222 Main St");
    
        expect(francis instanceof Customer).toEqual(true);
    });

    test('Customer instance correctly sets property values', () => {
        const francis = new Customer("Francis", "francis@gmail.com", "222 Main St");
        expect(francis.name).toEqual("Francis");
        expect(francis.email).toEqual("francis@gmail.com");
        expect(francis.shippingAddress).toEqual("222 Main St");
        expect(Array.isArray(francis.orderHistory)).toEqual(true);
        expect(francis.orderHistory.length).toEqual(0);
        expect(francis.rewardPoints).toBe(0);
    });

    test('addToOrderHistory Cart to orderHistory array', () => {
        const francis = new Customer("Francis", "francis@gmail.com", "222 Main St");
        const strawberries = new Product("Strawberries", 5, "The freshest fresas on the market");
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack");
        const mangos = new Product("Mangos", 3, "The tastiest fruit you can buy");
        
        const myFirstOrder = new Cart();
        myFirstOrder.addProduct(mangos);
        myFirstOrder.addProduct(carrots);
        const mySecondOrder = new Cart();
        mySecondOrder.addProduct(strawberries);
        francis.addToOrderHistory(myFirstOrder);
        
        expect(francis.orderHistory.length).toEqual(1);
        francis.addToOrderHistory(mySecondOrder);
        expect(francis.orderHistory.length).toEqual(2);
    });
    
    test('getRewardPoints correctly calculates customers total reward points', () => {
        const francis = new Customer("Francis", "francis@gmail.com", "222 Main St");
        const strawberries = new Product("Strawberries", 5, "The freshest fresas on the market");
        const carrots = new Product("Carrots", 2, "Perfect for an afternoon snack");
        const mangos = new Product("Mangos", 3, "The tastiest fruit you can buy");
        
        const myFirstOrder = new Cart();
        myFirstOrder.addProduct(mangos);
        myFirstOrder.addProduct(carrots);
        myFirstOrder.addProduct(strawberries);
        francis.addToOrderHistory(myFirstOrder);

        expect(francis.getRewardPoints()).toBe(9);
        
    })
})

describe("Auth Tests", () => {
    test('Can create instance of Auth', () => {
        const myAuth = new Auth();
        expect(myAuth instanceof Auth).toEqual(true);
    });

    test('Auth has empty customers array when initialized', () => {
        const myAuth = new Auth();
        expect(Array.isArray(myAuth.customers)).toEqual(true);
        expect(myAuth.customers.length).toEqual(0);
    });

    test('register creates new Customer and adds it to customers array', () => {
        const myAuth = new Auth();
        myAuth.register("Kaiya", "Kaiya@example.com", '121 Main St');
        expect(myAuth.customers[0] instanceof Customer).toEqual(true);
    });

    test('login finds correct Customer in customers array', () => {
        const myAuth = new Auth();
        myAuth.register("Kaiya", "Kaiya@example.com", '121 Main St');
        myAuth.register("Nina", "Nina@example.com", '22 Broadway St');
        const result = myAuth.login("Kaiya@example.com")
        expect(result.name).toEqual("Kaiya");
    });

    test('login returns null if Customer is not in the customers array', () => {
        const myAuth = new Auth();
        myAuth.register("Kaiya", "Kaiya@example.com", '121 Main St');
        myAuth.register("Nina", "Nina@example.com", '22 Broadway St');
        const result = myAuth.login("benny@example.com")
        expect(result).toEqual(null);
    });
})