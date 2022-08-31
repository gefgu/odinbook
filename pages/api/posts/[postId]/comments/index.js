import { getToken } from "next-auth/jwt";
import connectDB from "../../../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });

  const userId = token?.uid || token.sub;
  const { postId } = req.query;

  try {
    if (req.method === "GET") {
      const comments = await req.models.Comment.find({ post: postId }).populate(
        "author"
      );

      return res.status(200).json({ comments });
    } else if (req.method === "POST") {
      const comment = new req.models.Comment({
        content: req.body.content,
        author: userId,
        post: postId,
      });

      await comment.save();

      return res.status(200).json({ comment });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
