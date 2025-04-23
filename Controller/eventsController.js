// 📁 controllers/EventsController.js
const moment = require("moment-timezone");
const { sendResponse } = require("../Helpher/responseHelpher");
const Events = require("../Model/events");
const {
    selectFromTable,
    updateTable,
    deleteFromTable,
    insertIntoTable,
} = require("../Helpher/databaseHelpher");

class EventsController {
    // 📌 Get all events (start_date & end_date version)
    static async getAllEvents(req, res) {
        try {
            const data = await selectFromTable("events");
            const events = data.map(row => new Events(row).toJSON());
            sendResponse(res, 200, "Fetched all events", events);
        } catch (error) {
            sendResponse(res, 500, error.message);
        }
    }

    // 📌 Get event by ID
    static async getEventById(req, res) {
        const { id } = req.params;
        try {
            const data = await selectFromTable("events", { event_id: id });
            if (!data.length) return sendResponse(res, 404, false, "Event not found");
            const event = new Events(data[0]).toJSON();
            sendResponse(res, 200,  "Event fetched", new Events(event).toJSON());
        } catch (err) {
            sendResponse(res, 500, err.message);
        }
    }

    // 📌 Create new event
    static async createEvent(req, res) {
        const { event_name, start_date, end_date, location, apply_by, status } = req.body;
        const eventData = {
            event_name,
            start_date: moment(start_date, "D/M/YYYY").format("YYYY-MM-DD"),
            end_date: moment(end_date, "D/M/YYYY").format("YYYY-MM-DD"),
            location,
            apply_by,
            status,
        };
        try {
            const result = await insertIntoTable("events", eventData);
            sendResponse(res, 201, "Event created successfully", new Events(result).toJSON());
        } catch (err) {
            sendResponse(res, 500, err.message);
        }
    }

    // 📌 Update event
    static async updateEvent(req, res) {
        try {
            const { id } = req.params;
            const { event_name, start_date, end_date, location, apply_by, status } = req.body;
            const dataToUpdate = {
                event_name,
                start_date: moment(start_date, "D/M/YYYY").format("YYYY-MM-DD"),
                end_date: moment(end_date, "D/M/YYYY").format("YYYY-MM-DD"),
                location,
                apply_by,
                status,
            };
            const rowCount = await updateTable("events", dataToUpdate, { event_id: id });
            if (!rowCount) return sendResponse(res, 404, false, "Event not found or not updated");
            sendResponse(res, 200, true, "Event updated successfully", new Events(rowCount).toJSON());
        } catch (err) {
            sendResponse(res, 500, false, err.message);
        }
    }

    // 📌 Delete event
    static async deleteEvent(req, res) {
        const { id } = req.params;
        try {
            const rowCount = await deleteFromTable("events", { event_id: id });
            if (!rowCount) return sendResponse(res, 404, false, "Event not found");
            sendResponse(res, 200, true, "Event deleted successfully");
        } catch (err) {
            sendResponse(res, 500, false, err.message);
        }
    }
}

module.exports = EventsController;
