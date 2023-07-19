import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeProvider, Tooltip } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import { alpha, createTheme, styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import styles from "./Header.module.scss";
import { fetchPosts, postsActions } from "../../redux/slices/posts";
import CustomizedInputBase from "./Search"


export const Header = (props) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector((state) => state.auth.data);

    const [searchQuery, setSearchQuery] = useState('');
    let [itemTitle, setItemTitle] = useState("")

    const onClickLogout = () => {
        if (window.confirm("Are you sure you want to logout")) {
            dispatch(logout());
            window.localStorage.removeItem("token");
        }
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    function onChangeHandler(event) {
        const value = event.currentTarget.value
        dispatch(fetchPosts())
        if (value) {
          setItemTitle(event.currentTarget.value)
        } else {
          dispatch(fetchPosts())
          setItemTitle("")
        }
          }

    const searchItemHandler = () => {
        let taskTitleTrimmed = itemTitle.trim()
        dispatch(postsActions.searchTodolistAC(taskTitleTrimmed));
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            opacity: 0,
            primary: {
                main: '#000000FF',
            },
        },
    });

    console.log(searchQuery)

    return (
        <Box position = "sticky" top = "0" style={{zIndex : "100"}}>
            <ThemeProvider theme={darkTheme}>
                <AppBar  position = "sticky" top = "0" >
                    <Toolbar>
                        <IconButton>
                            {isAuth ?
                                <Link to="/">
                                    <Tooltip title={userData?.fullName}>
                                        <Avatar alt="Remy Sharp" src={userData?.avatarUrl}
                                                sx={{width: 32, height: 32}}/>
                                    </Tooltip>
                                </Link> : <AccountCircle/>}
                        </IconButton>
                        <Link to="/">
                            <Tooltip title="Главная">
                                <Button color="inherit" style={{"color": "white"}}>
                                    <HomeIcon/>
                                </Button>
                            </Tooltip>
                        </Link>
                        <Box sx={{flexGrow: 1}}/>
                        <Search>
                            <CustomizedInputBase />
                        </Search>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}} style={{"align-items": "center"}}>
                            <div className={styles.buttons}>
                                {isAuth ? (
                                    <>
                                        <Link to="/add-post">
                                            <Tooltip title="написать статью">
                                                <Button variant="outlined" color="inherit">
                                                    написать статью
                                                </Button>
                                            </Tooltip>
                                        </Link>
                                        <Tooltip title="Выйти">
                                            <Button onClick={onClickLogout}>
                                                <LogoutIcon color="error"/>
                                            </Button>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/register">
                                            <Button variant="text" style={{"color": "white"}}>Создать аккаунт</Button>
                                        </Link>
                                        <Link to="/login">
                                            <Tooltip title="Войти">
                                                <Button color="inherit" style={{"color": "white"}}>
                                                    <LoginIcon/>
                                                </Button>
                                            </Tooltip>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </Box>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>

    );
}



