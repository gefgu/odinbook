import useSWR from "swr";
import NewCommentBox from "./NewCommentBox";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CommentBox({ post }) {
  const { data, mutate, error } = useSWR(
    `/api/posts/${post._id}/comments`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const comments = data.comments;

  return (
    <div>
      <NewCommentBox update={mutate} post={post} />
    </div>
  );
}
