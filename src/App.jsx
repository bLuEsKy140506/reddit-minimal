
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./features/posts/PostList";
import PostDetail from "./features/posts/PostDetail";
import SearchBar from './components/SearchBar';
import FilterDropdown from "./components/FilterDropDown";

function App() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial", textAlign: "center" }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Reddit Minimal</h1>
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


