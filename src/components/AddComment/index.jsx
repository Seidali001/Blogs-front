import React, {useCallback, useEffect, useState} from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../axios";


export const Index = ({ postId, setDataComment, setIsLoadingComm }) => {
    const {id} = useParams();
    const userData = useSelector((state) => state.auth.data);
    const [commentText, setCommentText] = useState("");

    const handleCommentSubmit = () => {
        setIsLoadingComm(true)


        // Отправка комментария на бэкэнд
        // Здесь вы можете использовать axios или другую библиотеку для выполнения POST-запроса к API
        // Пример с использованием axios:
        axios
            .post(`/posts/${postId}/comments`, {
                content: commentText,
                user: {
                    userId: userData._id,
                    fullName: userData.fullName,
                    avatarUrl: userData.avatarUrl
                }
            })
            .then((res) => {
                // Комментарий успешно добавлен
                // Обновление состояния с полученными данными
                //setData(res.data)

                setDataComment(res.data.comments);
                setIsLoadingComm(false)
            })
            .catch((error) => {
                console.warn(error);
                // Обработка ошибки при добавлении комментария
                alert("Error adding comment");
            });

    }

/*    useEffect(() => {
        dispath(fetchComment(id, commentText, userData._id, userData.fullName, userData.avatarUrl))
    }, [])*/




    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{root: styles.avatar}}
                    src={userData.avatarUrl}/*"https://mui.com/static/images/avatar/5.jpg"*/
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
