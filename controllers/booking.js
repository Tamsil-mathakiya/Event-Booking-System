const Event = require("../models/Event");
const book = require("../models/book")
const { Parser } = require("json2csv");


const createBooking = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { eventId, seatsBooked } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats < seatsBooked) {
      return res.status(400).json({ message: "Not enough available seats" });
    } 

    const existingBooking = await book.findOne({ user: userId, event: eventId });
    if (existingBooking) {
      return res.status(400).json({ message: "User already booked this event" });
    }

    const booking = await book.create({  
      user: userId,
      event: eventId,
      seatsBooked,
    });

    event.availableSeats -= seatsBooked;
    await event.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const exportBookingsCSV = async (req, res) => {
  try {
    const bookings = await book.find()
      .populate("event", "name date")

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    const fields = [
      { label: "Booking ID", value: "_id" },
      { label: "Event Name", value: "event.name" },
      { label: "Event Date", value: "event.date" },
      { label: "Seats Booked", value: "seatsBooked" },
      { label: "Booking Date", value: "createdAt" },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(bookings);

    res.header("Content-Type", "text/csv");
    res.attachment("bookings.csv");
    return res.send(csv);
  } catch (error) {
    console.error("CSV export error:", error.message);
    res.status(500).json({ message: "Failed to export bookings" });
  }
};


module.exports = {
  createBooking,
  exportBookingsCSV,
};
