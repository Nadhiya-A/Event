const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added link for security
  userName: { type: String, required: true },
  ticketCount: { type: Number, required: true, min: 1 },
  contact: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Not Paid'], default: 'Not Paid' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  roomNumber: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Registration', RegistrationSchema);