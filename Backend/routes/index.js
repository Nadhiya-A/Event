var express = require('express');
const mongoose = require('mongoose'); 
const Registration = require('../models/Registration');
const Event = require('../models/Event'); 
var router = express.Router();

/* GET Base Endpoint testing */
router.get('/', function(req, res, next) {
  res.json({ message: 'Express Server API Active' });
});

// 1. CREATE REGISTRATION WITH ACCURATE DYNAMIC CAPACITY CHECK
router.post('/registrations', async (req, res) => {
  const { userName, eventName, eventDate, roomNo, ticketCount, contact, paymentStatus } = req.body;

  try {
    const targetEvent = await Event.findOne({ eventName });
    if (!targetEvent) {
      return res.status(404).json({ success: false, message: "Target event template not found" });
    }

    const targetRoom = targetEvent.rooms.find(r => r.roomNo === roomNo);
    if (!targetRoom) {
      return res.status(404).json({ success: false, message: `Room '${roomNo}' is not assigned to this event` });
    }

    const totalMaxCapacity = Number(targetRoom.capacity || 0);

    const bookedSeatsAggregation = await Registration.aggregate([
      { $match: { eventName, roomNo } },
      { $group: { _id: null, totalSeats: { $sum: "$ticketCount" } } }
    ]);

    const currentBookedSeats = bookedSeatsAggregation.length > 0 ? bookedSeatsAggregation[0].totalSeats : 0;
    const availableSeatsLeft = totalMaxCapacity - currentBookedSeats;
    const requestedSeatsCount = Number(ticketCount || 1);

    if (requestedSeatsCount > availableSeatsLeft) {
      return res.status(400).json({ 
        success: false, 
        message: "Room is already filled",
        availableSeats: availableSeatsLeft >= 0 ? availableSeatsLeft : 0 
      });
    }

    const newRegistration = new Registration({
      userName, eventName, eventDate, roomNo, ticketCount: requestedSeatsCount, contact, paymentStatus
    });

    await newRegistration.save();
    res.status(201).json({ success: true, data: newRegistration });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. UPDATE REGISTRATION WITH DYNAMIC CAPACITY CHECK
router.put('/registrations/:id', async (req, res) => {
  const { id } = req.params;
  const { userName, eventName, eventDate, roomNo, ticketCount, contact, paymentStatus } = req.body;

  try {
    const targetEvent = await Event.findOne({ eventName });
    if (!targetEvent) {
      return res.status(404).json({ success: false, message: "Target event template not found" });
    }

    const targetRoom = targetEvent.rooms.find(r => r.roomNo === roomNo);
    if (!targetRoom) {
      return res.status(404).json({ success: false, message: `Room '${roomNo}' is not assigned to this event` });
    }

    const totalMaxCapacity = Number(targetRoom.capacity || 0);

    const bookedSeatsAggregation = await Registration.aggregate([
      { 
        $match: { 
          eventName, 
          roomNo, 
          _id: { $ne: new mongoose.Types.ObjectId(id) } 
        } 
      },
      { $group: { _id: null, totalSeats: { $sum: "$ticketCount" } } }
    ]);

    const currentBookedSeats = bookedSeatsAggregation.length > 0 ? bookedSeatsAggregation[0].totalSeats : 0;
    const availableSeatsLeft = totalMaxCapacity - currentBookedSeats;
    const requestedSeatsCount = Number(ticketCount || 1);

    if (requestedSeatsCount > availableSeatsLeft) {
      return res.status(400).json({ 
        success: false, 
        message: "Room is already filled",
        availableSeats: availableSeatsLeft >= 0 ? availableSeatsLeft : 0 
      });
    }

    const updatedReg = await Registration.findByIdAndUpdate(
      id, 
      { userName, eventName, eventDate, roomNo, ticketCount: requestedSeatsCount, contact, paymentStatus },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedReg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. GET ALL REGISTRATIONS WITH LIVE FILTER SEARCH MATCHING
router.get('/registrations', async (req, res) => {
    try {
        const { search } = req.query; 
        let query = {};
        
        if (search && search.trim() !== "") {
            query = {
                $or: [
                    { userName: { $regex: search.trim(), $options: "i" } },
                    { contact: { $regex: search.trim(), $options: "i" } },
                    { eventName: { $regex: search.trim(), $options: "i" } },
                    { roomNo: { $regex: search.trim(), $options: "i" } }
                ]
            };
        }
        
        let registrations = await Registration.find(query).sort({ createdAt: -1 });
        res.json(registrations);
    } catch(err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. DELETE REGISTRATION BY ID
router.delete('/registrations/:id', async (req, res) => {
    try {
        let registrationId = req.params.id;
        await Registration.findByIdAndDelete(registrationId);
        res.json({ success: true, message: "Registration Deleted Successfully" });
    } catch(err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;