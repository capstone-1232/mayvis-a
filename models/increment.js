import mongoose, { Schema } from "mongoose";

const Counter = require('./counter');

const AutoIncrementModelID = function (modelName, doc, next) {
    const Counter = mongoose.model('Counter');
    Counter.findByIdAndUpdate(
        { _id: modelName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
        function (error, counterDoc) {
            if (error) return next(error);
            doc[modelName] = counterDoc.seq;
            next();
        }
    );
};

module.exports = AutoIncrementModelID;
