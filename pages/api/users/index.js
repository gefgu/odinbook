import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const users = await db.collection("users").find({}).toArray();

  res.status(200).json({ users });
}
