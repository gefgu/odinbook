import connectDB from "../../../../middleware/mongodb";

async function handler(req, res) {
  const { userId } = req.query;
  try {
    if (req.method === "GET") {
      const user = await req.models.User.findById(userId);

      return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
