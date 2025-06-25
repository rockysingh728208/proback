// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";


// first approach

// import express from "express";  
// const app = express();
// (async()=>{
// try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    

//     app.on('error', (error) => {
//         console.error('Express server error:', error);
//         throw error;
//     })
//     app.listen(process.env.PORT, () => {
//         console.log(`app is listening on port ${process.env.PORT}`);
//     })
// } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw err
// }
// })()




// second approach

import connectDb from "./db/index.js";
// agar mai ye likhta hoo to package json me add karna hoga "dev":"nodemon ke baad --require dotenv/config  "
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });

connectDb()
.then(() => {
    app.listen(process.env.PORT||8000, () => {
        console.log(`App is listening on port ${process.env.PORT }`);
    })
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    throw error;
}
)
