import Address from "../ValueObject/address";
import Customer from "./customer"

describe("Customer unit tests", () => {
    
    it ("Should throw error if Id is empty", () => {
        expect(() => new Customer("", "John")).toThrow("Id is required")
    })

    test('should throw error if name is empty', () => {
        expect(() => new Customer("1", "")).toThrow("Name is required");
    });

    it('should change name', () => {

        const customer = new Customer("1", "Isa");
        
        customer.changeName("Isa chata");
        
        expect(customer.name).toBe("Isa chata");
    });


    it("Should activate customer", () => {
        const customer = new Customer("123", "Vitor Neves");
        const address = new Address("Rua dois", 2, "123123-678", 'São Paulo');
        customer.Address = address;
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("Should deactivate customer", () => {
        const customer = new Customer("123", "Vitor Neves");
        customer.deActive();

        expect(customer.isActive()).toBe(false);
    });

    it("Should throw error when address is  undefined", () => {
        expect(() => {
            const customer = new Customer("123", "Vitor Neves");
            customer.activate();

        }).toThrow("Address is mandatory to activate a customer");
    })

    it("should ad reward points", () => {
        const customer = new Customer("1", "customer1");
        expect(customer.rewardPoints).toBe(0);


        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);


        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);


    });

})