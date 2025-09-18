import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchComments } from "../comments/commentsSlice";
import CommentsList from "../comments/CommentList";

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    state.posts.items.find((p) => p.id === postId)
  );

  const { items: commentsByPost, status, error } = useSelector(
    (state) => state.comments
  );
  const comments = commentsByPost[postId] || [];

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  const defaultImage = "https://placehold.co/300x200?text=No+Image";
  const isValidImage =
    typeof post?.thumbnail === "string" && post.thumbnail.startsWith("http");

  if (!post) {
    return (
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md"
        >
          ⬅ Back
        </button>
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-blue-600 text-white rounded-md"
      >
        ⬅ Back
      </button>

      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        By {post.author} · 👍 {post.ups} · 💬 {post.num_comments}
      </p>

      <img
        src={isValidImage ? post.thumbnail : defaultImage}
        alt={post.title}
        className="w-full h-full object-cover"
        onError={(e) => (e.target.src = defaultImage)}
      />

      {post.selftext && <p className="mb-6">{post.selftext}</p>}

      {/* Comments section */}
      <h3 className="text-xl font-semibold mt-6 mb-3">Comments</h3>
      <CommentsList comments={comments} status={status} error={error} />
    </div>
  );
}

export default PostDetail;
