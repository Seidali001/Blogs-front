/*
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Post} from "../components";
import {Index} from "../components";
import {CommentsBlock} from "../components";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import {useSelector} from "react-redux";

export const FullPost = () => {

    const userData = useSelector((state) => state.auth.data);
    const [data, setData] = useState();
    const [dataComment, setDataComment] = useState(); ///////////////////////////////////////
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();

    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = (comment) => {
        // Отправка комментария на бэкэнд
        // Здесь вы можете использовать axios или другую библиотеку для выполнения POST-запроса к API
            // Пример с использованием axios:
            axios
                .post(`/posts/${id}/comments`, {content: comment, user: id})
                .then((res) => {
                    // Комментарий успешно добавлен
                    // Обновление состояния с полученными данными
                    setDataComment(res.data);
                    console.log(res.data)
                })
                .catch((error) => {
                    console.warn(error);
                    // Обработка ошибки при добавлении комментария
                    alert("Error adding comment");
                });

    };

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(!isLoading);
            })
            .catch((error) => {
                console.warn(error);
                // alert("ошибка при получении статьи")
                alert("error getting article");
            });
    }, [handleCommentSubmit]);

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>;
    }
    console.log(userData)
    //console.log(comment)
    console.log(dataComment)
    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
                /!* imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"*!/
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isFullPost
                isEditable={userData?._id === data.user._id}
            >
                <ReactMarkdown children={data.text}/>
            </Post>
            <CommentsBlock
                dataCommment={dataComment}
                items={

                    /!*dataComment?.map((obj) => (
                        {
                            user: {
                                fullName: obj.fullName,
                                avatarUrl: obj.avatarUrl,
                            },
                            text: obj.text,
                        }
                    ))*!/
                    [
                        {
                            user: {
                                fullName: "Вася Пупкин",
                                avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                            },
                            text: "Это тестовый комментарий 555555",
                        },
                        {
                            user: {
                                fullName: "Иван Иванов",
                                avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                            },
                            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                        },
                    ]}
                isLoading={false}
            >
                {userData ? <Index id={id} handleCommentSubmit={handleCommentSubmit} commentText={commentText}
                                   setCommentText={setCommentText}/> : <></>}
            </CommentsBlock>
        </>
    );
};
*/

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Post} from "../components";
import {Index} from "../components";
import {CommentsBlock} from "../components";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import {useSelector} from "react-redux";

export const FullPost = () => {


    const userData = useSelector((state) => state.auth.data);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    //console.log(id);

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(!isLoading);
                //setDataComment(res.data.comments)
            })
            .catch((error) => {
                console.warn(error);
                // alert("ошибка при получении статьи")
                alert("error getting article");
            });

    }, []);

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>;
    }
console.log(data)
//console.log(dataComment)
    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
                /* imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"*/
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={data.comments.length}
                tags={data.tags}
                isFullPost
                isEditable={userData?._id === data.user._id}
            >
                <ReactMarkdown children={data.text}/>
            </Post>
            <CommentsBlock
                data={data}
                postId={id}
            items={data.comments}
                /*isLoading={false}*/
            >

                </CommentsBlock>
        </>
    );
};
