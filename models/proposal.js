import mongoose, { Schema } from "mongoose";

const AutoIncrementModelID = require('./increment');

const ProposalSchema = new Schema({
    Proposal_ID: { type: Number, required: true, unique: true },
    Proposal_Title: { type: String, required: true },
    Proposed_Date: { type: Date, required: true },
    Message: { type: String, required: true },
    Attachment: { type: String },
    Suggestions: { type: String },
    Project_Total: { type: mongoose.Types.Decimal128 },
    Recurring_Total: { type: mongoose.Types.Decimal128 },
    Proposal_Total: { type: mongoose.Types.Decimal128 },
    Status: { type: Schema.Types.ObjectId, ref: 'Status' },
    Client_ID: { type: Schema.Types.ObjectId, ref: 'Client' },
    Product_ID: { type: Schema.Types.ObjectId, ref: 'Product' },
    Proposed_By: { type: Schema.Types.ObjectId, ref: 'User' },
    Category_ID: { type: Schema.Types.ObjectId, ref: 'Category' }
});

ProposalSchema.pre('save', function (next) {
    AutoIncrementModelID('proposalId', this, next);
});

const Proposal = mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;
