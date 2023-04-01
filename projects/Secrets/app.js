//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("home");
});
app.get("/login", function(req, res){
    res.render("login");
});
app.get("/register", function(req, res){
    res.render("register");
});
app.get("/submit", function(req, res){
    res.render("submit");
});
app.get("/logout", function(req, res){
    res.redirect("/");
});

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);
app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save()
    .then(function(){
        res.render("secrets");
    }
    )
    .catch(function(err){
        console.log(err);
    }
    );

});
app.post("/login", async function(req, res){
    try{
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = await User.findOne({email: username});
    if(foundUser){
        if(foundUser.password === password){
            res.render("secrets");
        }
    }
    }
    catch(err){
        console.log(err);
    }

});

    
app.listen(3000, function() {
    console.log("Server started on port 3000");
    }
);