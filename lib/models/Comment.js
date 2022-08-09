import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
