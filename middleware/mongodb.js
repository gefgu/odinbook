import mongoose from "mongoose";
import Post from "../lib/models/Post";
import Comment from "../lib/models/Comment";
import User from "../lib/models/User";

const connectDB = (handler) => async (req, res) => {
  req.models = { Post, Comment, User };
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  return handler(req, res);
};

export default connectDB;
