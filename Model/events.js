class Events {
    constructor({ event_id, event_name, start_date, end_date, location, apply_by, status}) {
        this.event_id = event_id;
        this.event_name = event_name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.location = location;
        this.apply_by = apply_by;
        this.status = status;
    }
    
    getInfo() {
        return `Event Info:
    - event_id: ${this.event_id}
    - event_name: ${this.event_name}
    - start_date: ${this.start_date.toISOString()}
    - end_date: ${this.end_date.toISOString()}}
    - location: ${this.location}
    - apply_by: ${this.apply_by}
    - status: ${this.status}`;
    }

    // Return only public data (e.g. to send to client)
    toJSON() {
        return {
        event_id: this.event_id,
        event_name: this.event_name,
        start_date: this.start_date,
        end_date: this.end_date,
        location: this.location,
        apply_by: this.apply_by,
        status: this.status,
        };
    }
}

module.exports = Events;