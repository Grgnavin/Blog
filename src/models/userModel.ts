import mongoose, { Schema, Document } from "mongoose";
import { Blog } from "./blogModel";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    blogs: Blog[];
};

export interface IUserDocument extends User, Document {
    createdAt: Date,
    updatedAt: Date,
}

const UserSchema: Schema<IUserDocument> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address' ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
}, 
{
    timestamps: true
})  

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;