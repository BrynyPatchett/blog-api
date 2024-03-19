const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { DateTime } = require("luxon")
const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", require: true },
    content: { type: String, minLength: 1, required: true },
    date: { type: Date, default: Date.now }
})

CommentSchema.virtual("formatted-date").get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("Comment", CommentSchema)