const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  contact: { type: String, required: true },
  ticketCount: { type: Number, required: true },
  eventName: { type: String, required: true },  // Saves your event name string properly
  eventDate: { type: String, required: true },  // Saves your event date string properly
  roomNo: { type: String, required: true },     // Saves your assigned room number properly
  paymentStatus: { type: String, default: 'Not Paid' }
}, { timestamps: true });

module.exports = mongoose.model('Registration', RegistrationSchema);