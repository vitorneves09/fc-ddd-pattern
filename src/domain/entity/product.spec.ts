import Address from "../ValueObject/address";
import Customer from "./customer";
import Order from "./order";
import OrderItem from "./orderItem";
import Product from "./product";

describe("Product unit test", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", 100, "Product 1 ");
        }).toThrow("Id is required");
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("1", 100, "");
        }).toThrow("Name is required");
    })

    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("1", -1, "Product 1");
        }).toThrow("Price must be greater than zero");
    })

    it("should change name", () => {
        const prodict = new Product("1", 100, "Product 1");
        prodict.changeName("Product 2");

        expect(prodict.name).toBe("Product 2");
    })


    it("should change price", () => {
        const prodict = new Product("1", 100, "Product 1");
        prodict.changePrice(200);

        expect(prodict.price).toBe(200);
    })
});