var fs = require('fs')

, http = require('http')

, socketio = require('socket.io'), irc = require('irc');

var servidor = 'irc.freenode.net';
var nick = 'teste2';
var canal = '#adsiweb';
var dentro_do_canal = false;

var client = new irc.Client(servidor,
    nick, { channels: [canal], }
);

var server = http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-type': 'text/html' });

    res.end(fs.readFileSync(__dirname + '/index.html'));

}).listen(8080, function() {

    console.log('Listening at: http://localhost:8080');

});

socketio.listen(server).on('connection', function(socket) {

    socket.on('message', function(msg) {

        console.log('Message Received: ', msg);

        socket.broadcast.emit('message', msg);
    });

});