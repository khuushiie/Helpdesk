const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Open', 'In Progress', 'On Hold', 'Closed', 'Rejected'], default: 'Open' },
  inCharge: { type: String, required: false },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  department: { type: String, required: false },
  type: { type: String, enum: ['Bug', 'Issue', 'Request', 'Support'], required: false },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  attachment: { type: String, required: false },
  teamName: { type: String, required: false },
  teamMembers: [{ type: String, required: false }],
  rejectionReason: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);