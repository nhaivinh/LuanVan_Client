
import { Link, Outlet } from 'react-router-dom';

import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    ListSubheader
} from "@mui/material"
import MemoryIcon from '@mui/icons-material/Memory';


function CatergoryList() {
    return (
        <Box
            style={{  
                borderRadius: '0.5rem',
                backgroundColor: 'rgb(255, 255, 255)',
                position: 'relative',
                overflow: 'hidden',
                width: '12.375rem',
                height: '28.5rem',
                zIndex: 2,
                marginTop: 20,
            }}
        >
            <List
                style={{ width: '100%' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader position='static' component="div" id="nested-list-subheader" color="inherit">
                        <Box
                            style={{ display: 'flex', bgcolor: "#a50a06", width: '100%', height: 100, alignItems: 'center', justifyContent:'center',borderRadius: 10 }}
                        >
                            <Typography variant='h5'>
                                Danh Mục Sản Phẩm
                            </Typography>
                        </Box>
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <ListItemIcon>
                        <MemoryIcon />
                    </ListItemIcon>
                    <Link to="/productByType/CPU" >
                        <Typography>Bộ Vi Xử Lý</Typography>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        D
                    </ListItemIcon>
                    <Link to="/productByType/GPU" >
                        <Typography>Card Đồ Hoạ</Typography>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        D
                    </ListItemIcon>
                    <Link to="/productByType/Main" >
                        <Typography>Mainboard</Typography>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        D
                    </ListItemIcon>
                    <Link to="/productByType/Ram" >
                        <Typography>Ram</Typography>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        D
                    </ListItemIcon>
                    <Link to="/productByType/Disk" >
                        <Typography>Ổ Cứng</Typography>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        D
                    </ListItemIcon>
                    <Link to="/productByType/Case" >
                        <Typography>Vỏ Case</Typography>
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        D
                    </ListItemIcon>
                    <Link to="/productByType/Fan" >
                        <Typography>Quạt Tản Nhiệt</Typography>
                    </Link>
                </ListItemButton>
            </List>
        </Box>
    )
}

export default CatergoryList