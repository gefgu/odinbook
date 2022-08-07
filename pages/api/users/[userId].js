import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const { userId } = req.query;


  const user = await db.collection("users").find({ _id: new ObjectId(userId) }).toArray()[0];

  res.status(200).json({ user });
}
