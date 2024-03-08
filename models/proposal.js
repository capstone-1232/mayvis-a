import mongoose, { Schema } from "mongoose";

const ProposalSchema = new Schema({
    proposal_title: { type: String, required: true },
    message: { type: String, required: true },
    attachment: { type: String },
    status: { type: Schema.Types.ObjectId, ref: 'Status' },
    suggestions: { type: String },
    is_archived: { type: Boolean, default: false },
    proposal_total: { type: mongoose.Types.Decimal128 },
    recurring_total: { type: mongoose.Types.Decimal128 },
    notes: { type: mongoose.Types.Decimal128 },
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    proposed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' }
    }, { timestamps: true }
);

const Proposal = mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;
