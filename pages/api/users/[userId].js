import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const { userId } = req.query;

  console.log(userId);

  const users = await db.collection("users").find({ _id: new ObjectId(userId) }).toArray();

  res.status(200).json({ users });
}
