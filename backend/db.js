const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

try{
	mongoose.connect(dotenv.parsed.url)
}
catch (e){
	console.log(e.message)
}

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


