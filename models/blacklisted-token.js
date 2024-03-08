import mongoose from 'mongoose';

const BlackListedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Number, required: true }
});

const BlacklistedToken = mongoose.model('BlacklistedToken', BlackListedTokenSchema);

module.exports = BlacklistedToken;
