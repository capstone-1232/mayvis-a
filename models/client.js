import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema({
    client_name: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    description: { type: String },
    contact_id: [{ type: Schema.Types.ObjectId }]
    }, { timestamps: true }
);

const Client = mongoose.models.clients || mongoose.model('clients', ClientSchema);

module.exports = Client;