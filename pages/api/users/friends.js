import { getToken } from "next-auth/jwt";
import connectDB from "../../../middleware/mongodb";

async function handler(req, res) {
  const token = await getToken({ req });
  const userId = token?.uid || token?.sub;
  try {
    if (req.method === "GET") {
      const userData = await req.models.User.findById(userId).exec();

      return res.status(200).json({
        friends: userData.friends,
      });
    } else if (req.method === "POST") {
      const loggedUser = await req.models.User.findById(userId).exec();
      const userToBeFriend = await req.models.User.findById(
        req.body.userToBeFriend
      ).exec();

      const index = loggedUser.friendshipRequests.indexOf(
        req.body.userToBeFriend
      );
      if (index > -1) {
        loggedUser.friendshipRequests.splice(index, 1);
      }
      loggedUser.friends = loggedUser.friends.concat(userToBeFriend);
      userToBeFriend.friends = userToBeFriend.friends.concat(loggedUser);

      await loggedUser.save();
      await userToBeFriend.save();

      return res.status(200).json({ message: "Ok" });
    } else if (req.method === "PUT") {
      const loggedUser = await req.models.User.findById(userId).exec();
      const friendUser = await req.models.User.findById(
        req.body.friendUser
      ).exec();

      let index = loggedUser.friends.indexOf(req.body.friendUser);
      if (index > -1) {
        loggedUser.friends.splice(index, 1);
      }
      index = friendUser.friends.indexOf(userId);
      if (index > -1) {
        friendUser.friends.splice(index, 1);
      }

      await loggedUser.save();
      await friendUser.save();

      return res.status(200).json({ message: "Ok" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(500).send("Something is wrong...");
}

export default connectDB(handler);
