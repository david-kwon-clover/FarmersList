class Cart {
    constructor() {
        this.products = [];
        this.total = 0;
    }

    addProduct(product, quantity) {
        if(product.quantity < quantity) {
            throw new Error(`I'm sorry there are only ${product.quantity} of this product left`);
        }
        this.products.push(product);
        this.total += product.price * quantity;
        product.quantity -= quantity;
        if(product.quantity === 0) {
            product.inStock = false;
        }
        return product;
    }

    removeProduct(index) {
        this.total -= this.products[index].price;
        this.products.splice(index, 1);
    } 

    getTotal() {
        return this.total;
    }

    clear() {
        this.products = [];
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