/*global $ io*/
$(document).ready(function(event) {
console.log(event);

var socket = io.connect('/');

var username = $.trim(prompt('Please enter your username.')).replace('<', '&lt;').replace('>', '&gt;');

while ($.trim(username).length == 0) {
    username = $.trim(prompt('Username must have characters other than spaces.'))
                                                            .replace('<', '&lt;').replace('>', '&gt;');
}
socket.emit('join', {'username': username});

socket.on('message', function(data) {
    //$("#chatlog-wrapper").css('height', parseFloat($("#chatlog-wrapper").css('height')) + 35.250 + 'px');
    $("#chatlog-names").append('<li>' + data.username + '</li>');
    $("#chatlog-messages").append('<li>'  + data.message + '</li>');
    $("#chatlog").css('bottom', '0px');
});

socket.on('join', function(data) {
    $("#users").append("<p>" + data.username + "</p>");
    $("#chatlog-names").append('<li>' + data.username +'</li>');
    $("#chatlog-messages").append('<li>joined</li>');
    $("#chatlog").css('bottom', '0px');
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
    $("#chatlog-names").append('<li>' + data.username + '</li>');
    $("#chatlog-messages").append('<li>left</li>');
    $("#chatlog").css('bottom', '0px');
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