const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
  
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { name, date, capacity } = req.body;

    if (!name || !date || !capacity) {
      return res
        .status(400)
        .json({ message: "name, date, and capacity are required" });
    }

    const eventDate = new Date(date);
    if (isNaN(eventDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const event = await Event.create({
      name,
      date: eventDate,
      capacity,
      availableSeats: capacity,    
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const { start, end, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (start && end) {
      filter.date = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const events = await Event.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, capacity } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (date) updateData.date = new Date(date);
    if (capacity) {
      updateData.capacity = capacity;
      updateData.availableSeats = capacity;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};