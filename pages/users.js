import Image from "next/image";
import useSWR from "swr";
import utils from "../styles/utils.module.css";
import styles from "../styles/UserListing.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Dashboard() {
  const { data, mutate, error } = useSWR("/api/users", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const users = data.users;

  return (
    <div className={styles.container}>
      {users.map((user) => (
        <div key={user._id} className={styles.userBox}>
          <Image
            src={user.image}
            className={utils.rounded}
            alt="Profile"
            layout="fixed"
            width={75}
            height={75}
          />
          <p>{user.name}</p>
          <button>Request Friendship</button>
        </div>
      ))}
    </div>
  );
}
