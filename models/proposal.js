import mongoose, { Schema } from "mongoose";

const ProposalSchema = new Schema({
    proposal_title: { type: String, required: true },
    message: { type: String, required: true },
    attachment: { type: String },
    suggestions: { type: String },
    is_archived: { type: Boolean, default: false },
    project_total: { type: mongoose.Types.Decimal128 },
    recurring_total: { type: mongoose.Types.Decimal128 },
    proposal_total: { type: mongoose.Types.Decimal128 },
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: Schema.Types.ObjectId, ref: 'Status' },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    product_id: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    proposed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' }
    }, { timestamps: true }
);

const Proposal = mongoose.models.Proposal || mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;
