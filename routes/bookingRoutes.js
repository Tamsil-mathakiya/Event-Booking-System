const express = require("express");
const { createBooking, exportBookingsCSV } = require("../controllers/booking");
const { validateToken } = require("../middleware/token");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.post("/booking", validateToken, checkRole("user"), createBooking);
router.get("/bookings/export", validateToken, checkRole("admin"), exportBookingsCSV);

module.exports = router;
