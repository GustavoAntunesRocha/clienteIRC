var fs = require('fs');
var http = require('http');
var io = require('socket.io');
var engine = require('engine.io');
var NetSocket = require("net").Socket;
var IrcSocket = require("irc-socket");
var netSocket = new NetSocket();

//Configuracoes do servidor IRC
var client = IrcSocket({
    socket: netSocket,
    port: 6667,
    server: "irc.freenode.net",
    nicknames: ["freddy", "freddy_"],
    username: "freddy",
    realname: "Freddy",
});
//Servidor http
var serverHttp = http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-type': 'text/html' });

    res.end(fs.readFileSync(__dirname + '/index.html'));

}).listen(3000, function() {

    console.log('Listening at: http://localhost:3000');

});


io.listen(serverHttp).on('connection', function(socket) {
    console.log("Socket conectou");
    client.connect();
    socket.on('message', function(data) {
        console.log(data);
        client.raw(data);
    });
    client.on('data', function(message) {
        console.log(message);
        socket.send(message);
    });
    socket.on('close', function() {

    });
});