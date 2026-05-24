const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist);
});

router.post('/toggle/:productId', async (req, res) => {
  const user = await User.findById(req.user._id);
  const pid = req.params.productId;
  const idx = user.wishlist.indexOf(pid);
  if (idx >= 0) user.wishlist.splice(idx, 1);
  else user.wishlist.push(pid);
  await user.save();
  res.json({ wishlist: user.wishlist, added: idx < 0 });
});

module.exports = router;
