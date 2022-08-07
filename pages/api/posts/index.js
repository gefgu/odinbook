import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import clientPromise from "../../../lib/mongodb";

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

  res.status(200).json({ posts });
}
