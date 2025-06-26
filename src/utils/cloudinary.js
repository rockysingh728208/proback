import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs";

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your Cloud Name
        api_key: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API Key
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) {
                return null;
            }
               const response = await cloudinary.uploader.upload(localFilePath,{
                    resource_type:"auto"
                })   
                // file has been uploaded successfully
                console.log("File uploaded successfully",response.url);
                return response;
        } catch(error) {
            fs.unlinkSync(localFilePath); // Delete the file if upload fails
        }
    }
    export default uploadOnCloudinary;
