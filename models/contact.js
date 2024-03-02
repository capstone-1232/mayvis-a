import mongoose, { Schema } from "mongoose";

const AutoIncrementModelID = require('./increment');

const ContactPersonSchema = new Schema({
    Contact_ID: { type: Number, required: true, unique: true },
    Contact_Firstname: { type: String, required: true },
    Contact_Lastname: { type: String, required: true },
    Contact_Department: { type: String, required: true },
    Contact_Role: { type: String, required: true },
    Client_ID: { type: Schema.Types.ObjectId, ref: 'Client' }
});

ContactPersonSchema.pre('save', function (next) {
    AutoIncrementModelID('contactId', this, next);
});

const ContactPerson = mongoose.model('ContactPerson', ContactPersonSchema);

module.exports = ContactPerson;