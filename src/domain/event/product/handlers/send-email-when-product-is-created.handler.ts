import EventHandlerInterface from "../../@shared/event-handle.interface";
import EventInterface from "../../@shared/event.interface";
import ProductCreatedEvent from "../product-created.event";

export default
    class SendEmailWhenProductIsCreatedHandler
    implements EventHandlerInterface<ProductCreatedEvent> {

    handle(event: EventInterface): void {
        console.log("Sending email to ..............");
    }

}