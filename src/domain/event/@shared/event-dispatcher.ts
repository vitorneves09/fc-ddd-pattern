import EventDispatcehrInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handle.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcehrInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    register(eventName: string, eventHandle: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(eventHandle);
    }

    unregister(eventName: string, eventHandle: EventHandlerInterface): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandle);

            if (index !== 1) {
                this.eventHandlers[eventName].splice(index, 1);
            }

        }
    }

    notify(event: EventInterface): void {
        throw new Error("Method not implemented.");
    }


    unregisterAll(): void {
        this.eventHandlers = {};
    }



}