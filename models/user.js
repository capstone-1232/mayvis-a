import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    email_address: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    letter_template: { type: String },
    email_template: { type: String },
    }, { timestamps: true }
);

const User = mongoose.models.user ||  mongoose.model('user', UserSchema);

module.exports = User;