const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstName: req.body.firstName,
    lastName: req.body.lastName
})
.then(user => {
    return res.status(200).json({user, message: "User created successfully"});
})
.catch(err => {
    return res.status(500).send({message: err});
});

}

const login = (req, res) => {
    var emailPassed = req.body.email;
    let passwordPassed = req.body.password;
    User.findOne({
        where: { email: emailPassed }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        let passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid password"
            });
        } else {
            var token = jwt.sign({
                id: user.userId
            }, process.env.API_SECRET, {
                expiresIn: 86400
            });

            return res.status(200).json({
                message: "Login Successful",
                accessToken: token,
                user: {
                    id: user.userId
                }
            });
        }
    }).catch(err => {
        return res.status(500).send({ message: err });
    });
}

const logout = (req, res) => {
    try {
        // Assuming the token is stored in the client's localStorage
        // Currently no frontend application to test it
        // localStorage.removeItem('accessToken');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { signup, login, logout };