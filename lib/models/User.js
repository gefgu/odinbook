const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  photoURL: { type: String, required: true },
  friends: { type: [Schema.Types.ObjectId], ref: "User", required: false },
  friendshipRequests: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: false,
  },
  facebookId: { type: String, required: false, default: null },
});

module.exports = mongoose.model("User", UserSchema);
