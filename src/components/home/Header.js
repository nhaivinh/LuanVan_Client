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
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import StopCircleIcon from '@mui/icons-material/StopCircle';
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
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const Dictaphone = () => {
        if (!browserSupportsSpeechRecognition) {
            return <span>Browser doesn't support speech recognition.</span>;
        }

        return (
            <div>
                {listening === true ?
                    <IconButton onClick={SpeechRecognition.stopListening}>
                        <StopCircleIcon
                            sx={{
                                backgroundColor: "red",
                                borderRadius: "50%"
                            }}
                        />
                    </IconButton>
                    :
                    <IconButton onClick={SpeechRecognition.startListening}>
                        <KeyboardVoiceIcon
                            sx={{
                                color: "orange",
                                borderRadius: "50%"
                            }}
                        />
                    </IconButton>
                }
            </div>
        );
    };

    React.useEffect(() => {
        setSearchItem(transcript);
    }, [transcript])


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
                            <Typography variant="body2">????ng nh???p</Typography>
                            <Typography variant="body2">????ng k??</Typography>
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

                            <Typography variant="body2" >Xin ch??o!</Typography>
                            <Typography variant="body2" >{accountInfo.name_customer}</Typography>
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
                    {/* <Toolbar variant="dense">
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                            <img
                                src={'https://lh3.googleusercontent.com/fZCbLDJ59Ioqx7aWR0qyoBXETqQezHo-ingVbETJPLVZPgZEr4f0D1uv046V4_0_DhmDfxP-e3_Duxd3avGLFdHPrUd-VrTY=w1920-rw'}
                            />
                        </Box>
                    </Toolbar> */}
                    <Toolbar variant="dense">
                        <Box
                            style={{
                                display: 'flex',
                                paddingTop: 2,
                                width: '10%',
                                paddingTop: 10,
                                marginRight: 50,
                                paddingBottom: 15
                            }}>
                            <Link to="/" className={classes.toolbarTitle}>
                                <img src={require('../../images/Logo/logoPCOrange.png')} width='150px' />
                            </Link>
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
                                <Link to="/search" className={classes.toolbarTitle}>
                                    <Typography>S???n Ph???m</Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={style}>
                                <Link to="/buildpc" className={classes.toolbarTitle}>
                                    <Typography>X??y D???ng C???u H??nh</Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={style}>
                                <Link to="/suggestbuildpc" className={classes.toolbarTitle}>
                                    <Typography>T?? V???n C???u H??nh</Typography>
                                </Link>
                            </Box>
                            <SearchBar
                                className={classes.searchBar}
                                value={searchItem}
                                placeholder={"T??m ki???m...."}
                                onChange={value => {
                                    setSearchItem(value);
                                }}
                                onRequestSearch={() => navigate('/search/?page=1&name=' + searchItem)}
                                style={{
                                    margin: "0 auto",
                                    width: 250,
                                    borderRadius: 10,
                                    backgroundColor: 'var(--background1)',
                                    color: orange[500],
                                }}
                            />
                            <Dictaphone />
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                width: '25%',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}
                        >
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
                                            marginRight: 10
                                        }}>
                                        <Typography variant="body2">Gi??? h??ng c???a b???n</Typography>
                                        <Typography variant="body2">{countCart} s???n ph???m</Typography>
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
                                        Th??ng tin c?? nh??n
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Link to="/order">
                                        Qu???n l?? ????n h??ng
                                    </Link>
                                </MenuItem>
                                {accountInfo.role === "staff" &&
                                    <MenuItem
                                        onClick={handleClose}
                                    >
                                        <a href="/admin/dashboard">Trang qu???n l??</a>
                                    </MenuItem>
                                }

                                <MenuItem
                                    onClick={handleClickLogOut}
                                >
                                    ????ng xu???t
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                    {/* <Toolbar variant="dense">
                        <Box
                            sx={style}
                        >
                            <Link to="/" className={classes.toolbarTitle}>
                                <Typography >Trang Ch???</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}
                        >
                            <Link to="/search" className={classes.toolbarTitle}>
                                <Typography>S???n Ph???m</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}>
                            <Link to="/buildpc" className={classes.toolbarTitle}>
                                <Typography>X??y D???ng C???u H??nh</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}>
                            <Link to="/suggestbuildpc" className={classes.toolbarTitle}>
                                <Typography>T?? V???n C???u H??nh</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}>
                            <Link to="/" className={classes.toolbarTitle}>
                                <Typography>Ch??nh S??ch B???o H??nh</Typography>
                            </Link>
                        </Box>
                    </Toolbar> */}
                </Container>
            </AppBar>
            <Box style={{ marginBottom: 20 }}>
                <div className={classes.toolbar}></div>
                {/* <div className={classes.toolbar}></div> */}
            </Box>

        </Box >
    );
};

export default Header;
