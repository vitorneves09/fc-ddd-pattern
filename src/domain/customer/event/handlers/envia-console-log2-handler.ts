import EventHandlerInterface from "../../../@shared/event/event-handle.interface";
import EventInterface from "../../../@shared/event/event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog2Handler
    implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: EventInterface): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}


