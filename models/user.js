import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    email_address: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email_message: { type: String, default: '' },
    letter_message: { type: String, default: '' },
    profile_image: { type: String },
    }, { timestamps: true }
);

const User = mongoose.models.user ||  mongoose.model('user', UserSchema);

module.exports = User;