const express = require('express');
const {signup, login, logout} = require('./controllers/authController');
const {getProfile, updateProfile} = require('./controllers/profileController');
const verifyToken = require('./middleware/authJwt');

require('dotenv').config();

const app = express(); 
app.use(express.json());

const port = 3000;

app.post('/register', signup);
app.post('/login', login);
app.get('/profile', verifyToken, getProfile);
app.put('/profile', verifyToken, updateProfile);
app.post('/logout', verifyToken, logout);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});