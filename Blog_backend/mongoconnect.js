const mongoose = require("mongoose")

const mongooseconnect = async()=>{
    try{
        let connect = await mongoose.connect("mongodb+srv://adsulswapnil27:GGqxQ7DjmQf9dFVP@cluster0.1n9m3vt.mongodb.net/yes");
        return connect;
    }
    catch(e){
        console.log(e)
    }
}

module.exports = mongooseconnect