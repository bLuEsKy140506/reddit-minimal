import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch comments for a post
// export const fetchComments = createAsyncThunk(
//   "comments/fetchComments",
//   async (postId) => {
//     const response = await fetch(`http://localhost:5000/comments/${postId}`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch comments");
//     }

//     const data = await response.json();
//     return data[1].data.children.map((c) => c.data);
//   }
// );

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const response = await fetch(`http://localhost:5000/comments/${postId}`);
    if (!response.ok) throw new Error("Failed to fetch comments");

    const data = await response.json();

    // Extract comments
    let comments = data[1].data.children.map((c) => {
      const d = c.data;
      return {
        id: d.id,
        author: d.author,
        body: d.body,
        created_utc: d.created_utc, // raw timestamp
      };
    });

    // ✅ Sort: most recent first
    comments.sort((a, b) => b.created_utc - a.created_utc);

    return comments;
  }
);


const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: {}, // store comments by postId
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
        const postId = action.meta.arg; // id passed to thunk
        console.log(action.payload)
        state.items[postId] = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
