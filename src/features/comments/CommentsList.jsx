import React from "react";

function CommentsList({ comments, status, error }) {
  const defaultSorted = [...comments].sort(
    (a, b) => b.created_utc - a.created_utc // most recent first
  );

  if (status === "loading") return <p>Loading comments...</p>;
  if (status === "failed") return <p className="text-red-500">{error}</p>;
  if (status === "succeeded" && defaultSorted.length === 0)
    return <p>No comments.</p>;

  return (
    <div>
      {defaultSorted.map((comment) => (
        <div
          key={comment.id}
          className="border-b border-gray-200 py-2 text-left"
        >
          <p className="font-semibold">{comment.author}</p>
          <p>{comment.body}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.created_utc * 1000).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
