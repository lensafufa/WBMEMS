const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = '123456789';

router.post('/', async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Find the user by emai
        const Logger = await User.findOne({where: {email:email, userName:userName} });

        if (Logger) {
            // Compare the provided password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(password, Logger.password);
            
            if (passwordMatch) {
                // If passwords match, generate JWT token
                const token = jwt.sign({ 
                    id:Logger.id,
                    name: Logger.name,
                    userName: Logger.userName,
                    lastName: Logger.lastName,
                    email: Logger.email,
                    occupation: Logger.occupation,
                    profilePicture: Logger.profilePicture,
                }, secretKey, { expiresIn: '24h' });
                console.log('token-backend', token);
                res.json({ success: true, token });
             
            } else {
                // If passwords don't match, send invalid credentials response
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            // If user with the provided email doesn't exist, send invalid credentials response
            res.status(401).json({ success: false, message: 'Invalid ' });
        
        }
    } catch (error) {
        console.error(error, 'Error on backend');
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
