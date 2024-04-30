const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

var signup = (req, res) => {
// Create a new user and save it to the database
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


var login = (req, res) => {
    var emailPassed = req.body.email;
    let passwordPassed = req.body.password;
    User.findOne({
        where: { email: emailPassed } // Specify the condition here
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
                id: user.id
            }, process.env.API_SECRET, {
                expiresIn: 86400
            });

            return res.status(200).json({
                message: "Login Successful",
                accessToken: token,
                user: {
                    id: user.id
                }
            });
        }
    }).catch(err => {
        return res.status(500).send({ message: err });
    });
}


module.exports = {signup, login};