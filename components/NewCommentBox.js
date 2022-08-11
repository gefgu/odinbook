import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "../styles/NewCommentBox.module.css";
import utils from "../styles/utils.module.css";

export default function NewCommentBox() {
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();

  };

  return (
    session && (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Image
            src={session?.user.image}
            className={utils.rounded}
            alt="Profile"
            layout="fixed"
            width={50}
            height={40}
          />
          <input
            name="content"
            placeholder={`What's on your mind, ${
              session?.user.name.split(" ")[0]
            }?`}
            className={styles.textarea}
            type="text"
            required
          />

          <button className={styles.button}>
            Comment
          </button>
        </form>
      </div>
    )
  );
}
