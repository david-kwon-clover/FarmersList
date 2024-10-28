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

    getTotal() {
        return this.total;
    }

    clear() {
        this.cart = [];
        this.total = 0;
    }

    removeItemByName(productName) {
        const targetIndex = this.products.find((product) => {
            return product.name === productName;
        })

        this.products.splice(targetIndex, 1);
    }
}

module.exports = Cart;