class Customer {
    constructor(name, email, shippingAddress) {
        this.name = name;
        this.email = email;
        this.shippingAddress = shippingAddress;
        this.orderHistory = [];
        this.rewardPoints = 0;
    }

    addToOrderHistory(cart) {
        this.orderHistory.push(cart);
    }

    getRewardPoints() {
        const totalRewards = this.orderHistory.reduce((total, cart) => {
            total += cart.products.reduce((rewards, product) => {
                rewards += product.rewardPoints;
                return rewards;
            }, 0)
            return total;
        }, 0)
        return totalRewards;
    }
}

module.exports = Customer;