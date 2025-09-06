const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/authMiddleware');

// Create product
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, price, imageUrl } = req.body;
    const p = new Product({
      title, description, category, price, imageUrl: imageUrl || 'https://placehold.co/600x400?text=No+Image',
      ownerId: req.user.id
    });
    await p.save();
    res.json(p);
  } catch(err) { res.status(500).json({ message: 'Server error' }); }
});

// Read all (with optional category & search)
router.get('/', async (req, res) => {
  try {
    const { category, q, page = 1, limit = 20 } = req.query;
    const filter = {};
    if(category) filter.category = category;
    if(q) filter.title = { $regex: q, $options: 'i' }; // simple text search
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page -1) * limit)
      .limit(Number(limit));
    res.json(products);
  } catch(err) { res.status(500).json({ message: 'Server error' }); }
});

// Get one
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('ownerId', 'username email');
    if(!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch(err) { res.status(500).json({ message: 'Server error' }); }
});

// Update (owner only)
router.patch('/:id', auth, async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if(!p) return res.status(404).json({ message: 'Not found' });
    if(p.ownerId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(p, req.body);
    await p.save();
    res.json(p);
  } catch(err) { res.status(500).json({ message: 'Server error' }); }
});

// Delete (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if(!p) return res.status(404).json({ message: 'Not found' });
    if(p.ownerId.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await p.deleteOne();
    res.json({ message: 'Deleted' });
  } catch(err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
