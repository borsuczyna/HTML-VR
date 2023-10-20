interface EventElement {
    name: string;
    attachedTo: any;
    callback: Function;
}

export default class EventManager {
    private static events: EventElement[] = [];

    static addEventHandler(name: string, attachedTo: any, callback: Function) {
        this.events.push({ name, attachedTo, callback });
    }

    static removeEventHandler(name: string, attachedTo: any) {
        this.events = this.events.filter(event => event.name != name && event.attachedTo != attachedTo);
    }

    static triggerEvent(name: string, attachedTo: any, ...args: any[]) {
        this.events.forEach(event => {
            if(event.name == name && event.attachedTo == attachedTo) {
                event.callback(...args);
            }
        });
    }
}