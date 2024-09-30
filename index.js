const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Assuming you have this file for routes

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection (updated to remove deprecated options)
mongoose.connect('mongodb://localhost:27017/user-address-db')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});