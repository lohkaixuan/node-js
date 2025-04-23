const moment = require("moment-timezone");
const { sendResponse } = require("../Helpher/responseHelpher");
const Event = require("../Model/event");

const {
  selectFromTable,
  updateTable,
  deleteFromTable,
  insertIntoTable,
} = require("../Helpher/databaseHelpher");

class EventController {
  // 📌 Get all events
  static async getAllEvents(req, res) {
    try {
      const data = await selectFromTable("event");
      const event = data.map(row => new Event(row).toJSON());
      sendResponse(res, 200, "Fetched all events", event);
    } catch (error) {
      sendResponse(res, 500, error.message);
    }
  }

  // 📌 Get event by ID
  static async getEventById(req, res) {
    const { id } = req.params;
    try {
      const [event] = await selectFromTable("event", { event_id: id });
      if (!event) return sendResponse(res, 404, "Event not found");
      sendResponse(res, 200, "Event fetched", new Event(event).toJSON());
    } catch (error) {
      sendResponse(res, 500, error.message);
    }
  }

  // 📌 Create new event
  static async createEvent(req, res) {
    const { event_name, date, location, time, apply_by, status } = req.body;
    const eventData = {
      event_name,
      date: moment(date, "D/M/YYYY").format("YYYY-MM-DD"),
      location,
      time,
      apply_by,
      status,
    };
    // console.log(date);
    // console.log(moment(date).toISOString());
    // console.log(moment(date, "D/M/YYYY").format("YYYY-MM-DD"));

    try {
      const result = await insertIntoTable("event", eventData);
      sendResponse(res, 201, "Event created successfully", new Event(result).toJSON());
    } catch (error) {
      sendResponse(res, 500, error.message);
    }
  }

  // 📌 Update event
  static async updateEvent(req, res) {
    const { id } = req.params;
    const { event_name, date, location, time, apply_by, status } = req.body;
    const dataToUpdate = {
      event_name,
      date: moment(date, "D/M/YYYY").format("YYYY-MM-DD"),
      location,
      time,
      apply_by,
      status,
    };
    try {
      const rowCount = await updateTable("event", dataToUpdate, { event_id: id });
      if (!rowCoun) return sendResponse(res, 404, "Event not found or no change");
      sendResponse(res, 200, "Event updated successfully", new Event(rowCount).toJSON());
    } catch (error) {
      sendResponse(res, 500, error.message);
    }
  }

  // 📌 Delete event
  static async deleteEvent(req, res) {
    const { id } = req.params;
    try {
      const rowCount = await deleteFromTable("event", { event_id: id });
      if (!rowCount) return sendResponse(res, 404, "Event not found");
      sendResponse(res, 200, "Event deleted successfully");
    } catch (error) {
      sendResponse(res, 500, error.message);
    }
  }
}

module.exports = EventController;
