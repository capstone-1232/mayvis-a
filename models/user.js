import mongoose, { Schema } from "mongoose";

const AutoIncrementModelID = require('./increment');

const UserSchema = new Schema({
    User_ID: { type: Number, index: { unique: true } },
    Email_Address: { type: String, required: true },
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
    AutoIncrementModelID('userId', this, next);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;