import Image from "next/image";
import { getSinceDateUntilNow } from "../lib/helpers";
import utils from "../styles/utils.module.css";
import styles from "../styles/PostBox.module.css";
import LikeBox from "./LikeBox";

export default function PostBox({ post }) {
  post.sinceCreation = getSinceDateUntilNow(post.creationDate);

  return (
    <div className={styles.container}>
      <div className={styles.horizontalCenter}>
        <Image
          src={post.author.image}
          className={utils.rounded}
          alt="Profile"
          layout="fixed"
          width={50}
          height={50}
        />
        <div>
          <strong>{post.author.name}</strong> posted.
          <p>{post.sinceCreation}</p>
        </div>
      </div>
      <div>
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <LikeBox />
    </div>
  );
}
