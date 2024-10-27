import EventHandlerInterface from "../../../@shared/event/event-handle.interface";
import EventInterface from "../../../@shared/event/event.interface";
import CustomerChangedAdressEvent from "../customer-changed-adress.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLogWhenAdressIsChanged
    implements EventHandlerInterface<CustomerChangedAdressEvent> {

    handle(event: EventInterface): void {

        const customer = event.eventData;
        const address = customer.Address;

        console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${address.street}`);
    }
}