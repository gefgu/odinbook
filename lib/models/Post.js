const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  likes: { type: [Schema.Types.ObjectId], ref: "User", required: false },
});

const createPost = (content, author) => {
  return {
    content,
    author: author,
    creationDate: Date.now(),
    likes: [],
  };
};

module.exports = mongoose.model("Post", PostSchema);
