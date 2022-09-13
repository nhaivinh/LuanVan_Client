
import { Link, Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';

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
                            style={{ display: 'flex', bgcolor: "#a50a06", width: '100%', height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                        >
                            <Typography variant='h5'>
                                Danh Mục Sản Phẩm
                            </Typography>
                        </Box>
                    </ListSubheader>
                }
            >
                <Link to={"/search/?type=cpu&page=1"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MemoryIcon />
                        </ListItemIcon>
                        <Typography>Bộ Vi Xử Lý</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=gpu&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            D
                        </ListItemIcon>
                        <Typography>Card Đồ Hoạ</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=mainboard&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            D
                        </ListItemIcon>
                        <Typography>Mainboard</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=ram&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            D
                        </ListItemIcon>
                        <Typography>Ram</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=harddisk&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            D
                        </ListItemIcon>
                        <Typography>Ổ Cứng</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=psu&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            D
                        </ListItemIcon>
                        <Typography>Nguồn</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=casepc&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            D
                        </ListItemIcon>
                        <Typography>Vỏ Case</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=cooling_system&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            D
                        </ListItemIcon>
                        <Typography>Quạt Tản Nhiệt</Typography>
                    </ListItemButton>
                </Link>
            </List>
        </Box >
    )
}

export default CatergoryList