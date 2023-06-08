import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import axios from "../axios";

import { Post } from "../components";
import { TagsBlock } from "../components";
import { CommentsBlock } from "../components";
import {
  fetchPosts,
  fetchSortedPostsByDate,
  fetchSortedPostsByViews,
  fetchTags,
} from "../redux/slices/posts";
import { LoadingPosts } from "./LoadingPosts";

export const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data); //////
  const { posts, tags } = useSelector((state) => state.posts); //////

  const [selectedTab, setSelectedTab] = useState(0); // новое состояние для хранения выбранной вкладки

  const isPostsLoading = posts.status === "loading"; /////
  const isTagsLoading = tags.status === "loading"; /////

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // обновляем выбранную вкладку

    if (newValue === 1) {
      dispatch(fetchSortedPostsByViews());
    } else if (newValue === 0) {
      dispatch(fetchSortedPostsByDate());
    }
  };

  useEffect(() => {
    dispatch(fetchSortedPostsByDate());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={selectedTab} // используем выбранную вкладку из состояния
        onChange={handleTabChange} // обработчик изменения вкладки
        aria-label="basic tabs example"
      >
        <Tab label="По дате" />
        <Tab label="Популярные" onClick={handleTabChange} />
        <Tab label="Мои" />
      </Tabs>
      <LoadingPosts />
    </>
  );
};

