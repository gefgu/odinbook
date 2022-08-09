import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "../styles/NewPostBox.module.css";

export default function NewPostBox() {
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { content: event.target.content.value };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/posts";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSONdata,
    };

    
    const response = await fetch(endpoint, options);

    const result = await response.json();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            required
          ></textarea>
        </div>
        <div className={styles.right}>
          <button className={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
}
