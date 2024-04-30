const express = require('express');
const {signup, login} = require('./controllers/authController');
require('dotenv').config();

const app = express(); 
app.use(express.json());

const port = 3000;

app.post('/register', signup);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});