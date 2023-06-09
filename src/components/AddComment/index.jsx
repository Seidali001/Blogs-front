import React, {useState} from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import {useParams} from "react-router-dom";

export const Index = ({id, setData}) => {
    const [commentText, setCommentText] = useState("");


  const handleCommentSubmit = () => {
    // Отправка комментария на бэкэнд
    // Здесь вы можете использовать axios или другую библиотеку для выполнения POST-запроса к API

    // Пример с использованием axios:
    axios
        .post(`/posts/${id}/comments`, { text: commentText })
        .then((res) => {
          // Комментарий успешно добавлен
          // Обновление состояния с полученными данными
          setData(res.data);
        })
        .catch((error) => {
          console.warn(error);
          // Обработка ошибки при добавлении комментария
          alert("Error adding comment");
        });
  };

  return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{root: styles.avatar}}
                    src="https://mui.com/static/images/avatar/5.jpg"
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
                    <Button variant="contained">Отправить</Button>
                </div>
            </div>
        </>
    );
};
