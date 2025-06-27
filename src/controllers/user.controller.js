import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"; // ye cloudinary se upload karne ke liye hai
import {User} from "../models/user.model.js";      // ye user hai jo directdata base se connect kar sakta hai ki ye mongoosek through bnaya gya hai monngoose ne ye model create kar rakha hai  isliye
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {

// get user details from frontend hm chahe to user ke data postman se le sakte hai
// validation bhi kar sakte hai ki name email password sab sahi hai ya nahi kahi emmty to nhi hai
// checking if user already exists in database:app username se ya email se check kar sakte ho ki kahi wo phle se login to nbhi hai
// check for images,check for avatar mtlb ab check karna hai ki meri files hai ya nhi
//agar files hai to unhe upload karna hai cloudinary pr,avatar
// ab hme clodinary me check krna hai ki avatar hai ya nhiq ki baaki dusra diya ya nhi hme nhi mtlb hai to avatar ko check krna zaruri hai ki user ne phle diya to hmare multer ne use upload kiya ki nhi sahi se
// ab hme user object create karna hoga q ki mongodb me jb v data bhejunga to no sequel databses hai to isme obvious si baat hai object hi jyada tar bnaye jaate hai aaur upload kiye jaate hai to wo object bnane k baad mai krunga creation call :create entry call in db mujhe dbcall v padhene honge to ye kuch nhi hai bs .create hota hai
//    remove password and refresh tooken field from response:-jb user create ho gya to  usme obvious si baat hai ki aapne email diya haipassword diya hai to jojitna v  response aapko milta hai to jitna v create hota hai as it is response me mil jaat hai password v mil jaayega halaki password encrypted hai hmara jise maine already takecare kar liya hai but wo encrypted password maine user ko nhi dena haiq ki jo response aaya hai use frontebnd waale ko v to bhejna hai n saamne
// check for user creation:ye jo response hai use check kro ki aapne fild wagera hata diya check kro ki response aay hai ya nhi agr response nhi ayya hai to user create hua hai ki nhi successfully
// return response:agar user create  ho gya to response return kar do kaise properly return krenge nhi hai to error bhej do
const { username, fullname, email, password } = req.body
console.log("email", email);
// if(fullname === ""){
// throw new ApiError(400, "Fullname is required");
// } ya to ek krke check kr sakte ho q ki abhi tm begineers ho jaise thode ho jaaoge bare to dussre taroke se check krenge sabko ek hi baar me

// chalo ab hm expert ho gye hai
if([fullname, username, email, password].some(field => field?.trim()=== "")){    //.some ka mtlb hai ki ek function accept up  to three elements
    throw new ApiError(400, "All fields are required"); 
 }


//ab ye user hi aapke behalf pe call karega mongodb ko jitni baar aapko chahiye utni baar call kar sakta hai

 const existedUser =  await User.findOne({
    $or:[{ username },{ email }]
})
if(existedUser){
    throw new ApiError(409, "Username or email already exists");
}
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverimage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400, "Avatar or cover image is required");
}

 const avatar=await uploadOnCloudinary(avatarLocalPath);
 const coverImage=await uploadOnCloudinary(coverImageLocalPath);
if(!avatar){
    throw new ApiError(400, "Avatar upload IS REQUIRED");
}


// ab object bnao database me entry krwa do
const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,   
    username:username.toLowerCase()
})


const createdUser=awaitUser.findById(user._id).select("-password -refreshToken"); // ye password aur refresh token ko hata dega response se
// check v kar liya user creation ka
if(!createdUser){
    throw new ApiError(400, "some thing went wrong while registering the user");
}
})

// sab kuch ho gya hai ab response bhej do
return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
)

// res.status(400).json({
    //     message: "i am vidya sagar",
    // });
export {registerUser}