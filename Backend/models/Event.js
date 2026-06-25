// models/Event.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNo: { type: String, required: true },
  capacity: { type: Number, required: true } // 👈 Make sure this is Number, not String!
});

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  rooms: [RoomSchema] // 👈 Array of rooms containing roomNo and capacity
});

module.exports = mongoose.model('Event', EventSchema);