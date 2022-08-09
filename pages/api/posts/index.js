import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import clientPromise from "../../../lib/mongodb";
import { createPost } from "../../../lib/mongodbHelpers";

export default async function handler(req, res) {
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
    const post = createPost(req.body.content, user);

    const result = await db.collection("posts").insertOne(post);

    console.log(result);

    return res.status(200).redirect(req.headers.referer);
  }

  return res.status(500).json("ERROR");
}
