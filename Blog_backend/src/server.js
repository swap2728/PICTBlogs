
const express = require("express");
const app = express();
const body_parser = require("body-parser")
const User = require('./routers/user')
const Blog = require('./routers/blogs')
const UserModel = require("./models/user_models")
// const connect = require("../mongoconnect")
const mongoose = require("mongoose")

// mongoose.connect("mongodb://127.0.0.1:27017/blog_website");
// mongoose.connect("mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/yes")

//  mongoose.createConnection("mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/yes").asPromise();

// await connect();

 mongoose.connect("mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/yes")   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));


app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:false}))
app.get('/',(req,res)=>{res.send(" Hello world")});
app.use('/api/user',User);
app.use('/api/blog',Blog);

app.listen(5000,()=> console.log("server started"))
// const foundUser = UserModel.find();
// console.log(foundUser);
// if(!foundUser)console.log("not found")
module.export = app;

// GGqxQ7DjmQf9dFVP

// adsulswapnil27

// mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://adsulswapnil27:<password>@cluster0.1n9m3vt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://adsulswapnil27:<password>@cluster0.1n9m3vt.mongodb.net/