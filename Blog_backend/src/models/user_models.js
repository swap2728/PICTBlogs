const { Schema ,model} = require('mongoose');
const bcrypt = require("bcrypt")
const uuid = require("uuid");
const User = new Schema({
    name : {type: String , require:true , default:""},
    email : {type:String , require:true , default:"" , unique:true},
    reg : {type:String ,require:true},
    dept: {type:String,default:""},
    passout: {type:Number,default:""},
    password : {type:String , require:true , default:""},
    picture: {
        type: String,
        trim: true,
        default:
          "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
      },
      following:{
        type:Array,
        default:[],
      },
      follower:{
        type:Array,
        default:[],
      },
    updatedOn: {type:Date},
    createdOn:{type :Date}
});

User.pre("save",
     (next)=>{
        this.updatedOn = new Date();
        this.createdOn = new Date();
    
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(this.password , salt);
        // this.password = hash;
        next();
    }
);

const UserModel = model("User",User);
module.exports = UserModel