const mongoose = require("mongoose")


require("dotenv").config();
const db_url = process.env.db_url

mongoose.connect(db_url)

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
})

const UrlSchema = new mongoose.Schema({
    url: String,
    short: String,
    owner: { type: String, ref: 'User' },
    clicks: Number
})

const User = mongoose.model('User', UserSchema);
const Url = mongoose.model('Url', UrlSchema)

module.exports = { User, Url }


