const express = require("express");
const app = express();
const port = 10000;

var greetings = [
    "Hello Client",
    "Bonjour",
    "Buenos Dias",
    "Good Day"
];

app.get("/greeting",(req,resp)=> {
    
    var index = Math.round(Math.random() * (greetings.length-1));
    resp.end(greetings[index]);
});

app.get("/add/:msg",(req,resp) => {
    var msg = req.params.msg;
    greetings.push(msg);
    resp.end("Added msg");
});


app.listen(port,(err) => {
    if(err){
        console.log("ERROR " + err );
        return false;
    }
    console.log("port is ready")
})