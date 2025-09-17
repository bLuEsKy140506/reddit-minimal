import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';

const FilterDropdown = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const subreddit = e.target.value;
    dispatch(fetchPosts({ subreddit }));
  };

  return (
    <select onChange={handleChange} style={{ padding: "8px", marginBottom: "15px" }}>
      <option value="popular">Popular</option>
      <option value="news">News</option>
      <option value="technology">Technology</option>
      <option value="funny">Funny</option>
      <option value="pics">Pics</option>
    </select>
  );
};

export default FilterDropdown;
