import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {Post} from "../components";
import {CommentsBlock} from "../components";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import {useSelector} from "react-redux";

export const FullPost = () => {
    const userData = useSelector((state) => state.auth.data);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();

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

    }, []);

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>;
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
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
                setData={setData}
                postId={id}
            >
                </CommentsBlock>
        </>
    );
};
