const express = require('express');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const userId = req.query.userId;
      const purchases = await Purchase.find({ userId }) 
        .populate('products.productId'); 
      res.json(purchases);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
router.post('/', async (req, res) => {
    const { userId, products, totalAmount, paymentMethod, address } = req.body;
    try {
      const purchase = new Purchase({
        userId,
        products,
        totalAmount,
        paymentMethod,
        address,
      });
      await purchase.save();
      res.status(201).json({ message: 'Purchase recorded successfully', purchase });
    } catch (error) {
      console.error('Error recording purchase:', error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
