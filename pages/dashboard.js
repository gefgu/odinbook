import styles from "../styles/dashboard.module.css";
import NewPostBox from "../components/NewPostBox";
import PostsListing from "../components/PostsListing";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Dashboard() {
  const { status } = useSession({
    required: true,
  });

  const { data, mutate, error } = useSWR("/api/posts", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading />;

  return (
    <div className={styles.container}>
      <NewPostBox update={mutate} />
      {data?.posts && <PostsListing posts={data?.posts} update={mutate} />}
    </div>
  );
}
