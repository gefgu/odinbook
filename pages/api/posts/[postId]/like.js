import { getToken } from "next-auth/jwt";
import connectDB from "../../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });

  const userId = token.sub;
  const { postId } = req.query;

  try {
    if (req.method === "PUT") {
      const post = await req.models.Post.findById(postId);

      let likes = post.likes;

      const index = likes.indexOf(userId);
      if (index > -1) {
        likes.splice(index, 1);
      } else {
        likes = post.likes.concat(userId);
      }


      await req.models.Post.findOneAndUpdate({ _id: postId }, { likes });
      return res.status(200).json({ likes });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
