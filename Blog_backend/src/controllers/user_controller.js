// const 

const UserModel = require("../models/user_models")
const bcrypt = require("bcrypt");
const UserController = {
    createAccount : async (req,res,next)=>{
        try{
            const {name,email ,reg, password} = req.body;
            const Model = UserModel({name,email,reg,password});
            await Model.save();
            console.log(Model)
            return res.json({status:true , data:Model})
        }
        catch(e){
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
            // console.log(foundUser);
            if(!foundUser){
                return res.json({status:false , message:"user not found"});
            }
            const passwordMatch = bcrypt.compare(password,foundUser.password);
            if(!passwordMatch){
                res.json({status:false , message:"Password do not match" });
            }
            return res.json({status:true, message:foundUser});
            // res.json({status:true , "mess": "for sign in"});
        }catch(e){
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