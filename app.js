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
const logoutContent="Your are log-out of the system !!!"
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

//response of registering and loging in of a user
const userSchema ={
    email: String,
    password: String
};

//adding question to db by teacher interface
const questionSchema={
  subject_name:String,
  ques:String,
  option1:String,
  option2:String,
  option3:String,
  option4:String,
  correct_ans:String,
  marks:Number
};
//model or collection
const Question = mongoose.model("Question",questionSchema);
app.post("/teacher/question-paper",function(req,res){
  console.log(req.body);
  const question = new Question({
    subject_name :req.body.subject_name,
    ques :req.body.newQuestion,
    option1:req.body.option1,
    option2:req.body.option2,
    option3:req.body.option3,
    option4:req.body.option4,
    correct_ans:req.body.correct_ans,
    marks:req.body.marks
  });
  question.save(function(err){
    if(!err){
      console.log("added");
      res.redirect("/teacher/question-paper");
    }else{
      console.log(err);
    }
  });
});

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
  console.log("homescreen page");
    res.render("homescreen");
});

app.get("/about",function(req,res){
  console.log("about page");
    res.render("about");
});

//response of "/contact" route
app.get("/contact",function(req,res){
  console.log("contact page");
    res.render("contact");
});

//response of "/exam" route
app.get("/exam",function(req,res){
  console.log("exam page");
    res.render("exam");
});

//response of "/result" route
app.get("/result",function(req,res){
  console.log("result page");
    res.render("result");
});

// response to "/query" route
app.get("/query",function(req,res){
  console.log("query page.");
    res.render("query");
});

// response to "/reset-password" route
app.get("/reset-password",function(req,res){
  console.log("reset-password page.");
    res.render("reset-password");
});

// response to "/profile" route
app.get("/profile",function(req,res){
  console.log("profile page.");
    res.render("profile");
});

// response to "/exam /test" route
app.get("/exam/test1",function(req,res){
  console.log("question/test screen/page.");
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

// response to "/teacher" route
app.get("/teacher", function(req,res){
  console.log("Welcome to the teachers' side");
  res.render("teacher");
});

// response to "/teacher/question-paper" route
app.get("/teacher/question-paper", function(req,res){
  console.log("to add question in db.");
  res.render("question-paper");
});

// response to "/admin" route
app.get("/admin", function(req,res){
  console.log("Welcome to the admin's side");
  res.render("admin");
});

//response of "/logout" route
app.get("/logout",function(req,res){
    console.log("logout page");
    res.render("logout",{logoutText:logoutContent});
});

//port at localhost 3000.
app.listen(8000, function() {
  console.log("Server started on port 8000");
});
