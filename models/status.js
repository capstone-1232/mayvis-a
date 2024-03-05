import mongoose, { Schema } from "mongoose";

const AutoIncrementModelID = require('./increment');

const StatusSchema = new Schema({
    status_id: { type: Number, unique: true },
    status_name: { type: String, required: true }
});

StatusSchema.pre('save', function (next) {
    AutoIncrementModelID('statusId', this, next);
});

const Status = mongoose.model('Status', StatusSchema);

module.exports = Status;