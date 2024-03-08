import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    email_address: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    }, { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;