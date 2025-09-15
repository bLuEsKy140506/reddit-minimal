import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Loading posts...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {items.map((post) => (
        <div key={post.id} style={{borderBottom: "1px solid #ccc", margin: "10px 0", padding: "10px"}}>
          <h3>{post.title}</h3>
          <p>👍 {post.ups} | 💬 {post.num_comments}</p>
          {post.thumbnail && post.thumbnail.startsWith('http') && (
            <img src={post.thumbnail} alt={post.title} width="100" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
