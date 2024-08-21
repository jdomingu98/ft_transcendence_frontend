class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    next(value) {
        this.subscribers.forEach(callback => callback(value));
    }
}

export default Observable;