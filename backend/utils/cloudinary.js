import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "your_folder_name",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const uploadImage = () => {};
const uploadPdf = () => {};
const uploadVideo = () => {};

module.exports = { storage, uploadImage, uploadPdf, uploadVideo };
