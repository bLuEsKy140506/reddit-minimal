import React from 'react';
import PostList from './features/posts/PostList';

function App() {
  return (
    <div style={{maxWidth: "600px", margin: "0 auto", fontFamily: "Arial"}}>
      <h1>Reddit Minimal</h1>
      <PostList />
    </div>
  );
}

export default App;
