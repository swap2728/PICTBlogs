const { Schema ,model} = require('mongoose');

const User = new Schema({
    name : {type: String , require:true , default:""},
    email : {type:String , require:true , default:"" , unique:true},
    reg : {type:String ,require:true},
    password : {type:String , require:true , default:""},
    updatedOn: {type:Date},
    createdOn:{type :Date}
});

User.pre("save",
    (next)=>{
        this.updatedOn = new Date();
        this.createdOn = new Date();

        const salt = bcrypt.genSalt(10);
        const hash = bcrypt.hash(this.password,salt);
        this.password = hash;
        next();
    }
);

const UserModel = model("User",User);
module.exports = UserModel