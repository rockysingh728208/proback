import mongoose,{Schema} from "mongoose";   
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    { 
videoFile:{
    type:string, // cloudinary se image ya videos ka url string me laayenge third party ka use karenge simple samajh jaaiye
    required:true
},
thumbnail:{
    type:String, // cloudinary se image ya videos ka url string me laayenge third party ka use karenge simple samajh jaaiye
    required:true
},
title:{
    type:String, 
    required:true
},
description:{
    type:String,
},
duration:{
    type:Number,
    required:true
},
views:{
    type:Number,
    default:0
},
isPublished:{
    type:Boolean,
    default:true
      },
owner:{
    type:Schema.Types.ObjectId,
    ref:"User", // User model se reference
    required:true
},

},{timestamps:true})
export const Video = mongoose.model("Video", videoSchema);