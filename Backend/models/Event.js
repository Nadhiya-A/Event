const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNo: { type: String, required: true },
  capacity: { type: Number, required: true, min: 0 }
});

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  rooms: [RoomSchema] // Added support for sub-rooms to prevent .find() crashes
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);