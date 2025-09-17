import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch posts from Reddit
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ searchTerm, subreddit } = {}) => {
    let url = 'https://www.reddit.com/r/popular.json';

    if (searchTerm) {
      url = `https://www.reddit.com/search.json?q=${searchTerm}`;
    } else if (subreddit) {
      url = `https://www.reddit.com/r/${subreddit}.json`;
    }

    const response = await axios.get(url);
    return response.data.data.children.map(post => post.data);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedPost: null,
  },
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectPost, clearSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
