import Image from "next/image";
import odin from "../public/odin.png";
import home from "../public/home.png";
import people from "../public/account-multiple.png";
import { signOut, useSession } from "next-auth/react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import utils from "../styles/utils.module.css";
import { useRouter } from "next/router";

export default function NavBar() {
  const { data: session } = useSession();

  const [showDropbox, setShowDropbox] = useState(false);

  const router = useRouter();

  console.log();

  return (
    session && (
      <header className={styles.container}>
        <Link href={"/dashboard"}>
          <Image
            src={odin}
            alt="Odin Logo"
            layout="fixed"
            height={50}
            width={50}
            className={styles.odin}
          />
        </Link>
        <nav>
          <ul className={styles.list}>
            <Link href={"/dashboard"}>
              <li>
                <button
                  className={
                    router.pathname === "/dashboard" ? styles.active : ""
                  }
                >
                  <Image src={home} alt="Home Page" width={40} height={40} />
                </button>
              </li>
            </Link>
            <Link href={"/users"}>
              <li>
                <button
                  className={router.pathname === "/users" ? styles.active : ""}
                >
                  <Image src={people} alt="Friends" width={40} height={40} />
                </button>
              </li>
            </Link>
          </ul>
        </nav>
        <div className={styles.imageBox}>
          <button
            className={styles.imageButton}
            onClick={() => setShowDropbox(!showDropbox)}
          >
            <Image
              src={session.user.image}
              className={utils.roundedImage}
              alt="Profile"
              layout="fixed"
              width={50}
              height={50}
            />
          </button>
          <div
            className={`${styles.dropbox} ${showDropbox ? "" : styles.hidden}`}
          >
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
      </header>
    )
  );
}
