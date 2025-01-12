const Cloudinary = require("cloudinary").v2; 
const UploadOnCloudinary = async (localFilePath) => {
  Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    if (!localFilePath) return null;
   const uploadedImage = await new Promise((resolve, reject) => {    
      const uploadStream = Cloudinary.uploader.upload_stream(
        { folder: 'user_images' },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      uploadStream.end(localFilePath);
    });
    return uploadedImage.secure_url;
  } catch (error) { 
    return null
  }
}
module.exports = UploadOnCloudinary;
