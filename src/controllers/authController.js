const bcrypt = require('bcrypt');
const User = require('../models/User');

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

module.exports = {signup};