import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "../../components/Loading";
import PostsListing from "../../components/PostsListing";
import styles from "../../styles/UserPage.module.css";
import utils from "../../styles/utils.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UserPage() {
  const router = useRouter();
  const { userId } = router.query;

  const { ...userData } = useSWR(`/api/users/${userId}`, fetcher);
  const { ...postsData } = useSWR(`/api/posts/user/${userId}`, fetcher);

  if (userData.error || postsData.error) return <div>Failed to load</div>;
  if (!userData.data || !postsData.data) return <Loading />;

  const user = userData.data?.user;

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
        {postsData.data?.posts && (
          <PostsListing
            posts={postsData.data?.posts}
            update={postsData.mutate}
          />
        )}
      </div>
    )
  );
}
