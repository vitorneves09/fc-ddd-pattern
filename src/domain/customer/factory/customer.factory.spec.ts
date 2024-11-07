import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("product factory unt test", () => {

    it("Should create a customer Vitor", () => {
        const customer = CustomerFactory.create("Vitor");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Vitor");
        expect(customer.Address).toBeUndefined();
    })

    it("Should create a customer with address", () => {
        const address = new Address("street 1", 1, 'zip 1', 'city 1');
        const customer = CustomerFactory.createWithAddress("Vitor", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Vitor");
        expect(customer.Address).toBe(address);


    });

});