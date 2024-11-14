const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], 
  tags: { type: [String], default: [] },
  car_type: { type: String },
  company: { type: String },
  dealer: { type: String },
});
module.exports = mongoose.model('Car', CarSchema);
