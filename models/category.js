import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    category_name: { type: String, required: true },
    description: { type: String },
    is_archived: { type: Boolean, default: false },
    notes: { type: String },
    product_id: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
    }, { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

module.exports = Category;
