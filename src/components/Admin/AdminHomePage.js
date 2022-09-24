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
import { Link, Outlet } from 'react-router-dom';
import { Container } from '@mui/system';

function AdminHomePage() {

    // Chiều dài của menu
    const drawerWidth = 260;
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
                    {/* <img src={logo} href='Logo' style={{ width: '50px' }} /> */}

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {
                    QuyenChung.map(item => (
                        // List
                        <List
                            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                            key={item.id}
                        >
                            {/* UL */}
                            <ListItem disablePadding
                                sx={{ color: "var(--color2)" }}
                            >

                                {/* Icon */}
                                <ListItemIcon
                                    sx={{
                                        marginLeft: '15px',
                                    }}>
                                    <i className={item.icon}></i>
                                </ListItemIcon>

                                {/* Text */}
                                <ListItemText primary={item.title} />
                            </ListItem>
                            {/* LI */}
                            {item.child.map(itemchild => (
                                <Link to={itemchild.path} className="Home__Link" key={itemchild.title}>
                                    <ListItem disablePadding >
                                        <ListItemButton>
                                            <ListItemText inset primary={itemchild.title} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                            <Divider />

                        </List>

                    ))
                }

            </Drawer>
            {/* Content */}

            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    )
}

export default AdminHomePage