import mongoose, { Schema } from "mongoose";

const ContactPersonSchema = new Schema({
    Contact_Firstname: { type: String, required: true },
    Contact_Lastname: { type: String, required: true },
    Contact_Department: { type: String, required: true },
    Contact_Role: { type: String, required: true },
    Client_ID: { type: Schema.Types.ObjectId, ref: 'Client' },
    }, { timestamps: true }
);

const ContactPerson = mongoose.model('ContactPerson', ContactPersonSchema);

module.exports = ContactPerson;