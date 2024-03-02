import mongoose, { Schema } from "mongoose";

const ProposalSchema = new Schema({
    Proposal_Title: { type: String, required: true },
    Message: { type: String, required: true },
    Attachment: { type: String },
    Suggestions: { type: String },
    Project_Total: { type: mongoose.Types.Decimal128 },
    Recurring_Total: { type: mongoose.Types.Decimal128 },
    Proposal_Total: { type: mongoose.Types.Decimal128 },
    Updated_By: { type: Schema.Types.ObjectId, ref: 'User' },
    Status: { type: Schema.Types.ObjectId, ref: 'Status' },
    Client_ID: { type: Schema.Types.ObjectId, ref: 'Client' },
    Product_ID: { type: Schema.Types.ObjectId, ref: 'Product' },
    Proposed_By: { type: Schema.Types.ObjectId, ref: 'User' },
    Category_ID: { type: Schema.Types.ObjectId, ref: 'Category' }
    }, { timestamps: true }
);

const Proposal = mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;
