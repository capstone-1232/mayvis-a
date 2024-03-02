import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    Category_Name: { type: String, required: true },
    Description: { type: String },
    Archived: { type: Boolean, default: false },
    Notes: { type: String },
    Product_ID: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    Created_By: { type: Schema.Types.ObjectId, ref: 'User' },
    Updated_By: { type: Schema.Types.ObjectId, ref: 'User' },
    }, { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
