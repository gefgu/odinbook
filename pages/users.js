import Image from "next/image";
import useSWR from "swr";
import utils from "../styles/utils.module.css";
import styles from "../styles/UserListing.module.css";
import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Dashboard() {
  const { status, ...sessionData } = useSession({
    required: true,
  });
  const userInfo = sessionData?.data?.user;
  const { ...friendshipRequestsData } = useSWR(
    "/api/users/friendshipRequests",
    fetcher
  );
  const { ...userListingData } = useSWR("/api/users", fetcher);

  if (userListingData.error || friendshipRequestsData.error)
    return <div>Failed to load</div>;
  if (!userListingData.data || !friendshipRequestsData.data)
    return <div>Loading...</div>;

  const receivedRequests = friendshipRequestsData.data.receivedRequests;
  const givenRequests = friendshipRequestsData.data.givenRequests;

  const makeFriendshipRequest = async (userId) => {
    const data = { userToRequest: userId };

    const JSONdata = JSON.stringify(data);

    const endpoint = `/api/users/friendshipRequests`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    friendshipRequestsData.mutate();
  };

  const removeFriendshipRequest = async (userId) => {
    const data = { userToRequest: userId };

    const JSONdata = JSON.stringify(data);

    const endpoint = `/api/users/friendshipRequests`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    friendshipRequestsData.mutate();
  };

  const acceptFriendshipRequest = async (userId) => {
    const data = { userToBeFriend: userId };

    const JSONdata = JSON.stringify(data);

    const endpoint = `/api/users/friends`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    friendshipRequestsData.mutate();
  };

  const mapUserListing = (user) => {
    const userId = user._id;
    if (receivedRequests.includes(userId)) {
      return (
        <div key={user._id} className={styles.userBox}>
          <Image
            src={user.image}
            className={utils.roundedImage}
            alt="Profile"
            layout="fixed"
            width={75}
            height={75}
          />
          <p>{user.name}</p>
          <button onClick={() => acceptFriendshipRequest(user._id)}>
            Accept Friendship Request
          </button>
        </div>
      );
    } else if (givenRequests.includes(userId)) {
      return (
        <div key={user._id} className={styles.userBox}>
          <Image
            src={user.image}
            className={utils.roundedImage}
            alt="Profile"
            layout="fixed"
            width={75}
            height={75}
          />
          <p>{user.name}</p>
          <button onClick={() => removeFriendshipRequest(user._id)}>
            Pending Friendship Request...
          </button>
        </div>
      );
    } else {
      return (
        <div key={user._id} className={styles.userBox}>
          <Image
            src={user.image}
            className={utils.roundedImage}
            alt="Profile"
            layout="fixed"
            width={75}
            height={75}
          />
          <p>{user.name}</p>
          <button onClick={() => makeFriendshipRequest(user._id)}>
            Request Friendship
          </button>
        </div>
      );
    }
  };

  if (userInfo) {
    const users = userListingData.data?.users.filter(
      (user) => user._id !== userInfo.id
    );

    return (
      userInfo && (
        <div className={styles.container}>
          {users.map((user) => mapUserListing(user))}
        </div>
      )
    );
  }

  return <div>Failed to load</div>;
}
