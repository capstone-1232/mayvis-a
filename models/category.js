import mongoose, { Schema } from "mongoose";

const AutoIncrementModelID = require('./increment');

const CategorySchema = new Schema({
    Category_ID: { type: Number, required: true, unique: true },
    Category_Name: { type: String, required: true },
    Description: { type: String },
    Archived: { type: Boolean, default: false },
    Notes: { type: String },
    Product_ID: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    Created_On: { type: Date, default: Date.now },
    Created_By: { type: Schema.Types.ObjectId, ref: 'User' },
    Updated_On: { type: Date },
    Updated_By: { type: Schema.Types.ObjectId, ref: 'User' }
});

CategorySchema.pre('save', function (next) {
    AutoIncrementModelID('categoryId', this, next);
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
