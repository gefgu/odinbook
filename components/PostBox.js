import Image from "next/image";
import { getSinceDateUntilNow } from "../lib/helpers";
import utils from "../styles/utils.module.css";
import styles from "../styles/PostBox.module.css";
import LikeBox from "./LikeBox";
import CommentBox from "./CommentBox";
import Link from "next/link";

export default function PostBox({ post, update }) {
  post.sinceCreation = getSinceDateUntilNow(post.creationDate);

  return (
    <div className={styles.container}>
      <div className={styles.horizontalCenter}>
        <Image
          src={post.author.image}
          className={utils.roundedImage}
          alt="Profile"
          layout="fixed"
          width={50}
          height={50}
        />
        <div>
          <Link href={`/users/${post.author._id}`}>
            <strong>{post.author.name}</strong>
          </Link>{" "}
          posted.
          <p>{post.sinceCreation}</p>
        </div>
      </div>
      <div>
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {post.likes.length === 1 && <p>{post.likes.length} Like</p>}
      {post.likes.length > 1 && <p>{post.likes.length} Likes</p>}
      <LikeBox post={post} update={update} />
      <CommentBox post={post} />
    </div>
  );
}
