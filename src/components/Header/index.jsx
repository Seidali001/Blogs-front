import * as React from 'react';
import {styled, alpha, createTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Search from "@mui/icons-material/Search";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";
import {ThemeProvider, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";
import FeedIcon from '@mui/icons-material/Feed';
import styles from "./Header.module.scss";
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from "@mui/material/Avatar";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


export const Header = (props) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector((state) => state.auth.data);
    /*const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);*/

    const [searchQuery, setSearchQuery] = useState('');

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

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
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

    /*const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );*/

    const handleSearchChange = (event) => {
        /*setSearchQuery(event.target.value);*/
        console.log(event.target.value)
        setSearchQuery(event.target.value)
    };

    //const history = useNavigate();
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log(searchQuery)
        // Перенаправьте пользователя на страницу с результатами поиска
        //history.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#000000FF',
            },
        },
    });

    console.log(searchQuery)

    return (
        <Box sx={{flexGrow: 1}}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static">
                    <Toolbar>
                        {/*<IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >*/}
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
                        {/*<Search>
                            <form onSubmit={handleSearchSubmit}>
                                <IconButton  position="end" type="submit" aria-label="search">
                                    <SearchIcon/>
                                </IconButton>
                            <StyledInputBase
                                styled={{"padding": "0px"}}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search', value: searchQuery, onChange: handleSearchChange }}
                            />
                                </form>
                        </Search>*/}
                        {/*<Search>
                            <form onSubmit={handleSearchSubmit}>
                                <IconButton type="submit" aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search', value: searchQuery, onChange: handleSearchChange }}
                                />
                            </form>

                        </Search>*/}
                        <Box sx={{flexGrow: 1}}/>
                        <Search>
                            <form onSubmit={handleSearchSubmit}>
                                <SearchIconWrapper>
                                    <IconButton position="end" type="submit" aria-label="search">
                                        <SearchIcon/>
                                    </IconButton>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{
                                        'aria-label': 'search',
                                        value: searchQuery,
                                        onChange: handleSearchChange
                                    }}
                                />
                            </form>
                        </Search>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}} style={{"align-items": "center"}}>
                            <div className={styles.buttons}>
                                {isAuth ? (
                                    <>
                                        <Link to="/add-post">
                                            <Tooltip title="написать статью">
                                                {/*<Button color="inherit" style={{"color": "white"}}>*/}
                                                {/*<FeedIcon/>*/}
                                                <Button variant="outlined" color="inherit">
                                                    написать статью
                                                </Button>
                                                {/*</Button>*/}
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
                                            <Button variant="contained">Создать аккаунт</Button>
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
                        {/*<Box sx={{display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </Box>*/}
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            {/*{renderMobileMenu}*/}
            {/*{renderMenu}*/}
        </Box>

    );
}

