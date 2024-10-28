const Customer = require("./Customer");

class Auth {
    constructor() {
        this.customers = [];
    }

    register(name, email, shippingAddress) {
        const registeredCustomer = new Customer(name, email, shippingAddress);
        this.customers.push(registeredCustomer);
    }

    login(email) {
        const customerEmails = this.customers.map((customer) => {
            return customer.email;
        })

        if(!customerEmails.includes(email)) {
            return null;
        }

        return this.customers.find((customer) => {
            return customer.email === email;
        })
    }
}

module.exports = Auth;