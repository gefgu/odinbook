import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  likes: { type: [Schema.Types.ObjectId], ref: "User", required: false },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
