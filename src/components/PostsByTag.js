import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "./Post";
import Grid from "@mui/material/Grid";
import { TagsBlock } from "./TagsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByTags } from "../redux/slices/posts";
import { LoadingPosts } from "../pages/LoadingPosts";
import { CommentsBlock } from "./CommentsBlock";

export const PostsByTag = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { tag } = useParams();
  const [allPostsByTag, setAllPostsByTag] = useState([]);
  const { tags } = useSelector((state) => state.posts);
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    const getPostsByTag = async () => {
      try {
        if (tag) {
          const response = await axios.get(`/posts/tags/${tag}`);
          setAllPostsByTag(response.data);
          console.log(response.data);
        }
      } catch (error) {
        /*console.warn("не получил положительного ответа");*/
        console.warn("did not receive a positive response");
        console.warn(error);
      }
    };
    getPostsByTag();
  }, [tag]);

  return (
    <>
      <div>
        <h1>#{tag}</h1>
      </div>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isTagsLoading
            ? [...Array(10)].map((_, index) => (
                <Post key={index} isLoading={true} />
              ))
            : allPostsByTag?.map((obj, index) => (
                <Post
                  key={index}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                  }
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
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
