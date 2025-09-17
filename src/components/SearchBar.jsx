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
    <form 
      onSubmit={handleSubmit} 
      className="flex w-full max-w-md mx-auto mb-4"
    >
      {/* Input with icon */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" 
            />
          </svg>
        </span>

        <input
          type="text"
          value={term}
          placeholder="Search Reddit..."
          onChange={(e) => setTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Search button */}
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
