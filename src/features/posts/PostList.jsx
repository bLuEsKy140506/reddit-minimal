import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';
import './PostList.css';

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
    <div >
      {items.map((post) => (
        <div key={post.id} className='post-container'>
          <div className='post-image'>
          {post.thumbnail && post.thumbnail.startsWith('http') && (
            <img src={post.thumbnail} alt={post.title}  />
          )}
          </div>
          <div className='post-description'>
          <h3>{post.title}</h3>
          <h5>by {post.author}</h5>
          <p>👍 {post.ups} | 💬 {post.num_comments}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
