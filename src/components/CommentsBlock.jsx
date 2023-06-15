import React from "react";
import {SideBlock} from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import {useSelector} from "react-redux";
import {Index} from "./AddComment";


export const CommentsBlock = ({ data, setData, postId, children}) => {
    const userData = useSelector((state) => state.auth.data);
    const posts = useSelector((state) => state.posts);

    const isCommentsLoading = posts.status === "loading";

    return (
            <>
                <SideBlock title="Комментарии">
                    <List>
                        {( isCommentsLoading ? [...Array(5)] : data.comments)?.map((obj, index) => (
                            <React.Fragment key={index}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        { isCommentsLoading ? (
                                            <Skeleton variant="circular" width={40} height={40}/>
                                        ) : (
                                            <Avatar alt={obj.fullName} src={obj.avatarUrl}/>
                                        )}
                                    </ListItemAvatar>
                                    { isCommentsLoading ? (
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
                    {userData ? <Index postId={postId} setData={setData} /> : <></>}
                </SideBlock>
            </>

    );
}
