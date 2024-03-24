import mongoose, { Schema } from "mongoose";

const ProposalProductSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    price: { type: mongoose.Types.Decimal128, required: true },
    quantity: Number,
    is_recurring: Boolean,
    recurring_option: String,
    notes: String,
    category_id:  { type: Schema.Types.ObjectId, ref: 'Category' }
});

const ProposalSchema = new Schema({
    proposal_title: { type: String, required: true },
    message: { type: String, required: true },
    attachment: { type: String },
    status: { type: String },
    suggestions: { type: String },
    is_archived: { type: Boolean, default: false },
    proposal_total: { type: mongoose.Types.Decimal128 },
    recurring_total: { type: mongoose.Types.Decimal128 },
    project_total: { type: mongoose.Types.Decimal128 },
    notes: { type: mongoose.Types.Decimal128 },
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    products: [ProposalProductSchema],
    proposed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    }, { timestamps: true }
);

const Proposal = mongoose.models.Proposal || mongoose.model('Proposal', ProposalSchema);

module.exports = Proposal;
