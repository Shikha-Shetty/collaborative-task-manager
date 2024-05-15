const express = require('express');
const { signup, login, logout } = require('./controllers/authController');
const { getProfile, updateProfile } = require('./controllers/profileController');
const { createTask, viewTask, updateTask, filterTaskByStatus, searchTask } = require('./controllers/taskController');
const verifyToken = require('./middleware/authJwt');

require('dotenv').config();

const app = express(); 
app.use(express.json());

const port = 3000;

// Route to register
app.post('/register', signup);

// Route to login
app.post('/login', login);

// Route to view profile for the logged-in user
app.get('/profile', verifyToken, getProfile);

// Route to update profile for the logged-in user
app.put('/profile', verifyToken, updateProfile);

// Route to logout
app.post('/logout', verifyToken, logout);

// Route to create new task
app.post('/tasks', verifyToken, createTask);

// Route to mark a task as completed when the logged-in user finished working on it
app.put('/tasks/:taskId', verifyToken, updateTask);

// Route to view a list of all tasks assigned to the logged-in user
app.get('/tasks', verifyToken, viewTask);

// Route to filter tasks of the logged-in user based on status
app.get('/tasks/status', verifyToken, filterTaskByStatus);

// Route to search tasks of the logged-in user by title or description
app.get('/tasks/search', verifyToken, searchTask);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});