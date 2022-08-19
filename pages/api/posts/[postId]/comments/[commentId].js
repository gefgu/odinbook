import { getToken } from "next-auth/jwt";
import connectDB from "../../../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.uid || token.sub;
  const { commentId } = req.query;

  try {
    if (req.method === "DELETE") {
      const comment = await req.models.Comment.findById(commentId).exec();

      if (comment.author.toString() === userId.toString()) {
        await comment.remove().exec();
        return res.status(200).send("OK");
      } else {
        return res.status(401).send("Unauthorized");
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
