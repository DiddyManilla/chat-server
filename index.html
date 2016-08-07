var express = require('express');
var app = express();
var router = require('./router');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + "/public"));
app.use(router);

var users = [];
io.on('connection', function(client) {
    client.on('join', function(data) {
        client.username = data.username;
        console.log(data.username + " joined the chat.");
        users.push(data.username);
        client.broadcast.emit('join', {'username': data.username});
        for (var i = 0, length = users.length; i < length; i++) {
            client.emit('join', {'username': users[i]});
        }
    
        
    });
    client.on('message', function(data) {
        io.emit('message', data);
        console.log(data.username + ': ' + data.message);
    });
    client.on('disconnect', function(data) {
        console.log(client.username + " left the chat.");
        users.splice(users.indexOf(client.username), 1);
        client.broadcast.emit('leave', {username: client.username});
    });
});

server.listen(process.env.PORT || 8080, process.env.IP || 'localhost');