import * as React from 'react';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { QuyenChung } from './AdminHomeMenuData'
// import logo from '../../image/Logo.jpg';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/system';
import Sidebar from './Sidebar/Sidebar';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Admin/Sidebar/sidebar.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCookies, removeCookie } from "react-cookie";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function AdminHomePage() {

    // Chiều dài của menu
    const drawerWidth = 270;
    // đặt lại nội dung sau khi mở
    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        }),
    );

    // Đặt lại chiều dài của AppBar
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    //  CSS cho item bên trong menu
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));



    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleClickLogOut() {
        removeCookie('Account', { path: '/' })
        handleClose();
        window.location.reload()
    }

    const [accountInfo, setAccountInfo] = React.useState({})

    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const openAvatar = Boolean(anchorEl);

    React.useEffect(() => {
        if (cookies.Account !== undefined) {
            axios.get(`https://localhost:7253/api/Login/getinfobyid/` + cookies.Account)
                .then(res => {
                    const AccountInfo = res.data;
                    setAccountInfo(AccountInfo[0]);
                })
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 100);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname;
        const activeItem = QuyenChung.findIndex(item => item.to === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{ backgroundColor: '#2d2d2d' }}>
                <Toolbar >
                    <Box
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <a href="/">
                                <Box
                                    style={{
                                        display: 'flex',
                                        paddingTop: 10,
                                        paddingBottom: 15,
                                        width: 100,
                                    }}>
                                    <img src={require('../../images/Logo/logoPCWhite.png')} width='160px' />
                                </Box>
                            </a>
                        </Box>
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
                        </Box>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={openAvatar}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                    {/* <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openAvatar}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>
                            <Link to="/account">
                                Thông tin cá nhân
                            </Link>
                        </MenuItem>
                        {accountInfo.role === "staff" &&
                            <MenuItem
                                onClick={handleClose}
                            >
                                <Link to="/admin/dashboard">
                                    Trang quản lý
                                </Link>
                            </MenuItem>
                        }

                        <MenuItem
                            onClick={handleClickLogOut}
                        >
                            Đăng xuất
                        </MenuItem>
                    </Menu> */}
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },

                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingLeft: '35px',
                        paddingRight: '10px'
                    }}>
                </DrawerHeader>

                <div className='sidebar'>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <div ref={sidebarRef} className="sidebar__menu">
                        <div
                            ref={indicatorRef}
                            className="sidebar__menu__indicator"
                            style={{
                                transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                            }}
                        ></div>
                        {
                            QuyenChung.map((item, index) => (
                                <Link to={item.to} key={index}>
                                    <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                        <div className="sidebar__menu__item__icon">
                                            {item.icon}
                                        </div>
                                        <div className="sidebar__menu__item__text">
                                            {item.display}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>;
            </Drawer>

            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box >
    )
}

export default AdminHomePage