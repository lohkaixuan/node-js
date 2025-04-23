class Event {
    constructor({ event_id, event_name, date, location, time, apply_by, status}) {
        this.event_id = event_id;
        this.event_name = event_name;
        this.date = date;
        this.location = location;
        this.time = time;
        this.apply_by = apply_by;
        this.status = status;
    }
    
    getInfo() {
        return `Event Info:
    - event_id: ${this.event_id}
    - event_name: ${this.event_name}
    - date: ${this.date.toISOString()}
    - location: ${this.location}
    - apply_by: ${this.apply_by}
    - Joined: ${this.time}
    - status: ${this.status}`;
    }

    // Return only public data (e.g. to send to client)
    toJSON() {
        return {
        event_id: this.event_id,
        event_name: this.event_name,
        date: this.date,
        location: this.location,
        time: this.time,
        apply_by: this.apply_by,
        status: this.status,
        };
    }
}

module.exports = Event;