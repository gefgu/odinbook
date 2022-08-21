import Image from "next/image";
import useSWR from "swr";
import NewCommentBox from "./NewCommentBox";
import utils from "../styles/utils.module.css";
import styles from "../styles/CommentBox.module.css";
import { getSinceDateUntilNow } from "../lib/helpers";
import Link from "next/link";
import { useSession } from "next-auth/react";
import trash from "../public/trash-solid.svg";
import Loading from "./Loading";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CommentBox({ post }) {
  const { data: session } = useSession();

  const { data, mutate, error } = useSWR(
    `/api/posts/${post._id}/comments`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading />;

  const comments = data.comments;

  const handleDeletion = async (event, id) => {
    event.preventDefault();

    const endpoint = `/api/posts/${post._id}/comments/${id}`;

    const options = { method: "DELETE" };

    const response = await fetch(endpoint, options);

    const result = await response.json();
    mutate();
  };

  return (
    <div className={styles.container}>
      {comments &&
        session &&
        comments.map((comment) => {
          comment.sinceCreation = getSinceDateUntilNow(comment.creationDate);
          const userIsAuthor = comment.author._id === session.user.id;
          return (
            <div key={comment._id} className={styles.commentBox}>
              <Image
                src={comment.author.image}
                className={utils.roundedImage}
                alt="Profile"
                layout="fixed"
                width={50}
                height={50}
              />
              <div className={styles.comment}>
                <div className={styles.content}>
                  <div className={styles.heading}>
                    <Link href={`/users/${comment.author._id}`}>
                      <strong>{comment.author.name}</strong>
                    </Link>{" "}
                    {userIsAuthor && (
                      <button
                        className={styles.trash}
                        onClick={(event, id) =>
                          handleDeletion(event, comment._id)
                        }
                      >
                        <Image
                          src={trash}
                          alt="Profile"
                          layout="fixed"
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                  </div>
                  <p>{comment.content}</p>
                </div>
                <p className={styles.date}>{comment.sinceCreation}</p>
              </div>
            </div>
          );
        })}
      <NewCommentBox update={mutate} post={post} />
    </div>
  );
}
