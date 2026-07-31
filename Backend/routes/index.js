const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { verifyToken } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// ==========================================
// 🔑 AUTHENTICATION ENDPOINTS
// ==========================================

router.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Email is already registered."
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: "user"
    });

    await newUser.save();

    res.status(201).json({
      message: "Registration successful! You can now log in."
    });

  } catch (err) {
    console.error("❌ Sign-Up Error:", err);

    res.status(500).json({
      message: "Server registration error.",
      error: err.message
    });
  }
});

router.post('/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password match." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password match." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Sign-in endpoint validation failure." });
  }
});

// ==========================================
// 📊 REGISTRATION WORKSPACE ENDPOINTS
// ==========================================
router.get("/registrations", verifyToken, async (req, res) => {
  try {
    const { search = "" } = req.query;

    // Get registrations with populated event
    let registrations = await Registration.find()
      .populate("eventId");

    // User should only see their own registrations
    if (req.user.role !== "admin") {
      registrations = registrations.filter(
        reg => reg.userId.toString() === req.user.id
      );
    }

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase();

      registrations = registrations.filter(reg => {
        return (
          reg.userName?.toLowerCase().includes(keyword) ||
          reg.contact?.toLowerCase().includes(keyword) ||
          reg.roomNumber?.toString().toLowerCase().includes(keyword) ||
          reg.eventId?.eventName?.toLowerCase().includes(keyword) ||
          reg.paymentStatus?.toLowerCase().includes(keyword)
        );
      });
    }

    res.json(registrations);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch registrations."
    });
  }
});

router.post('/registrations', verifyToken, async (req, res) => {
  try {
    const { userName, ticketCount, contact, paymentStatus, eventId, roomNumber } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Target event profile not found." });

    // Safely look up the sub-room without crashing
    const targetRoom = event.rooms.find(r => r.roomNo === roomNumber);
    if (!targetRoom) return res.status(400).json({ message: `Selected room "${roomNumber}" does not exist for this event.` });

    // Aggregate capacities safely
    const currentBookings = await Registration.aggregate([
      { $match: { eventId: event._id, roomNumber: roomNumber } },
      { $group: { _id: null, total: { $sum: "$ticketCount" } } }
    ]);
    const bookedCount = currentBookings.length > 0 ? currentBookings[0].total : 0;

    if (bookedCount + parseInt(ticketCount, 10) > targetRoom.capacity) {
      return res.status(400).json({ message: `Registration blocked. Room ${roomNumber} has reached its capacity limit (${targetRoom.capacity} seats max).` });
    }

    const newRegistration = new Registration({
      userId: req.user.id,
      userName,
      ticketCount: parseInt(ticketCount, 10),
      contact,
      paymentStatus: paymentStatus === 'COMPLETED' || paymentStatus === 'Paid' ? 'Paid' : 'Not Paid',
      eventId,
      roomNumber
    });

    const savedRecord = await newRegistration.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    console.error("❌ Registration POST Error:", err);
    res.status(400).json({ message: "Data format criteria constraints failed processing.", error: err.message });
  }
});

// UPDATE REGISTRATION
router.put("/registrations/:id", verifyToken, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found."
      });
    }

    // Only admin or owner can edit
    if (
      req.user.role !== "admin" &&
      registration.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Unauthorized action."
      });
    }

    const {
      userName,
      ticketCount,
      contact,
      paymentStatus,
      eventId,
      roomNumber
    } = req.body;

    registration.userName = userName;
    registration.ticketCount = ticketCount;
    registration.contact = contact;
    registration.paymentStatus = paymentStatus;
    registration.eventId = eventId;
    registration.roomNumber = roomNumber;


    await registration.save();

    res.json(registration);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update registration."
    });
  }
});

router.delete('/registrations/:id', verifyToken, async (req, res) => {
  try {
    const targetRecord = await Registration.findById(req.params.id);
    if (!targetRecord) return res.status(404).json({ message: "Target document footprint not discovered." });

    if (req.user.role !== 'admin' && targetRecord.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action." });
    }

    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal fatal deletion pipeline errors." });
  }
});


// UPDATE PROFILE
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: "Profile update failed."
    });
  }
});
module.exports = router;