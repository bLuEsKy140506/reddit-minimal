import React from 'react';
import PostList from './features/posts/PostList';

function App() {
  return (
    <div style={{maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial", textAlign: "center"}}>
      <h1>Reddit Minimal</h1>
      <PostList />
    </div>
  );
}

export default App;
