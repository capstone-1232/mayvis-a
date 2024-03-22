import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    product_name: { type: String, required: true },
    description: { type: String },
    price: { type: mongoose.Types.Decimal128, required: true },
    is_recurring: { type: Boolean, default: false },
    is_archived: { type: Boolean, default: false },
    recurring_option: { type: String },
    notes: { type: String },
    quantity: { type: Number },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
    category_id:  { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

module.exports = Product;