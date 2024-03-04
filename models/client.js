import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema({
    client_name: { type: String, required: true },
    }, { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);

module.exports = Client;