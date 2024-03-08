import mongoose, { Schema } from "mongoose";

const ContactPersonSchema = new Schema({
    contact_firstname: { type: String, required: true },
    contact_lastname: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    is_primary: { type: Boolean, default: false },
    contact_department: { type: String, required: true },
    contact_role: { type: String, required: true },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    }, { timestamps: true }
);

const ContactPerson = mongoose.models.ContactPerson || mongoose.model('ContactPerson', ContactPersonSchema);

module.exports = ContactPerson;