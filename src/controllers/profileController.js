const User = require('../models/User');

var getProfile = (req, res) => {
    const userId = req.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        })
        .catch(err => {
            console.error('Error fetching user details:', err);
            res.status(500).json({ message: 'Internal server error', error: err.message });
        });
}


module.exports = {getProfile};