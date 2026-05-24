const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  badge: { type: String, default: '' },
  colors: [{ type: String }],
  specs: {
    hp: { type: Number, required: true },
    topSpeed: { type: Number, required: true },
    acceleration: { type: Number, required: true },
    engine: { type: String },
    transmission: { type: String },
    drivetrain: { type: String },
  },
  description: { type: String, required: true },
  stock: { type: Number, default: 10 },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  category: { type: String, enum: ['sports', 'supercar', 'track', 'limited'], default: 'sports' },
}, { timestamps: true });

productSchema.index({ brand: 1, name: 1 });
productSchema.index({ price: 1 });
productSchema.index({ featured: 1 });

module.exports = mongoose.model('Product', productSchema);
