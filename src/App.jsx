
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./features/posts/PostList";
import PostDetail from "./features/posts/PostDetail";
import SearchBar from './components/SearchBar';
import FilterDropdown from "./components/FilterDropDown";
import Header from "./components/Header";

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <SearchBar />
                <FilterDropdown />
                <PostList />
              </>
            }
          />
          <Route path="/:postId" element={<PostDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


