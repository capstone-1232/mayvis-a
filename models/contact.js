import { Email } from "@mui/icons-material";
import mongoose, { Schema } from "mongoose";

const ContactPersonSchema = new Schema({
    contact_firstname: { type: String, required: true },
    contact_lastname: { type: String, required: true },
    email: { type: String, required: true },
    contact_no: { type: Number, required: true },
    is_active: { type: Boolean, default: false },
    is_primary: { type: Boolean, default: false },
    contact_department: { type: String, required: true },
    contact_role: { type: String, required: true },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    }, { timestamps: true }
);

const ContactPerson = mongoose.models.contacts || mongoose.model('contacts', ContactPersonSchema);

module.exports = ContactPerson;