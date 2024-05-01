const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.API_SECRET);
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
    }
};

module.exports = verifyToken;