import mongoose from "mongoose";

const AutoIncrementModelID = async function (modelName, doc, next) {
  try {
    const Counter = mongoose.model('Counter');
    const counterDoc = await Counter.findByIdAndUpdate(
      { _id: modelName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc[modelName] = counterDoc.seq;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = AutoIncrementModelID
