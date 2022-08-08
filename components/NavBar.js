import Image from "next/image";
import odin from "../public/odin.png";
import home from "../public/home.png";
import people from "../public/account-multiple.png";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <header>
      <Image src={odin} alt="Odin Logo" width={50} height={50} />
      <nav>
        <ul>
          <li>
            <button>
              <Image src={home} alt="Home Page" width={50} height={50} />
            </button>
          </li>
          <li>
            <button>
              <Image src={people} alt="Friends" width={50} height={50} />
            </button>
          </li>
        </ul>
      </nav>
      <Image src={session?.user.image} alt="Profile" width={50} height={50} />
    </header>
  );
}
