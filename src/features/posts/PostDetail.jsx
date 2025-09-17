import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Assume posts are in state.posts.items
  const post = useSelector((state) =>
    state.posts.items.find((p) => p.id === postId)
  );

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-detail">
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>{post.title}</h2>
      <p>By {post.author}</p>
      <p>👍 {post.ups} | 💬 {post.num_comments}</p>
      
      {post.thumbnail && post.thumbnail.startsWith("http") && (
        <img src={post.thumbnail} alt={post.title} />
      )}
      
      <p>{post.selftext || "No text content"}</p>
    </div>
  );
}

export default PostDetail;
