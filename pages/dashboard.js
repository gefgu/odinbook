import styles from "../styles/dashboard.module.css";
import NewPostBox from "../components/NewPostBox";
import PostsListing from "../components/PostsListing";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Dashboard() {
  const { data, mutate, error } = useSWR("/api/posts", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <NewPostBox update={mutate} />
      <PostsListing posts={data?.posts} update={mutate} />
    </div>
  );
}
