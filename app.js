//jshint esversion: 6
//require of the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash =require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

//response of registering and loging in of a user
const userSchema ={
    email: String,
    password: String
};

const User = new mongoose.model("User", userSchema);


app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        } else{
            res.render("homescreen");
        }
    });
});


app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err);
        } else{
            if(foundUser){
                if(foundUser.password === password){
                res.render("homescreen");
                }
            }
        }
    });
});

//response of "/about" route
app.get("/homescreen", function(req, res){
    res.render("homescreen");
});

app.get("/about",function(req,res){
    res.render("about");
});

//response of "/contact" route
app.get("/contact",function(req,res){
    res.render("contact");
});

//response of "/exam" route
app.get("/exam",function(req,res){
    res.render("exam");
});

//response of "/result" route
app.get("/result",function(req,res){
    res.render("result");
});

// response to "/query" route
app.get("/query",function(req,res){
    res.render("query");
});

// response to "/reset-password" route
app.get("/reset-password",function(req,res){
    res.render("reset-password");
});

// response to "/profile" route
app.get("/profile",function(req,res){
    res.render("profile");
});

// response to "/exam /test" route
app.get("/exam/test1",function(req,res){
    res.render("test1");
});

// response to "/exam/thank" route
app.get("/exam/thank",function(req,res){
  console.log("thank you page");
  res.render("thank");
});

// response to "/result/marks" route
app.get("/result/marks", function(req,res){
  console.log("marks of particular subject.");
  res.render("marks");
});

//response of "/logout" route
app.get("/logout",function(req,res){
    console.log("logout page");
    res.render("logout",{logoutText:logoutContent});
});

//port at localhost 3000.
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
