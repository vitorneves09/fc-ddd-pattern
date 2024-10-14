import Address from "../ValueObject/address";
import Customer from "./customer";
import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit test", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order('', '123',[]);
        }).toThrow("Id is required");
    })

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order('1', '', []);
        }).toThrow("CustomerId is required");
    })

    it("should throw error when item is empty", () => {
        expect(() => {
            let order = new Order('1', '123', []);
        }).toThrow("Item qtd must be greater than 0");
    })

    it("should calculate total",()=> {
    
        const item1 = new OrderItem("1", "item 1", 50,'p1',2);
        const item2 = new OrderItem("2", "item 2", 50,'p2',2);


        const order = new Order("1", "123", [item1, item2])
        
        let total = order.total();

        expect(total).toBe(200);

        const item3 = new OrderItem("2", "item 3", 100,'p1',1);

        const order2 = new Order("1", "123", [item1, item2,item3])
        total = order2.total();

        expect(total).toBe(300);
    })



    it("should throw error if the qtd is greater than 0", () => {
        expect(() => {
            const item1 = new OrderItem("1", "item 1", 50, 'p1', 0);
            const order = new Order("1", "123", [item1]);

        }).toThrow("Quantity must be greater than 0");
    })
});