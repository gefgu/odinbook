import useSWR from "swr";
import PostBox from "./PostBox";
import styles from "../styles/PostListing.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function PostsListing() {
  const { data, error } = useSWR("/api/posts", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      {data.posts.map((post) => (
        <PostBox key={post._id} post={post} />
      ))}
    </div>
  );
}
