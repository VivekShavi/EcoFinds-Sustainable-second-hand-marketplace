const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, index: true },
  description: String,
  category: { type: String, index: true },
  price: Number,
  imageUrl: String, // placeholder URL
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
