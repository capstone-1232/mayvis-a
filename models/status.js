import mongoose, { Schema } from "mongoose";

const AutoIncrementModelID = require('./increment');

const StatusSchema = new Schema({
    Status_ID: { type: Number, unique: true },
    Status_Name: { type: String, required: true }
});

StatusSchema.pre('save', function (next) {
    AutoIncrementModelID('statusId', this, next);
});

const Status = mongoose.model('Status', StatusSchema);

module.exports = Status;