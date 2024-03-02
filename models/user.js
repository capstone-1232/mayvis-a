import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    Email_Address: { type: String, required: true },
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Password: { type: String, required: true },
    }, { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;