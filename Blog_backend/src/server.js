
const express = require("express");
const app = express();
const body_parser = require("body-parser")
const User = require('./routers/user')
const Blog = require('./routers/blogs')
const UserModel = require("./models/user_models")

const mongoose = require("mongoose")

// mongoose.connect("mongodb://127.0.0.1:27017/blog_website");
mongoose.connect("mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/yes")
// mongoose.connect("mongodb://152.57.202.86/32/");

// mongoose.connect("mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/");
// mongoose.connect("mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/")
app.listen(5000,()=> console.log("server started"))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:false}))
app.get('/',(req,res)=>res.send(" Hello world"));
app.use('/api/user',User);
app.use('/api/blog',Blog);
// const foundUser = UserModel.find();
// console.log(foundUser);
// if(!foundUser)console.log("not found")
// module.export = app;

// GGqxQ7DjmQf9dFVP



// adsulswapnil27

// mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://adsulswapnil27:<password>@cluster0.1n9m3vt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://adsulswapnil27:<password>@cluster0.1n9m3vt.mongodb.net/