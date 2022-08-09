const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  likes: { type: [Schema.Types.ObjectId], ref: "User", required: false },
});

module.exports = mongoose.model("Post", PostSchema);
