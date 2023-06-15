import React, {useState} from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "../../axios";


export const Index = ({postId, setData}) => {
    const userData = useSelector((state) => state.auth.data);
    const [commentText, setCommentText] = useState("");

    const handleCommentSubmit = () => {
        axios
            // Отправка комментария на бэкэнд
            .post(`/posts/${postId}/comments`, {
                content: commentText,
                user: {
                    userId: userData._id,
                    fullName: userData.fullName,
                    avatarUrl: userData.avatarUrl
                }
            })
            .then((res) => {
                // Обновление состояния с полученными данными
                console.log(res.data)
                setData(res.data)
                setCommentText("")
            })
            .catch((error) => {
                console.warn(error);
                // Обработка ошибки при добавлении комментария
                alert("Error adding comment");
            });

    }
    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{root: styles.avatar}}
                    src={userData.avatarUrl}
                />
                <div className={styles.form}>
                    <TextField
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                    />
                    <Button variant="contained" onClick={handleCommentSubmit}>Отправить</Button>
                </div>
            </div>
        </>
    );
};
