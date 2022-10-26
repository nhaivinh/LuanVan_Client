import React, { useState } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import MenuIcon from '@material-ui/icons/Menu';
import { deepOrange, deepPurple, orange } from '@material-ui/core/colors';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import { Link, Outlet } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCookies, removeCookie } from "react-cookie";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Container from '@mui/material/Container';
import {
    AppBar,
    Toolbar,
    Button,
    Popover,
    Avatar,
    Typography,
    IconButton,
} from '@material-ui/core';
import AccountInfo from "../Customers/Account/AccountInfo";
import { Grid } from "@mui/material";
import { actions, useStore } from "../Store";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        color: 'orange',
    },
    searchBar: {
        alignItems: 'left'
    }
    ,
    toolbarTitle: {
        color: 'orange',
        textDecoration: 'none',
        '&:hover': {
            color: "white",
        }
    }
    ,
    typography: {
        padding: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar

}));

const style = {
    display: 'flex',
    marginLeft: 3,
    marginRight: 3,
};

const Header = ({ resetPage, handleResetPage }) => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const [state, dispatchStore] = useStore();
    
    const [countCart, setCountCart] = React.useState(0)

    const [accountInfo, setAccountInfo] = React.useState({})

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    const [searchItem, setSearchItem] = useState("");

    React.useEffect(() => {
        if (cookies.Account !== undefined) {
            axios.get(`https://localhost:7253/api/Cart/getcountcartbyid/` + cookies.Account)
                .then(res => {
                    const CountCart = res.data;
                    setCountCart(CountCart);
                })
            axios.get(`https://localhost:7253/api/Login/getinfobyid/` + cookies.Account)
                .then(res => {
                    const AccountInfo = res.data;
                    setAccountInfo(AccountInfo[0]);
                    dispatchStore(actions.setInfoAccount(AccountInfo[0]))
                })
        }
    }, [resetPage])

    function handleShowAvatar() {
        if (cookies.Account === undefined) {
            return (
                <Link to="/login" className={classes.toolbarTitle}>
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginLeft: 3,
                        }}>
                        <AccountCircleOutlinedIcon fontSize="large" />
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                                marginLeft: 2,
                                marginRight: 3
                            }}>
                            <Typography variant="body2">Đăng nhập</Typography>
                            <Typography variant="body2">Đăng ký</Typography>
                        </Box>
                    </Box>
                </Link>)
        } else {
            return (
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 10,
                    }}>
                    <Box
                        style={{
                            display: 'flex'
                        }}>
                        {accountInfo.picture_char !== null ?
                            <Avatar
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                className={classes.orange}
                                src={accountInfo.picture_char}
                            >
                            </Avatar>
                            :
                            <Avatar
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                className={classes.orange}
                                src={"data:image/png;base64, " + accountInfo.picture_link_avatar}
                            >
                            </Avatar>
                        }
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                                marginLeft: 5,
                                marginRight: 3
                            }}>

                            <Typography variant="body2">Xin chào!</Typography>
                            <Typography variant="body2">{accountInfo.name_customer}</Typography>
                        </Box>
                    </Box>

                </Box >
            )
        }
    }
    function handleClickLogOut() {
        removeCookie('Account', { path: '/' })
        navigate('/')
        handleClose();
        window.location.reload()
    }
    return (
        <Box style={{ marginBottom: 10 }}>
            <AppBar position="fixed" elevation={0} style={{ backgroundColor: '#2d2d2d' }}>
                <Container maxWidth="xl" >
                    <Toolbar variant="dense">
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                            <img
                                src={'https://lh3.googleusercontent.com/fZCbLDJ59Ioqx7aWR0qyoBXETqQezHo-ingVbETJPLVZPgZEr4f0D1uv046V4_0_DhmDfxP-e3_Duxd3avGLFdHPrUd-VrTY=w1920-rw'}
                            />
                        </Box>
                    </Toolbar>
                    <Toolbar>
                        <Box
                            style={{
                                display: 'flex',
                                paddingTop: 2,
                                width: '15%',
                                paddingTop: 10,                             
                                paddingBottom: 15
                            }}>
                            <img src={require('../../images/Logo/logoPCOrange.png')} width='200px' />
                        </Box>

                        <Box
                            style={{
                                display: 'flex',
                                width: '60%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                sx={style}
                            >
                                <Link to="/" className={classes.toolbarTitle}>
                                    <Typography >Trang Chủ</Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={style}
                            >
                                <Link to="/search" className={classes.toolbarTitle}>
                                    <Typography>Sản Phẩm</Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={style}>
                                <Link to="/buildpc" className={classes.toolbarTitle}>
                                    <Typography>Xây Dựng Cấu Hình</Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={style}>
                                <Link to="/suggestbuildpc" className={classes.toolbarTitle}>
                                    <Typography>Tư Vấn Cấu Hình</Typography>
                                </Link>
                            </Box>
                            <SearchBar
                                className={classes.searchBar}
                                value={searchItem}
                                placeholder={"Tìm kiếm...."}
                                onChange={value => {
                                    setSearchItem(value);
                                }}
                                onRequestSearch={() => navigate('/search/?page=1&name=' + searchItem)}
                                style={{
                                    margin: "0 auto",
                                    width: 200,
                                    borderRadius: 10,
                                    backgroundColor: 'var(--background1)',
                                    color: orange[500],
                                }}
                            />
                        </Box>
                        <Link to="/cart" className={classes.toolbarTitle}>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'right',
                                    flexDirection: 'row',
                                }}>
                                <ShoppingCartOutlinedIcon fontSize="large" />
                                <Box
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        marginLeft: 2,
                                        marginRight: 3
                                    }}>
                                    <Typography variant="body2">Giỏ hàng của bạn</Typography>
                                    <Typography variant="body2">{countCart} sản phẩm</Typography>
                                </Box>
                            </Box>
                        </Link>
                        {handleShowAvatar()}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to="/account">
                                    Thông tin cá nhân
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to="/order">
                                    Quản lý đơn hàng
                                </Link>
                            </MenuItem>
                            {accountInfo.role === "staff" &&
                                <MenuItem
                                    onClick={handleClose}
                                >
                                    <a href="/admin/dashboard">Trang quản lý</a>
                                </MenuItem>
                            }

                            <MenuItem
                                onClick={handleClickLogOut}
                            >
                                Đăng xuất
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                    {/* <Toolbar variant="dense">
                        <Box
                            sx={style}
                        >
                            <Link to="/" className={classes.toolbarTitle}>
                                <Typography >Trang Chủ</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}
                        >
                            <Link to="/search" className={classes.toolbarTitle}>
                                <Typography>Sản Phẩm</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}>
                            <Link to="/buildpc" className={classes.toolbarTitle}>
                                <Typography>Xây Dựng Cấu Hình</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}>
                            <Link to="/suggestbuildpc" className={classes.toolbarTitle}>
                                <Typography>Tư Vấn Cấu Hình</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}>
                            <Link to="/" className={classes.toolbarTitle}>
                                <Typography>Chính Sách Bảo Hành</Typography>
                            </Link>
                        </Box>
                    </Toolbar> */}
                </Container>
            </AppBar>
            <Box style={{ marginBottom: 40 }}>
                <div className={classes.toolbar}></div>
                <div className={classes.toolbar}></div>
            </Box>

        </Box >
    );
};

export default Header;
