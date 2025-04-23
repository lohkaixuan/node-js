const express = require("express");
const EventsController = require("../Controller/eventsController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();


// 🗓️ Events with start_date/end_date (another model)
router.get("/get", authenticate,EventsController.getAllEvents);
router.get("/get:id",authenticate, EventsController.getEventById);
router.post("/create",authenticate, EventsController.createEvent);
router.put("/update/:id", authenticate,EventsController.updateEvent);
router.delete("/delete/:id",authenticate,EventsController.deleteEvent);

module.exports = router;
