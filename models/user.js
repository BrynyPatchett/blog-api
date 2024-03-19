const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 5, max: 18 },
    password: { type: String, requried: true, minLength: 3 },
    permissions: {
        type: String,
        required: true,
        enum: ["User", "Blogger", "Admin"],
        default: "User"
    }
})

module.exports = mongoose.Model("User", UserSchema)