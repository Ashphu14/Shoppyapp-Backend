require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes'); // Ensure this line exists

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes); // Ensure this line exists

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI) // Ensure this matches your `.env` variable exactly
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

app.listen(5000, () => console.log('Server running on port 5000'));
console.log('MongoDB URI:', process.env.MONGODB_URI); // This should log the URI to confirm it's being read correctly
