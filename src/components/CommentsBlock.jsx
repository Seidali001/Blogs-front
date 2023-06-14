import React, {useEffect, useState} from "react";

import {SideBlock} from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import {useDispatch, useSelector} from "react-redux";
import {Index} from "./AddComment";
import {fetchComment} from "../redux/slices/posts";

export const CommentsBlock = ({ data, postId, items, children}) => {
    const userData = useSelector((state) => state.auth.data);
    const comments = useSelector((state) => state.posts);
    const [dataComment, setDataComment] = useState([]);
    const [isLoadingComm, setIsLoadingComm] = useState(false);


    console.log(comments)
    const isCommentsLoading = comments.status === "loading";

    return (
            <>
                <SideBlock title="Комментарии">
                    <List>
                        {( isLoadingComm && isCommentsLoading ? [...Array(5)] : items)?.map((obj, index) => (
                            <React.Fragment key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        { isLoadingComm && isCommentsLoading ? (
                                            <Skeleton variant="circular" width={40} height={40}/>
                                        ) : (
                                            <Avatar alt={obj.fullName} src={obj.avatarUrl}/>
                                        )}
                                    </ListItemAvatar>
                                    { isLoadingComm && isCommentsLoading ? (
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <Skeleton variant="text" height={25} width={120}/>
                                            <Skeleton variant="text" height={18} width={230}/>
                                        </div>
                                    ) : (
                                        <ListItemText
                                            primary={obj.fullName}
                                            secondary={obj.content}
                                        />
                                    )}
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                            </React.Fragment>
                        ))}
                    </List>
                    {children}
                    {userData ? <Index postId={postId}  dataComment={dataComment} setDataComment={setDataComment} setIsLoadingComm={setIsLoadingComm} /> : <></>}
                </SideBlock>
            </>

    );
};
