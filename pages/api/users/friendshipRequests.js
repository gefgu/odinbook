import { getToken } from "next-auth/jwt";
import connectDB from "../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token.uid || token.sub;
  try {
    if (req.method === "GET") {
      const userData = await req.models.User.findById(userId).exec();

      return res
        .status(200)
        .json({ friendshipRequests: userData.friendshipRequests });
    } else if (req.method === "POST") {
      const userToRequest = await req.models.User.findById(
        req.body.userToRequest
      );

      userToRequest.friendshipRequests =
        userToRequest.friendshipRequests.concat(userId);

      await userToRequest.save();

      return res.status(200).json({ message: "Ok" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
