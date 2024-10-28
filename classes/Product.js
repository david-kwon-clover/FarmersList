class Product {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.inStock = true;
    }

    display() {
        return `Name: ${this.name},\nPrice:${this.price},\nDescription: ${this.description}`;
    }
}

module.exports = {
    Product
}