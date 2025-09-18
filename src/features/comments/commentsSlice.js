import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    // ✅ Calls your Vercel API route instead of Reddit directly
    const response = await fetch(`/api/comments/${postId}`);
    if (!response.ok) throw new Error("Failed to fetch comments");

    const data = await response.json();

    return data[1].data.children
      .map((c) => ({
        id: c.data.id,
        author: c.data.author,
        body: c.data.body,
        created_utc: c.data.created_utc,
      }))
      .sort((a, b) => b.created_utc - a.created_utc); // newest first
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: {},
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
