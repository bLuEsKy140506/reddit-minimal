import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper: Parse Reddit comments JSON
function parseComments(json) {
  if (!Array.isArray(json) || json.length < 2) return [];
  const comments = json[1].data.children || [];

  return comments
    .filter((c) => c.kind === "t1" && c.data)
    .map((c) => ({
      id: c.data.id,
      author: c.data.author,
      body: c.data.body,
      score: c.data.score,
      created_utc: c.data.created_utc,
    }));
}

// Thunk to fetch comments by postId
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId, { rejectWithValue }) => {
    try {
      const redditUrl = `https://www.reddit.com/comments/${postId}.json`;
      const proxyUrl = `/api/reddit?postId=${encodeURIComponent(postId)}`;

      let res = await fetch(redditUrl);
      if (!res.ok) {
        // fallback to proxy if direct fetch fails
        res = await fetch(proxyUrl);
      }
      if (!res.ok) throw new Error("Failed to fetch comments");

      const json = await res.json();
      return { postId, comments: parseComments(json) };
    } catch (err) {
      return rejectWithValue(err.message);
    }
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
        state.error = action.payload || action.error.message;
      });
  },
});

export default commentsSlice.reducer;
