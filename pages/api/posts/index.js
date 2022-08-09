import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import Post from "../../../lib/models/Post";
import clientPromise from "../../../lib/mongodb";
import connectDB from "../../../middleware/mongodb";

async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const token = await getToken({ req });

  const userId = token.sub;

  const user = (
    await db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .toArray()
  )[0];

  if (req.method === "GET") {
    const userFriends = user.friends;

    const usersToCheck = userFriends
      .concat(userId)
      .map((data) => new ObjectId(data));

    const posts = await db
      .collection("posts")
      .find({
        author: usersToCheck,
      })
      .toArray();

    return res.status(200).json({ posts });
  } else if (req.method === "POST") {
    try {
      const post = new Post({ content: req.body.content, author: user });

      await post.save();
      return res.status(200).json({ post });
    } catch (e) {
      console.error(e);
    }
  }

  return res.status(500).json("ERROR");
}

export default connectDB(handler);
