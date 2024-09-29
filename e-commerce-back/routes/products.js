const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  const { productName, description, image, originalPrice, discountPrice, sellingPrice, quantity, uom, hsnCode } = req.body;
  try {
    const product = new Product({ productName, description, image, originalPrice, discountPrice, sellingPrice, quantity, uom, hsnCode });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product by ID for all fields
router.put('/all/:id', async (req, res) => {
  const { productName, description, image, originalPrice, discountPrice, sellingPrice, quantity, uom, hsnCode } = req.body;

  // Validate the incoming data
  if (
    originalPrice < 0 ||
    discountPrice < 0 ||
    sellingPrice < 0 ||
    quantity < 0
  ) {
    return res.status(400).json({ message: 'Price and quantity must be non-negative.' });
  }

  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    product.productName = productName;
    product.description = description;
    product.image = image;
    product.originalPrice = originalPrice;
    product.discountPrice = discountPrice;
    product.sellingPrice = sellingPrice;
    product.quantity = quantity;
    product.uom = uom;
    product.hsnCode = hsnCode;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Update a product by ID for Quantity
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;

  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ message: 'Invalid quantity value' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.quantity = quantity;
    if (product.quantity < 0) {
      return res.status(400).json({ message: 'Insufficient stock available' });
    }
    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
