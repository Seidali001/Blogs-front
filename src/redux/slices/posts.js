import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`).then(() => {})
);

export const fetchSortedPostsByViews = createAsyncThunk(
  "posts/fetchSortedPostsByViews",
  async () => {
    try {
      const { data } = await axios.get("/posts/viewCount");
      return data;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }
);

export const fetchPostsByTags = createAsyncThunk(
  "posts/fetchPostsByTags",
  async (tag) => {
    try {
      if (tag) {
        const response = await axios.get(`/posts/tags/${tag}`);
        return response.data;
      }
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }
);

export const fetchSortedPostsByDate = createAsyncThunk(
  "posts/fetchSortedPostsByDate",
  async () => {
    try {
      const { data } = await axios.get("/posts/createdAt");
      return data;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = "error";
      })
      .addCase(fetchPostsByTags.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchPostsByTags.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPostsByTags.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      })
      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
      })
      .addCase(fetchSortedPostsByViews.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchSortedPostsByViews.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchSortedPostsByViews.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      })
      .addCase(fetchSortedPostsByDate.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchSortedPostsByDate.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchSortedPostsByDate.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });
  },
});


export const { actions: postsActions, reducer: postsReducer } = postsSlice;

