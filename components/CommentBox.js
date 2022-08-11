import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CommentBox({ post }) {
  const { data, mutate, error } = useSWR(
    `/api/posts/${post._id}/comments`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const comments = data.comments;

  return <div>ABC</div>;
}
