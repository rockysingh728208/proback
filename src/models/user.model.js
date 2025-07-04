import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
    {
username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    
},
fullname:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    index:true  
},
avatar:{
    type:string,   //cloudinary se image ya videos ka url string me laayenge third party ka use karenge simple samajh jaaiye
    required:true
},
coverImage:{
    type:String
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        Ref:"Video"
    }],
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    refreshToken:{
        type:String 
    }
    },
    {timestamps:true}
    
)
videoSchema.plugin(mongooseAggregatePaginate);
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hashSync(this.password, 10) 
    next()
});
userSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id:this._id,
      
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User", userSchema);