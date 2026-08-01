const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { verifyToken, requireAdmin } = require("../middleware/auth");

// GET ALL EVENTS
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error("❌ GET /api/events Error:", err);

        res.status(500).json({
            error: err.message
        });
    }
});

// GET EVENT BY ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found." });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: "Invalid event tracking ID format." });
    }
});

// CREATE EVENT (Protected: Admins only can create infrastructure)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
    try {
        const { eventName, eventDate, rooms } = req.body;

        if (!eventName || !eventDate) {
            return res.status(400).json({ message: "Missing required core event metadata." });
        }

        const formattedRooms = Array.isArray(rooms) 
            ? rooms.map(room => ({
                roomNo: room.roomNo,
                capacity: parseInt(room.capacity, 10) || 0
              }))
            : [];

        const newEvent = new Event({
            eventName,
            eventDate,
            rooms: formattedRooms
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE EVENT (Protected: Admins only)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
    try {
        const target = await Event.findById(req.params.id);
        if (!target) return res.status(404).json({ message: "Event profile footprint not found." });

        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event cluster configuration wiped successfully." });
    } catch (err) {
        res.status(500).json({ error: "Internal processing deletion error." });
    }
});
 router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
module.exports = router;