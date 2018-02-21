const server = require("http").Server();
const port  = 10001;

//initalize sockets
var io = require("socket.io")(server);

//Connection with socket

var usernames = [];
var msgs = [];

io.on("connection",function(socket){
    console.log("new User is connected");
	
	socket.on("username",function(data){
		console.log("user is giving username: " + data);
		usernames.push(data);
		
		//socket.io is client.....io.emit means server 
		io.emit("userJoined", usernames);
	})
	socket.on("sendChat",function(data){
		console.log("user sent a msg for chat");
		msgs.push(data);
		
		io.emit("msgSent",msgs);
	});
	
	socket.on("disconnect",function(){
		console.log("user has disconnected");
	})
});

server.listen(port,(err) => {
    if(err){
        console.log("Error " +err);
        return false;
    }
    console.log("Socket port is runing ");
})