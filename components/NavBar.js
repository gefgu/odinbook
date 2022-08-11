import Image from "next/image";
import odin from "../public/odin.png";
import home from "../public/home.png";
import people from "../public/account-multiple.png";
import { useSession } from "next-auth/react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    session && (
      <header className={styles.container}>
        <Image
          src={odin}
          alt="Odin Logo"
          layout="fixed"
          height={50}
          width={50}
        />
        <nav>
          <ul className={styles.list}>
            <Link href={"/dashboard"}>
              <li>
                <button className={styles.active}>
                  <Image src={home} alt="Home Page" width={40} height={40} />
                </button>
              </li>
            </Link>
            <Link href={"/users"}>
              <li>
                <button>
                  <Image src={people} alt="Friends" width={40} height={40} />
                </button>
              </li>
            </Link>
          </ul>
        </nav>
        <Image
          src={session?.user.image}
          className={styles.rounded}
          alt="Profile"
          layout="fixed"
          width={50}
          height={50}
        />
      </header>
    )
  );
}
