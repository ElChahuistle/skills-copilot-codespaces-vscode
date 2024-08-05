// Create new webserver
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Create new database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');

// Create new comment schema
var commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

// Create new comment model
var Comment = mongoose.model('Comment', commentSchema);

// Serve static files
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Create new comment
app.post('/comment', function(req, res) {
  var comment = new Comment(req.body);
  comment.save(function(err) {
    if (err) console.log(err);
    io.emit('comment', req.body);
    res.json({ status: 'ok' });
  });
});

// Get all comments
app.get('/comments', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) console.log(err);
    res.json(comments);
  });
});

// Start webserver
http.listen(3000, function() {
  console.log('listening on *:3000');
});