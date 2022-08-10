import Image from "next/image";

export default function PostBox({ post }) {
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
        <p>{post.creationDate}</p>
      </div>
      <div>
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
