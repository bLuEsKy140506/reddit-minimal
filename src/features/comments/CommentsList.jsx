import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "./commentsSlice";

function CommentsList({ postId }) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (status === "loading") {
    return <p className="text-center text-gray-500 mt-4">Loading comments...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;
  }

  const comments = items[postId] || [];

  function formatTime(utcSeconds) {
    const date = new Date(utcSeconds * 1000);
    return date.toLocaleString();
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-3 border rounded-lg shadow-sm bg-white"
          >
            <p className="text-gray-800">
              <strong className="text-blue-600">{comment.author}</strong>:{" "}
              {comment.body}
            </p>
            <small className="text-gray-500 text-sm block mt-1">
              {formatTime(comment.created_utc)}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsList;
