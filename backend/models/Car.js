const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
  id:{type: String, required: true,unique:true},
  title: { type: String, required: true },
  description: { type: String },
  images: [{ public_id: String,
    url: String, }], 
  tags: { type: [String], default: [] },
  car_type: { type: String },
  company: { type: String },
  dealer: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = mongoose.model('Car', CarSchema);
