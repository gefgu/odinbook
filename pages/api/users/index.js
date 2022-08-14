import connectDB from "../../../middleware/mongodb";

async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const users = await req.models.User.find({});

      return res.status(200).json({ users });
    } else if (req.method === "POST") {
      const email = req.body.email;

      const foundUser = await req.models.User.find({
        email,
      }).exec();

      if (foundUser.length === 1) {
        return res.status(200).json({ user: foundUser[0] });
      } else if (foundUser.length === 0) {
        const user = new req.models.User({
          name: req.body.name,
          email,
        });
        await user.save();
        return res.status(200).json({ user });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
