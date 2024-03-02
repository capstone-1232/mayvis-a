import mongoose, { Schema } from "mongoose";

const AutoIncrementModelID = require('./increment');

const ClientSchema = new Schema({
    Client_ID: { type: Number, unique: true },
    Client_Name: { type: String, required: true }
});

ClientSchema.pre('save', function (next) {
    AutoIncrementModelID('clientId', this, next);
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;