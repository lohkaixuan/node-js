const express = require("express");
const EventController = require("../Controller/eventController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// 🎯 Prefixing '/event' for all routes
router.get("/get", authenticate, EventController.getAllEvents);         // GET /event
router.get("/get:id", authenticate, EventController.getEventById);      // GET /event/:id
router.post("/create", authenticate, EventController.createEvent);   // POST /event/create
router.put("/update/:id", authenticate, EventController.updateEvent);       // PUT /event/:id
router.delete("/delete/:id", authenticate, EventController.deleteEvent);    // DELETE /event/:id

module.exports = router;
