const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// GET /api/cart - Get all cart items
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('productId'); // Fetches all cart items
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/cart - Add an item to the cart
router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId || quantity == null) {
        return res.status(400).json({ message: 'productId and quantity are required' });
    }

    try {
        const newCart = new Cart({ productId, quantity });
        const savedCart = await newCart.save(); // Save the new cart item
        res.status(201).json(savedCart); // Respond with the created cart item
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/cart/:id - Update a cart item
router.put('/:id', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cart) return res.status(404).json({ message: 'Cart item not found' });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/cart/:id - Remove a cart item
router.delete('/:id', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart item not found' });

        res.json({ message: 'Cart item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
