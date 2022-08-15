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
  const { ...userListingData } = useSWR("/api/users", fetcher);
  const { ...friendshipRequestsData } = useSWR(
    "/api/users/friendshipRequests",
    fetcher
  );

  if (userListingData.error || friendshipRequestsData.error)
    return <div>Failed to load</div>;
  if (!userListingData.data || !friendshipRequestsData.data)
    return <div>Loading...</div>;

  const users = userListingData.data.users;

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
  };

  return (
    userInfo && (
      <div className={styles.container}>
        {users
          .filter((user) => user._id !== userInfo.id)
          .map((user) => (
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
          ))}
      </div>
    )
  );
}
