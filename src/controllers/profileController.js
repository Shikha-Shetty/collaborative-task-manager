const User = require('../models/User');
const { validateUserProfile } = require('../validation/validator');

const getProfile = (req, res) => {
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

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const sanitizedProfile = validateUserProfile(req.body);
        if (sanitizedProfile.success == false) {
            return res.status(400).json(validateUserProfile(req.body));
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update(sanitizedProfile.sanitizedInput);
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getProfile, updateProfile };