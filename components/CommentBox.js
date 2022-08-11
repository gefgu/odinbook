import Image from "next/image";
import useSWR from "swr";
import NewCommentBox from "./NewCommentBox";
import utils from "../styles/utils.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CommentBox({ post }) {
  const { data, mutate, error } = useSWR(
    `/api/posts/${post._id}/comments`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const comments = data.comments;

  console.log(comments);

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id}>
            <Image
              src={comment.author.image}
              className={utils.rounded}
              alt="Profile"
              layout="fixed"
              width={50}
              height={50}
            />
            <div>
              <strong>{comment.author.name}</strong>
              <p>{comment.content}</p>
            </div>
            <p>{comment.sinceCreation}</p>
          </div>
        ))}
      <NewCommentBox update={mutate} post={post} />
    </div>
  );
}
