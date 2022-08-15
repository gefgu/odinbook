import { getToken } from "next-auth/jwt";
import connectDB from "../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.uid || token.sub;

  try {
    const user = await req.models.User.findById(userId);
    if (req.method === "GET") {
      const userFriends = user.friends;

      const usersToCheck = userFriends.concat(userId);

      const posts = await req.models.Post.find({
        author: usersToCheck,
      })
        .populate("author")
        .sort("-creationDate");

      return res.status(200).json({ posts });
    } else if (req.method === "POST") {
      const post = new req.models.Post({
        content: req.body.content,
        author: user,
      });

      await post.save();
      return res.status(200).json({ post });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
