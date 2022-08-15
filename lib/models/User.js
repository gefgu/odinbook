import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true, default: "https://picsum.photos/id/1074/200/300" },
  email: { type: String, default: null },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: false,
    default: [],
  },
  friendshipRequests: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: false,
    default: [],
  },
  facebookId: { type: String, required: false, default: null },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
