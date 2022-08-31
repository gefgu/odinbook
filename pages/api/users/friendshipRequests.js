import { getToken } from "next-auth/jwt";
import connectDB from "../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token?.uid || token.sub;
  try {
    if (req.method === "GET") {
      const userData = await req.models.User.findById(userId).exec();
      let requestsOfFriendship = await req.models.User.find({
        friendshipRequests: userId,
      }).exec();

      requestsOfFriendship = requestsOfFriendship.map((user) => user._id);

      return res.status(200).json({
        receivedRequests: userData.friendshipRequests,
        givenRequests: requestsOfFriendship,
      });
    } else if (req.method === "POST") {
      const userToRequest = await req.models.User.findById(
        req.body.userToRequest
      );

      userToRequest.friendshipRequests =
        userToRequest.friendshipRequests.concat(userId);

      await userToRequest.save();

      return res.status(200).json({ message: "Ok" });
    } else if (req.method === "PUT") {
      const userToRequest = await req.models.User.findById(
        req.body.userToRequest
      );

      const index = userToRequest.friendshipRequests.indexOf(userId);
      if (index > -1) {
        userToRequest.friendshipRequests.splice(index, 1);
      }

      await userToRequest.save();

      return res.status(200).json({ message: "Ok" });
    } else if (req.method === "DELETE") {
      const loggedUser = await req.models.User.findById(userId);

      const index = loggedUser.friendshipRequests.indexOf(
        req.body.userToReject
      );
      if (index > -1) {
        loggedUser.friendshipRequests.splice(index, 1);
      }

      await loggedUser.save();

      return res.status(200).json({ message: "Ok" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
