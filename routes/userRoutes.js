const express = require('express');
const User = require('../models/User');
const Address = require('../models/Address');
const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
    try {
        const { name, address } = req.body;

        // Create a new user
        const user = new User({ name });
        await user.save();

        // Create a new address and associate it with the user
        const userAddress = new Address({
            userId: user._id,
            address
        });
        await userAddress.save();

        // Link the address to the user
        user.addresses.push(userAddress._id);
        await user.save();

        res.status(201).json({ message: 'User and address registered successfully', user, address: userAddress });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;