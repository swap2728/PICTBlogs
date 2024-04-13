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
    },


    follower : async(req, res, next)=>{
        try{
            try {
                const { id, userid } = req.body;
            
                // Use findOne() instead of find() to get a single document
                const model = await UserModel.findOne({ _id: id });
                const model2 = await UserModel.findOne({_id:userid});
            
                if (!model || !model2) {
                    return res.status(404).json({ status: "error", message: "User not found" });
                }
            
                console.log(model.following);
            
                let updatedFollowing , updatedFollowing2;
            
                if (Array.isArray(model.following)) {
                    if (model.following.includes(userid)) {
                        updatedFollowing = model.following.filter(value => value !== userid);
                        updatedFollowing2 = model2.follower.filter(value=> value!==id);
                    } else {
                        updatedFollowing = [...model.following, userid];
                        updatedFollowing2 = [...model2.follower , id];
                    }
                } else {
                    updatedFollowing = [userid];
                    updatedFollowing2 = [id]
                }
            
                const updatedFollower = await UserModel.findOneAndUpdate(
                    { _id: id },
                    { $set: { following: updatedFollowing } },
                    { new: true }
                );
                const updatedFollower2 = await UserModel.findByIdAndUpdate(
                    {_id: userid},
                    {$set : { follower: updatedFollowing2}},
                    {new :true}
                )
            
                res.json({ status: "ok", data: updatedFollower , data2: updatedFollower2});
            } catch (error) {
                console.error("An error occurred:", error);
                res.status(500).json({ status: "error", message: "Internal server error" });
            }
            
        }
        catch(e){
            throw e;
        }
    }
}

module.exports = UserController;    