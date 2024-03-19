const mongoose = require('mongoose')
const Schema = mongoose.Model

const PostSchema = new Schema({
    title: { type: String, required: true, minLength: 1, maxLength: 100 },
    content: { type: String, required: true, minLength: 1 },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    status: { type: String, enum: ["Published", "Unpublished"] },
    date: { type: Date, default: Date.now }
})

PostSchema.virtual("formatted-date").get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("Post", PostSchema)