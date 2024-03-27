import mongoose, { Schema } from "mongoose";

const ProposalProductSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    description: { type: String },
    price: { type: Number, required: true },
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
    status: { type: String, required: true },
    suggestions: { type: String },
    is_archived: { type: Boolean, default: false },
    proposal_total: { type: Number },
    recurring_total: { type: Number },
    project_total: { type: Number },
    notes: { type: String },
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    products: [ProposalProductSchema],
    proposed_by: { type: Schema.Types.ObjectId, ref: 'User' },
    proposal_date: { type: Date },
    }, { timestamps: true }
);

const Proposal = mongoose.models.proposals || mongoose.model('proposals', ProposalSchema);

module.exports = Proposal;
