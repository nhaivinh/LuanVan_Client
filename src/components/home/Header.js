import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";
import MenuIcon from '@material-ui/icons/Menu';
import { deepOrange, deepPurple, orange } from '@material-ui/core/colors';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import { Link, Outlet } from 'react-router-dom';

import Login from '../Customers/Account/Login'

import {
    AppBar,
    Toolbar,
    Button,
    Popover,
    Avatar,
    Typography,
    Container,
    IconButton,
} from '@material-ui/core';

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
        flexGrow: 1,
    },
    searchBar: {
        flexGrow: 2,
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

const Header = () => {

    const classes = useStyles();
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [searchItem, setSearchItem] = useState("");

    return (
        <Box style={{ marginBottom: 10 }}>
            <AppBar position="fixed" elevation={0} style={{ backgroundColor: '#2d2d2d' }}>
                <Container maxWidth="lg" >
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
                        <Typography variant="h6" className={classes.title}>
                            Website Linh Kiện
                        </Typography>
                        <SearchBar
                            className={classes.searchBar}
                            value={searchItem}
                            onChange={value => {
                                setSearchItem(value);
                            }}
                            onRequestSearch={() => console.log({ searchItem })}
                            style={{
                                margin: "0 auto",
                                maxWidth: 800
                            }}
                        />
                        <Link to="/cart" className={classes.toolbarTitle}>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginLeft: 50,
                                }}>
                                <ShoppingCartOutlinedIcon fontSize="large"/>
                                <Box
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        marginLeft: 2,
                                        marginRight: 3
                                    }}>
                                    <Typography variant="body2">Giỏ hàng của bạn</Typography>
                                    <Typography variant="body2">0 sản phẩm</Typography>
                                </Box>
                            </Box>
                        </Link>                       
                        {/* <Avatar
                            className={classes.orange}
                            aria-describedby={id}
                            onClick={handleClick}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRagbYnTTxSnZDFEKCTsewsoiGdPymC_P-PYqElA1b57xMOEvGiI2rOghDqh7vQ_DNVZkE&usqp=CAU"
                        ></Avatar> */}
                        <Login />
                    </Toolbar>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Typography className={classes.typography}>Chỉnh sửa thông tin cá nhân</Typography>
                    </Popover>
                    <Toolbar variant="dense">
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
                            <Link to="/" className={classes.toolbarTitle}>
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
                    </Toolbar>
                </Container>
            </AppBar>
            <Box style={{ marginBottom: 40 }}>
                <div className={classes.toolbar}></div>
                <div className={classes.toolbar}></div>
            </Box>

        </Box>
    );
};

export default Header;
