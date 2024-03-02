import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    Product_Name: { type: String, required: true },
    Description: { type: String },
    Price: { type: mongoose.Types.Decimal128, required: true },
    Recurring: { type: Boolean, default: false },
    Archived: { type: Boolean, default: false },
    Notes: { type: String },
    Quantity: { type: Number },
    Category_ID: { type: Schema.Types.ObjectId, ref: 'Category' },
    Created_By: { type: Schema.Types.ObjectId, ref: 'User' },
    Updated_By: { type: Schema.Types.ObjectId, ref: 'User' }
    }, { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;