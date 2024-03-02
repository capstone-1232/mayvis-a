import mongoose, { Schema } from "mongoose";

const AutoIncrementModelID = require('./increment');

const ProductSchema = new Schema({
    Product_ID: { type: Number, required: true, unique: true },
    Product_Name: { type: String, required: true },
    Description: { type: String },
    Price: { type: mongoose.Types.Decimal128, required: true },
    Recurring: { type: Boolean, default: false },
    Archived: { type: Boolean, default: false },
    Notes: { type: String },
    Quantity: { type: Number },
    Category_ID: { type: Schema.Types.ObjectId, ref: 'Category' },
    Created_On: { type: Date, default: Date.now },
    Created_By: { type: Schema.Types.ObjectId, ref: 'User' },
    Updated_On: { type: Date },
    Updated_By: { type: Schema.Types.ObjectId, ref: 'User' }
});

ProductSchema.pre('save', function (next) {
    AutoIncrementModelID('productId', this, next);
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;