import Image from "next/image";
import { useSession } from "next-auth/react";
import thumbs from "../public/thumbs-up-solid.svg";
import styles from "../styles/LikeBox.module.css";

export default function LikeBox() {
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    session && (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <button>
            <Image src={thumbs} alt="Thumbs up" width={30} height={30} /> Like
          </button>
        </form>
      </div>
    )
  );
}
