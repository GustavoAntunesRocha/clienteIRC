var fs = require('fs');
var http = require('http');
var io = require('socket.io');
var engine = require('engine.io');
var NetSocket = require("net").Socket;
var IrcSocket = require("irc-socket");
var netSocket = new NetSocket();
var client = IrcSocket({
    socket: netSocket,

    port: 6667,
    server: "irc.freenode.net",
    nicknames: ["freddy", "freddy_"],
    username: "freddy",
    realname: "Freddy",
});
var serverHttp = http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-type': 'text/html' });

    res.end(fs.readFileSync(__dirname + '/index.html'));

}).listen(3000, function() {

    console.log('Listening at: http://localhost:3000');

});
//var server = engine.attach(serverHttp);

io.listen(serverHttp).on('connection', function(socket) {
    console.log("Socket conectou");
    client.connect();
    client.raw("JOIN #biscoitos");
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