import { getToken } from "next-auth/jwt";
import connectDB from "../../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });

  const userId = token.sub;
  const { postId } = req.query;

  try {
    if (req.method === "GET") {
      const comments = await req.models.Comment.find({ post: postId });

      return res.status(200).json({ comments });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
