import Customer from "../../entity/customer";
import Address from "../../ValueObject/address";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerChangedAdressEvent from "./customer-changed-adress.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handlers/envia-console-log1-handler";
import EnviaConsoleLog2Handler from "./handlers/envia-console-log2-handler";
import SendConsoleLogWhenAdressIsChanged from "./handlers/send-console-log-when-adress-is-changed";

describe("Customer event unit test", () => {

    it("Should print messages to console after customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandle1 = new EnviaConsoleLog1Handler();
        const eventHandle2 = new EnviaConsoleLog2Handler();
        const sypEventHandler1 = jest.spyOn(eventHandle1, 'handle');

        eventDispatcher.register("CustomerCreatedEvent", eventHandle1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandle2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(eventHandle1);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1])
            .toMatchObject(eventHandle2);

        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;

        const CustomerCreated = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(CustomerCreated);

        expect(sypEventHandler1).toHaveBeenCalled();
    });

    it("Should print messages to console after customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();

        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;  // Set initial address

        const eventHandler = new SendConsoleLogWhenAdressIsChanged();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register("CustomerChangedAdressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAdressEvent"][0])
            .toMatchObject(eventHandler);

        const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer.Address = address2;

        const customerChangedAddressEvent = new CustomerChangedAdressEvent(customer);
        eventDispatcher.notify(customerChangedAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});