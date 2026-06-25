const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET ALL EVENTS
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET EVENT BY ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.json(event);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE EVENT (Fixed and Cleaned up!)
router.post("/", async (req, res) => {
    try {
        const { eventName, eventDate, rooms } = req.body;

        // Ensure the rooms array exists and safely force room capacities to Integers
        const formattedRooms = Array.isArray(rooms) 
            ? rooms.map(room => ({
                roomNo: room.roomNo,
                capacity: parseInt(room.capacity, 10) || 0 // 👈 Forces integers so frontend gets real numbers!
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
        res.status(500).json({ error: err.message || err });
    }
});

// DELETE EVENT
router.delete("/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({
            message: "Event deleted"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;