/*global $ io*/
$(document).ready(function() {
    
var socket = io.connect('/');

var username = $.trim(prompt('Please enter your username.')).replace('<', '&lt;').replace('>', '&gt;');

while ($.trim(username).length == 0) {
    username = $.trim(prompt('Username must have characters other than spaces.')).replace('<', '&lt;').replace('>', '&gt;');
}
socket.emit('join', {'username': username});

socket.on('message', function(data) {
    $("#chatlog-wrapper").css('height', parseFloat($("#chatlog-wrapper").css('height')) + 35.250 + 'px');
    $("#chatlog").append('<li><pre>' + data.username + ':     ' + data.message + '</pre></li>');
    
});

socket.on('join', function(data) {
    $("#users").append("<p>" + data.username + "</p>");
    $("#chatlog-wrapper").css('height', parseFloat($("#chatlog-wrapper").css('height')) + 35.250 + 'px');
    $("#chatlog").append('<li><pre>     ' + data.username + ' has joined.</pre></li>');
});

socket.on('leave', function(data) {
    var users = $("#users").find('p');
    var username = data.username;
    for (let i = 0, length = users.length; i < length; i++) {
        if ($(users[i]).text() == username) {
            $(users[i]).remove();
            break;
        }
    }
    $("#chatlog-wrapper").css('height', parseFloat($("#chatlog-wrapper").css('height')) + 35.250 + 'px');
    $("#chatlog").append('<li><pre>     ' + data.username + ' has left.</pre></li>');
});

$("#send").on('click', function(event) {
    var message = $("#message").val().replace('<', '&lt;').replace('>', '&gt;');
    if ($.trim(message).length > 0) {
        $("#message").val("");
        socket.emit('message', {'username': username, 'message': message});
    }
});

$("#message").on('keydown', function(event) {
    if (event.keyCode === 13) {
        $("#send").trigger('click');
    }
});

});