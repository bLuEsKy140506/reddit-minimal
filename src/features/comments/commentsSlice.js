import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk to fetch comments by postId
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const response = await fetch(`/api/comments/${postId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.status}`);
    }

    const data = await response.json();

    // Reddit returns an array → [postInfo, commentsList]
    if (!Array.isArray(data) || !data[1]?.data?.children) {
      throw new Error("Unexpected Reddit API response format");
    }

    // Map and sort comments (newest first)
    return data[1].data.children
      .map((c) => ({
        id: c.data.id,
        author: c.data.author,
        body: c.data.body,
        created_utc: c.data.created_utc,
      }))
      .sort((a, b) => b.created_utc - a.created_utc);
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: {}, // comments by postId
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        const postId = action.meta.arg;
        state.items[postId] = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
