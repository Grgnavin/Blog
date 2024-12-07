// Adjusted uploadImageOnCloudinary to work with a File object
import cloudinary from './cloudinary';

const uploadImageOnCloudinary = async (file: File) => {
    const base64Image = Buffer.from(await file.arrayBuffer()).toString("base64");
    const dataUrl = `data:${file.type};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUrl);
    return uploadResponse.secure_url;
};

export default uploadImageOnCloudinary;

