import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "../styles/NewPostBox.module.css";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.flex}>
          <Image
            src={session?.user.image}
            className={styles.rounded}
            alt="Profile"
            layout="fixed"
            width={50}
            height={50}
          />
          <textarea
            name="content"
            placeholder={`What's on your mind, ${
              session?.user.name.split(" ")[0]
            }?`}
            className={styles.textarea}
            rows={4}
          ></textarea>
        </div>
        <div className={styles.right}>
          <button className={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
}
