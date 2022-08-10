import Image from "next/image";
import { getSinceDateUntilNow } from "../lib/helpers";

export default function PostBox({ post }) {
  post.sinceCreation = getSinceDateUntilNow(post.creationDate);

  console.log(post.sinceCreation);

  return (
    <div>
      <div>
        <Image
          src={post.author.image}
          alt="Profile"
          layout="fixed"
          width={50}
          height={50}
        />
        <strong>{post.author.name}</strong> posted.
        <p>{post.sinceCreation}</p>
      </div>
      <div>
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
