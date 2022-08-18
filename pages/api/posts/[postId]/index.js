import { getToken } from "next-auth/jwt";
import connectDB from "../../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.uid || token.sub;
  const { postId } = req.query;

  try {
    if (req.method === "DELETE") {
      const postData = await req.models.Post.findById(postId).exec();

      if (postData.author.toString() === userId.toString()) {
        await req.models.Comment.deleteMany({ post: postId }).exec();
        await postData.remove().exec();
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
