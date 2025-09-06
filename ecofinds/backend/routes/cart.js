const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart for user
router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  res.json(cart || { userId: req.user.id, items: [] });
});

// Add item (or update qty)
router.post('/add', auth, async (req, res) => {
  const { productId, qty = 1 } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if(!cart) cart = new Cart({ userId: req.user.id, items: [] });

  const idx = cart.items.findIndex(i => i.productId.toString() === productId);
  if(idx >= 0) cart.items[idx].qty += qty;
  else cart.items.push({ productId, qty });
  await cart.save();
  res.json(cart);
});

// Remove item
router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });
  if(!cart) return res.json({ items: [] });
  cart.items = cart.items.filter(i => i.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
});

// Clear cart
router.post('/clear', auth, async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ ok: true });
});

module.exports = router;
