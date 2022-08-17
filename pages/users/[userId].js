import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import styles from "../../styles/UserPage.module.css";
import utils from "../../styles/utils.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UserPage() {
  const router = useRouter();
  const { userId } = router.query;

  const { data, error } = useSWR(`/api/users/${userId}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const user = data?.user;

  return (
    user && (
      <div className={styles.container}>
        <div className={styles.heading}>
          <Image
            src={user.image}
            className={utils.roundedImage}
            alt="Profile"
            layout="fixed"
            width={125}
            height={125}
          />
          <h1>{user.name}</h1>
        </div>
      </div>
    )
  );
}
