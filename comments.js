// Create web server
// 1. Import express
// 2. Create a new express instance
// 3. Create a new route
// 4. Create a new route for comments
// 5. Export the express instance

// 1. Import express
const express = require('express');

// 2. Create a new express instance
const app = express();

// 3. Create a new route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 4. Create a new route for comments
app.get('/comments', (req, res) => {
  res.send('This is a comments route');
});

// 5. Export the express instance
module.exports = app;