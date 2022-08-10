import Image from "next/image";
import { useSession } from "next-auth/react";
import thumbs from "../public/thumbs-up-solid.svg";

export default function LikeBox() {
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    session && (
      <div>
        <form onSubmit={handleSubmit}>
          <button>
            <Image src={thumbs} alt="Thumbs up" width={50} /> Like
          </button>
        </form>
      </div>
    )
  );
}
