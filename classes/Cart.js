class Cart {
    constructor() {
        this.products = [];
        this.total = 0;
    }

    addProduct(product) {
        this.products.push(product);
        this.total += product.price;
    }

    removeProduct(index) {
        this.total -= this.products[index].price;
        this.products.splice(index, 1);
    } 
}

module.exports = Cart;