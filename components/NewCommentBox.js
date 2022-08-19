import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "../styles/NewCommentBox.module.css";
import utils from "../styles/utils.module.css";

export default function NewCommentBox({ update, post }) {
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { content: event.target.content.value };

    const JSONdata = JSON.stringify(data);

    const endpoint = `/api/posts/${post._id}/comments`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    event.target.content.value = "";
    update();
  };

  return (
    session && (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Image
            src={session?.user.image}
            className={utils.roundedImage}
            alt="Profile"
            layout="fixed"
            width={50}
            height={50}
          />
          <input
            name="content"
            placeholder={`What's on your mind, ${session?.user.name}?`}
            className={styles.textarea}
            type="text"
            required
          />

          <button className={styles.button}>Comment</button>
        </form>
      </div>
    )
  );
}
