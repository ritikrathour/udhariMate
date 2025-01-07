const Cloudinary = require("cloudinary").v2;
const fs = require("fs");
const UploadOnCloudinary = async (localFilePath) => {
  Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    if (!localFilePath) return null;
    const response = await Cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    fs.unlinkSync(localFilePath)
    return response.url
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }
}
module.exports = UploadOnCloudinary;