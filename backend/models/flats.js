const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  images: { type: Array },
  cost: { type: Number },
  cost_m2: { type: Number },
  currency: { type: String },
  owner: { type: String },
  rooms: { type: Number },
  floor: { type: Number },
  city: { type: String },
  address: { type: String },
  area: { type: String },
});
module.exports = mongoose.model('Flats', dataSchema, 'flats');
