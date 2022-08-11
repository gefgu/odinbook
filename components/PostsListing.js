import PostBox from "./PostBox";
import styles from "../styles/PostListing.module.css";

export default function PostsListing({ posts, update }) {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostBox key={post._id} post={post} update={update} />
      ))}
    </div>
  );
}
