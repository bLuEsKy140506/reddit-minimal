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
    <div className="w-full max-w-md mx-auto mb-4">
      <select
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="popular">Popular</option>
        <option value="news">News</option>
        <option value="technology">Technology</option>
        <option value="funny">Funny</option>
        <option value="pics">Pics</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
