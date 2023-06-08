import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByTags, fetchTags } from "../redux/slices/posts";

export const TagsBlock = ({ items, isLoading = true }) => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  const [tagState, setTagState] = useState("");

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items)?.map((name, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton component={Link} to={`/tags/${name}`}>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <ListItemText primary={name} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SideBlock>
  );
};
