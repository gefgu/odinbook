import connectDB from "../../../middleware/mongodb";

async function handler(req, res) {

  try {
    if (req.method === "GET") {
      const users = await req.models.User.find({});

      return res.status(200).json({ users });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
