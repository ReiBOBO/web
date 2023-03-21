const express = require("express");
//refer to express module.
const app = express();
//use this app
app.get("/", function(request, response){
    response.send("<h1>Hello World</h1>");
}); //this specify what happens when a browser request from this port, location
app.get("/contact",function(req,res){
    res.send("haominrei@gmail.com");
});
app.get("/about",function(req,res){
    res.send("My name is Haomin,married");
});
app.get("/hobbits",function(req,res){
    res.send("Study,fishing,work out, reading, etc");
});
app.get("/careers",function(req,res){
    res.send("No idea");
})
app.listen(3000, function(){
    console.log("Server started on port 3000");
});
