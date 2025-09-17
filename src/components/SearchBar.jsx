import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim() !== '') {
      dispatch(fetchPosts({ searchTerm: term }));
      setTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
      <input
        type="text"
        value={term}
        placeholder="Search Reddit..."
        onChange={(e) => setTerm(e.target.value)}
        style={{ padding: "8px", width: "70%" }}
      />
      <button type="submit" style={{ padding: "8px 12px", marginLeft: "8px" }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
