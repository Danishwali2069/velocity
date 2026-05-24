const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, sort, page = 1, limit = 10, search } = req.query;
    const query = {};
    if (category) query.category = category;
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
    ];
    const sortMap = { price_asc: { price: 1 }, price_desc: { price: -1 }, newest: { createdAt: -1 } };
    const sortObj = sortMap[sort] || { createdAt: -1 };
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ products, total, pages: Math.ceil(total / limit), page: Number(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/featured
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(6);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Car not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products  (admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id (admin)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/products/:id (admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
