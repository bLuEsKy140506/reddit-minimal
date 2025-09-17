import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "./commentsSlice";

function CommentsList({ postId }) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (status === "loading") {
    return <p>Loading comments...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const comments = items[postId] || [];

  function formatTime(utcSeconds) {
  const date = new Date(utcSeconds * 1000); // convert to ms
  return date.toLocaleString(); // e.g. "9/17/2025, 2:30:00 PM"
}

  return (
    <div className="comments">
      <h3>Comments</h3>
      {comments.map((comment) => (
  <div key={comment.id} className="comment">
    <p><strong>{comment.author}</strong>: {comment.body}</p>
    <small>{formatTime(comment.created_utc)}</small>
  </div>
))}
    </div>
  );
}

export default CommentsList;
