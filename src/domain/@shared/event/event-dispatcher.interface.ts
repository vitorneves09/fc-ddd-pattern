import EventHandlerInterface from "./event-handle.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcehrInterface {
    notify(event: EventInterface): void;
    register(eventName: string, eventHandle: EventHandlerInterface): void;
    unregister(eventName: string, eventHandle: EventHandlerInterface): void;
    unregisterAll(): void;
}