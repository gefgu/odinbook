import Image from "next/image";
import { useSession } from "next-auth/react";
import thumbs from "../public/thumbs-up-solid.svg";
import styles from "../styles/LikeBox.module.css";

export default function LikeBox({ post, update }) {
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = `/api/posts/${post._id}/like`;

    const options = {
      method: "PUT",
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    update();
  };

  return (
    session && (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <button
            className={
              post.likes.includes(session?.user.id) ? styles.liked : ""
            }
          >
            <Image src={thumbs} alt="Thumbs up" width={30} height={30} />{" "}
            {post.likes.includes(session?.user.id) ? "Unlike" : "Like"}
          </button>
        </form>
      </div>
    )
  );
}
