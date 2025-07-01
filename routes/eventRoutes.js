const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/token");
const { createEvent,getEvents, updateEvent, deleteEvent } = require("../controllers/eventController");
const checkRole = require("../middleware/checkRole");

router.post("/event", validateToken, checkRole("admin"), createEvent);
router.get("/event", validateToken, getEvents);
router.put("/event/:id", validateToken, checkRole("admin"), updateEvent);
router.delete("/event/:id", validateToken, checkRole("admin"), deleteEvent);


module.exports = router;
