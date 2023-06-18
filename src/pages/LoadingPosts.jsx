import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { Post, TagsBlock } from "../components";
import React from "react";

export const LoadingPosts = ({userData}) => {
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  return (
    <>
      <Grid container spacing={4} >
        <Grid xs={8} item >
          {isPostsLoading
            ? [...Array(20)].map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : posts?.items?.map((obj, index) => (
                <Post
                  key={index}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl ? `process.env.REACT_APP_API_URL${obj.imageUrl}` : ""
                  }
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.comments.length}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags?.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
