import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "../styles/navbar.module.css";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <div>
      <Image
        src={session?.user.image}
        className={styles.rounded}
        alt="Profile"
        layout="fixed"
        width={50}
        height={50}
      />
      <form>
        <textarea
          name="content"
          placeholder={`What's on your mind, ${
            session?.user.name.split(" ")[0]
          }?`}
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
