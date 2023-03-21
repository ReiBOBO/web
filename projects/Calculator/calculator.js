const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){

    var num1= Number(req.body.num1);
    var num2= Number(req.body.num2);
    var result = num1+num2;
    res.send("Result of the calculation is "+ result);
});

app.get("/bmiCalculator",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
})
app.post("/bmiCalculator", function(req,res){

    var weight= Number(req.body.weight);
    var height= Number(req.body.height);
    var result = weight/(height*height);
    res.send("Your BMI is "+ result);
});




app.listen(3000, function(){
    console.log("Server has started via port 3000.")
})