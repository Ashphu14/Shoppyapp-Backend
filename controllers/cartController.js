 
const Cart = require('../models/cart');

// Add a product to the cart
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (cart) {
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
    } else {
        const newCart = new Cart({ userId, items: [{ productId, quantity }] });
        await newCart.save();
    }
    res.status(201).json({ message: 'Product added to cart' });
};

 

module.exports = { addToCart /*, other functions */ };
