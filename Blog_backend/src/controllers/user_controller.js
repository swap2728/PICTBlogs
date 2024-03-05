// const 

const UserModel = require("../models/user_models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const UserController = {
    createAccount : async (req,res,next)=>{
        try{
            const {name,email ,reg,dept,passout, password} = req.body;
            const Model = new UserModel({name,email,reg,dept,passout,password});
            console.log(password);
            await Model.save();
            console.log(Model)
            return res.json({status:true , data:Model})
        }
        catch(e){
            throw e;
            res.json({status:false})
        }   
    },
    signin : async (req,res)=>{
        try{
            const {email, password} = req.body;
            console.log(password);
            const foundUser = await UserModel.findOne({email:email});
            // const x  = await UserModel.updateOne(
            //     {name:"Swap"},
            //     {$set:{reg:"xyz"}},
            //     {new:true}
            // )
            // const foundUser = await UserModel.find();/
            console.log(foundUser);
            
            if(!foundUser){
                return res.json({status:false , message:"user not found"});
            }
            // const passwordMatch = bcrypt.compare(password,foundUser.password);
            if(password!=foundUser.password){
               return res.json({status:false , message:"Password do not match" });
            }
            let token = jwt.sign({foundUser},"secret");
            // res.;
            return res.json({status:true, message:token});
            // res.json({status:true , "mess": "for sign in"});
        }catch(e){
            throw e;
            res.json({status:false});
        }
    },

    update : async(req,res)=>{
        try{
            const foundUser = new UserModel.find({name:"Swap"});
            console.log(foundUser);
        }
        catch(e){
            throw e;
        }
    }

}

module.exports = UserController;