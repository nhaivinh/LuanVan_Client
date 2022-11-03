import * as React from 'react';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { QuyenChung } from './AdminHomeMenuData'
// import logo from '../../image/Logo.jpg';
import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Admin/Sidebar/sidebar.scss';
import Avatar from '@mui/material/Avatar';
import { useCookies } from "react-cookie";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

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


    const navigate = useNavigate();
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

    const handleClick = () => {
        navigate('/admin/info')
    };

    const handleClickLogOut = () => {
        removeCookie('Account', { path: '/' })
        navigate('/')
        window.location.reload()
    };

    const [accountInfo, setAccountInfo] = React.useState({})
    const [roleByStaff, setRoleByStaff] = React.useState([])

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

    React.useEffect(() => {
        if (accountInfo.id_staff !== undefined) {
            axios.get(`https://localhost:7253/api/Staff/getRoleStaffByID/` + accountInfo.id_staff)
                .then(res => {
                    const RoleByStaff = res.data;
                    setRoleByStaff(RoleByStaff);
                })
        }
    }, [accountInfo])

    function handleRoleByStaff(items) {
        let exportItems = []
        let roleStaff = roleByStaff.map(function (item) {
            return (item.id_permission)
        })
        roleStaff.push(0)
        roleStaff.push(-1)
        exportItems = items.filter(function (item) {
            return (
                roleStaff.includes(item.id)
            )
        })
        return (
            exportItems
        )
    }

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
        const activeItem = handleRoleByStaff(QuyenChung).findIndex(item => item.to === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    function handleShowAvatar() {
        if (cookies.Account === undefined) {
            return (
                <Link to="/login">
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
                        onClick={handleClick}
                        style={{
                            display: 'flex',
                            cursor: 'pointer'
                        }}>
                        {accountInfo.picture_char !== null ?
                            <Avatar
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                src={accountInfo.picture_char}
                            >
                            </Avatar>
                            :
                            <Avatar
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
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
                            <Typography variant="body2" >Xin chào!</Typography>
                            <Typography variant="body2" >{accountInfo.name_staff}</Typography>
                        </Box>
                        <Button
                            onClick={handleClickLogOut}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: 20,
                                color: 'white'
                            }}
                        >
                            <LogoutIcon />
                            <Typography variant='body2'>Đăng xuất</Typography>
                        </Button>
                    </Box>
                </Box >
            )
        }
    }

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

                            <Link to="/admin/dashboard">
                                <Box
                                    style={{
                                        display: 'flex',
                                        paddingTop: 10,
                                        paddingBottom: 15,
                                        width: 100,
                                    }}>
                                    <img src={require('../../images/Logo/logoPCWhite.png')} width='160px' />
                                </Box>
                            </Link>
                        </Box>
                        {handleShowAvatar()}
                    </Box>
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
                        >
                        </div>
                        {
                            handleRoleByStaff(QuyenChung).map((item, index) => (
                                <Link to={item.to} key={index}>
                                    <div className={`sidebar__menu__item ${activeIndex === (index) ? 'active' : ''}`}>
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