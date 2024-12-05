import mongoose, { Schema, Document } from "mongoose";

// Define the Blog interface for type reference
export interface Blog extends Document {
    file?: File;
    title: string;
    content: string;
    author: mongoose.Schema.Types.ObjectId; // This references the User model
};


const BlogSchema: Schema<Blog> = new Schema({
    file: {
        type: File
    },
    title: {
        type: String,
        required: [true, "Blog title is required"],
    },
    content: {
        type: String,
        required: [true, "Blog content is required"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    }
}, 
{
    timestamps: true
});

const BlogModel = (mongoose.models.Blog as mongoose.Model<Blog>) || mongoose.model<Blog>("Blog", BlogSchema);

export default BlogModel;