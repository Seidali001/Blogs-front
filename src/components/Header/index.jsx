import React from "react";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";
import Avatar from "@mui/material/Avatar";
import StyledBadge from "@mui/material/Badge"

export const Header = React.memo(() => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector((state) => state.auth.data);

    const onClickLogout = () => {
        if (window.confirm("Are you sure you want to logout")) {
            dispatch(logout());
            window.localStorage.removeItem("token");
        }
    };
    console.log(userData)
    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    {/*<Link className={styles.logo} to="/">
            <div>BLOGS</div>
          </Link>*/}
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        variant="dot"
                    >
                        <Avatar alt="Remy Sharp" src={userData?.avatarUrl}/>
                    </StyledBadge>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/add-post">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                <Button
                                    onClick={onClickLogout}
                                    variant="contained"
                                    color="error"
                                >
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Создать аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
});
