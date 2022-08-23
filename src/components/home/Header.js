import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from "material-ui-search-bar";
import MenuIcon from '@material-ui/icons/Menu';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
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
    IconButton
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
        // flexGrow: 1,
    },
    searchBar: {
        // flexGrow: 1,
        alignItems: 'left'
    }
    ,
    typography: {
        padding: theme.spacing(2),
    },
}));

const style = {
    display: 'outerline',
    marginLeft: 3,
    marginRight: 3,
    ":hover": {
        backgroundColor: 'rgb(7, 177, 77, 0.42)'
    }
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
        <div className={classes.root}>
            <AppBar position="absolute" style={{ backgroundColor: '#2d2d2d' }}>
                <Container  maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Website Linh Kien
                        </Typography>
                        <SearchBar
                            className={classes.searchBar}
                            value={searchItem}
                            onChange={value => {
                                setSearchItem(value);
                            }}
                            onRequestSearch={() => console.log("onRequestSearch")}
                            style={{
                                margin: "0 auto",
                                maxWidth: 800
                            }}
                        />
                        <Link to="/cart">
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginLeft: 3,
                                }}>
                                <ShoppingCartOutlinedIcon/>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        marginLeft: 2,
                                        marginRight: 3
                                    }}>
                                    <Typography>Giỏ hàng của bạn</Typography>
                                    <Typography>0 sản phẩm</Typography>
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
                </Container>
                <Container >
                    <Toolbar>
                        <Box
                            sx={style}
                        >
                            <Link to="/" >
                                <Typography>Trang Chủ</Typography>
                            </Link>
                        </Box>
                        <Box
                            sx={style}
                        >
                            <Typography>Giới Thiệu</Typography>
                        </Box>
                        <Box
                            sx={style}>
                            <Typography>Build PC</Typography>
                        </Box>
                        <Box
                            sx={style}>
                            <Typography>Tư Vấn Cấu Hình</Typography>
                        </Box>
                        <Box
                            sx={style}>
                            <Typography>Tư Vấn Cấu Hình</Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div >
    );
};

export default Header;
