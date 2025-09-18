import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch comments via your Vercel proxy
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const res = await fetch(`/api/reddit?postId=${postId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }
    return { postId, comments: await res.json() };
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: {}, // keyed by postId
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
