import * as React from 'react';
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


function AdminHomePage() {

    // Chiều dài của menu
    const drawerWidth = 300;
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

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const [open1, setOpen1] = React.useState(false);

    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

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
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Website Linh Kiện Máy Tính
                    </Typography>

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
                {/* <Divider />
                {
                    QuyenChung.map(item => (
                        
                        <Link to={item.path} className="Home__Link" key={item.title}>
                            <List
                                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                key={item.id}
                            >
                                <ListItem disablePadding
                                    sx={{ color: "var(--color2)" }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            marginLeft: '15px',
                                        }}>
                                        <i className={item.icon}></i>
                                    </ListItemIcon>

                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText  primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>
                                </ListItem>
                                <Divider />
                            </List>
                        </Link>
                    ))
                } */}
            </Drawer>

            <Main open={open}>
                <DrawerHeader />

                <Outlet />
            </Main>
        </Box >
    )
}

export default AdminHomePage