const BlogModel = require('../models/blog_model')

const BlogController = {

    // http://localhost:5000/api/blog/makeblog
    Make_Blogs : async (req,res,next)=>{
        try{
            const {id,title,image,content} = req.body;
            const model = BlogModel({id:id});
            console.log(model)
            await model.save();
            res.json({status:"ok",data:model});
        }
        catch(e){
            // res.json({status:false})
            throw e; 
       }
    },

    // http://localhost:5000/api/blog/makelike
    makeLike : async (req,res,next)=>{
        try{
            const {id , user_like_id}=req.body;
            const x = await BlogModel.findOne({_id:id});
            const out = x.likes.filter( (value)=> {return (value==user_like_id) ;} ) ;
            console.log(out);
            if(out.length == 0){
                x.likes.push(user_like_id);
            }
            else {
                const t = x.likes.filter( (value)=>{return value!=user_like_id } );
                x.likes = t;
            }
            const y = await BlogModel.findOneAndUpdate(
                {_id : id},
                { $set:{likes: x.likes}},
                {new :true}
            )
            res.json({staus:"ok",data:y});
        }
        catch(e){
            throw e;
        }
    },

    // http://localhost:5000/api/blog/makecomment
    makeComment : async function(req, res, next){
        try{ 
            const {id , user_comment_id ,data} = req.body;

            // for findOneANdUpdate we can do { set , pull ,push } in 
            // in set we can only set value to value cannot remove or push value in list
            // but in pull we can take out comment form list and in push push comment in list
            
            const p = await BlogModel.findOneAndUpdate(
                { _id : id },
                { $push:{ Comment:{ cid:user_comment_id , data:data } } },
                { new :true}
            );
            
            res.json({status:"ok" , data:p});
        }
        catch(e){
            throw e;
        }
    },

    getbyuserid : async(req, res ,next)=>{
        try{
            const userid = req.body;
            const model = await BlogModel.find({id:userid}).sort({CreatedOn:1})
            res.json({status:"ok",data:model});
        }   
        catch(e){
            throw e
        } 
    },

    // http://localhost:5000/api/blog/
    showBlogs : async (req,res,next)=>{
        try{
            const blogs = await BlogModel.find().sort({CreatedOn:1});
            res.json({status:"ok",data:blogs});
        }
        catch(e){
            throw e;
        }
    }
}

module.exports = BlogController;