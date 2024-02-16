const {Schema , model} = require('mongoose')
const User = require('./user_models')

const comment = new Schema({
    cid : {type:Schema.Types.ObjectId , ref:'User',require:true},
    data : {type:String, default:""}
})

const BlogSchema = new Schema({
    id:{type : Schema.Types.ObjectId , ref:'User', require:true},
    // image:{},
    data:{type:String , default:""},
    likes:{type:Array , default:[]},
    Comment:{type:[comment] , default:[]},
    UpdatedOn: {type:Date},
    CreatedOn:{type :Date}
});

BlogSchema.pre("save",
    (next)=>{
        this.CreatedOn = new Date(),
        this.UpdatedOn = new Date(),
        next();
    }
)

const BlogModel = model('BLOGS', BlogSchema);
module.exports= BlogModel