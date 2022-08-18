import connectDB from "../../../../middleware/mongodb";

async function handler(req, res) {
  const { userId } = req.query;

  try {
    if (req.method === "GET") {
      const posts = await req.models.Post.find({ author: userId })
        .populate("author")
        .sort("-creationDate");

      return res.status(200).json({ posts });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
