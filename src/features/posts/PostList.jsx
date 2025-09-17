import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';
import { Link } from "react-router-dom";
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
            <Link to={`/${post.id}`}>
          <div className='post-image'>
          {post.thumbnail && post.thumbnail.startsWith('http') && (
            <img src={post.thumbnail} alt={post.title}  />
          )}
          </div>
          </Link>
          <div className='post-description'>
            <Link to={`/${post.id}`}>

          <h3>{post.title}</h3>
            </Link>

          <h5>by {post.author}</h5>
          <p>👍 {post.ups} | 💬 {post.num_comments}</p>
          </div>
        </div>
        
      ))}
    </div>
  );
};

export default PostList;
