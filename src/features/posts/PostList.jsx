import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';
import { Link } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.posts);

  const defaultImage = "https://placehold.co/150x100?text=No+Image";

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p className="text-center mt-6 text-gray-600">Loading posts...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center mt-6 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4">

      {/* Post list */}
      <div className="space-y-4">
        {items.map((post) => {
          const isValidImage = post.thumbnail && post.thumbnail.startsWith("http");

          return (
            <div
              key={post.id}
              className="flex items-start gap-3 border rounded-lg p-3 shadow-sm hover:shadow-md transition bg-white"
            >
              {/* Thumbnail */}
              <Link to={`/${post.id}`} className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md border">
                <img
                  src={isValidImage ? post.thumbnail : defaultImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = defaultImage)}
                />
              </Link>

              {/* Post details */}
              <div className="flex-1">
                <Link to={`/${post.id}`}>
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <h5 className="text-sm text-gray-500">by {post.author}</h5>
                <p className="text-sm text-gray-600 mt-1">
                  👍 {post.ups} | 💬 {post.num_comments}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
