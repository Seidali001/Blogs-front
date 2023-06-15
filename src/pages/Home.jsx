import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
    fetchSortedPostsByDate, fetchSortedPostsByUser,
    fetchSortedPostsByViews,
    fetchTags,
} from "../redux/slices/posts";
import {LoadingPosts} from "./LoadingPosts";

export const Home = () => {
    const userData = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState(0); // новое состояние для хранения выбранной вкладки

    const handleTabChange = (event, newValue) => {
        if (newValue === 1) {
            setSelectedTab(newValue); // обновляем выбранную вкладку
            return dispatch(fetchSortedPostsByViews());
        } else if (newValue === 0) {
            setSelectedTab(newValue); // обновляем выбранную вкладку
            return dispatch(fetchSortedPostsByDate());
        } else if (newValue === 2) {
            setSelectedTab(newValue); // обновляем выбранную вкладку
            if (userData?._id) {
                return dispatch(fetchSortedPostsByUser(userData?._id));
            }

        }
    };

    useEffect(() => {
        dispatch(fetchSortedPostsByDate());
        dispatch(fetchTags());
    }, []);

    return (
        <>
            <Tabs
                style={{marginBottom: 15}}
                value={selectedTab} // используем выбранную вкладку из состояния
                onChange={handleTabChange} // обработчик изменения вкладки
                aria-label="basic tabs example"
            >
                <Tab label="По дате"/>
                <Tab label="Популярные" onClick={handleTabChange}/>
                {userData ? <Tab label="Мои" onClick={handleTabChange}/> : <></>}
            </Tabs>
            <LoadingPosts userData={userData}/>
        </>
    );
};

