import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema({
    client_name: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    description: { type: String },
    contact_id: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
    }, { timestamps: true }
);

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);

module.exports = Client;