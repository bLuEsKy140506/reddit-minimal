import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) =>
    state.posts.items.find((p) => p.id === postId)
  );

  const defaultImage = "https://placehold.co/300x200?text=No+Image";

  if (!post) {
    return <p>Loading...</p>;
  }

  const isValidImage = post.thumbnail && post.thumbnail.startsWith("http");

  return (
    <div className="post-detail">
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>{post.title}</h2>
      <p>By {post.author}</p>
      <p>👍 {post.ups} | 💬 {post.num_comments}</p>

      <img
        src={isValidImage ? post.thumbnail : defaultImage}
        alt={post.title}
        onError={(e) => (e.target.src = defaultImage)} // fallback if load fails
      />

      <p>{post.selftext || "No text content"}</p>
    </div>
  );
}

export default PostDetail;
