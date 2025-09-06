const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create an order from cart (simulate purchase)
router.post('/checkout', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  if(!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart empty' });

  let total = 0;
  const items = cart.items.map(i => {
    const price = i.productId.price || 0;
    total += price * i.qty;
    return { productId: i.productId._id, qty: i.qty, priceAtPurchase: price };
  });

  const order = new Order({ userId: req.user.id, items, total });
  await order.save();
  await Cart.deleteOne({ userId: req.user.id });
  res.json(order);
});

// Get previous purchases for user
router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(100);
  res.json(orders);
});

module.exports = router;
