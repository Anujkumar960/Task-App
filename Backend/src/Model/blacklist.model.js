const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true,unique:true }
}, { versionKey: false });

const BlacklistModel = mongoose.model('Blacklist', blacklistSchema);

module.exports = { BlacklistModel };
