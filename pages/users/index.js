import Image from "next/image";
import useSWR from "swr";
import utils from "../../styles/utils.module.css";
import styles from "../../styles/UserListing.module.css";
import { useSession } from "next-auth/react";
import {
  acceptFriendshipRequest,
  makeFriendshipRequest,
  rejectFriendshipRequest,
  removeFriendship,
  removeFriendshipRequest,
} from "../../lib/helpers";
import Link from "next/link";
import Loading from "../../components/Loading";

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
  const { ...friendsData } = useSWR("/api/users/friends", fetcher);

  if (
    userListingData.error ||
    friendshipRequestsData.error ||
    friendsData.error
  )
    return <div>Failed to load</div>;
  if (
    !userListingData.data ||
    !friendshipRequestsData.data ||
    !friendsData.data
  )
    return <Loading />;

  const receivedRequests = friendshipRequestsData.data.receivedRequests;
  const givenRequests = friendshipRequestsData.data.givenRequests;
  const friends = friendsData.data.friends;

  const mapUserListing = (user) => {
    const userId = user._id;
    if (friends.includes(userId)) {
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
          <Link href={`/users/${user._id}`}>
            <p>{user.name}</p>
          </Link>
          Friends
          <button
            className={styles.warning}
            onClick={() =>
              removeFriendship(user._id, () => {
                friendsData.mutate();
                friendshipRequestsData.mutate();
              })
            }
          >
            Cancel Friendship
          </button>
        </div>
      );
    } else if (receivedRequests.includes(userId)) {
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
          <Link href={`/users/${user._id}`}>
            <p>{user.name}</p>
          </Link>
          <button
            onClick={() =>
              acceptFriendshipRequest(user._id, friendsData.mutate)
            }
          >
            Accept Friendship Request
          </button>
          <button
            className={styles.warning}
            onClick={() =>
              rejectFriendshipRequest(user._id, friendshipRequestsData.mutate)
            }
          >
            Reject Friendship Request
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
          <Link href={`/users/${user._id}`}>
            <p>{user.name}</p>
          </Link>
          <p>Pending Friendship Request...</p>
          <button
            className={styles.warning}
            onClick={() =>
              removeFriendshipRequest(user._id, friendshipRequestsData.mutate)
            }
          >
            Cancel
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
          <Link href={`/users/${user._id}`}>
            <p>{user.name}</p>
          </Link>
          <button
            onClick={() =>
              makeFriendshipRequest(user._id, friendshipRequestsData.mutate)
            }
          >
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
