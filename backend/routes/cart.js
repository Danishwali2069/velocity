// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart || { items: [], total: 0 });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/add', async (req, res) => {
  try {
    const { productId, qty = 1, color } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx >= 0) cart.items[idx].qty += qty;
    else cart.items.push({ product: productId, qty, color });
    await cart.save();
    res.json(await cart.populate('items.product'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/remove/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
    await cart.save();
    res.json(await cart.populate('items.product'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/clear', async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: 'Cart cleared' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
