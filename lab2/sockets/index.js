const server = require("http").Server();
const port  = 10001;

//initalize sockets
var io = require("socket.io")(server);

//Connection with socket
io.on("connection",function(socket){
    console.log("new person connected");
    io.emit("newperson");
    
    socket.on("Typing",() => {
        socket.broadcast.emit("isTyping");
    });
});

server.listen(port,(err) => {
    if(err){
        console.log("Error " +err);
        return false;
    }
    console.log("Socket port is runing ");
})