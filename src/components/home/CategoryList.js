
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
    ListSubheader,
    Container
} from "@mui/material"
import MemoryIcon from '@mui/icons-material/Memory';


function CatergoryList() {

    return (
        <Box
            style={{
                borderRadius: '0.5rem',   
                backgroundImage: 'url("https://images.unsplash.com/photo-1566345984367-fa2ba5cedc17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
                opacity: 0.9,
                position: 'relative',
                overflow: 'hidden',
                width: '14.375rem',
                height: '28.5rem',
                zIndex: 2,
                marginTop: 20,
            }}
        >
            <List
            >
                <Link to={"/search/?type=cpu&page=1"}>
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={require('../../images/Icon/cpu.svg').default} width={40}/>
                        </ListItemIcon>
                        <Typography style={{color:'#FFA500'}}>Bộ Vi Xử Lý</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=gpu&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={require('../../images/Icon/vga.svg').default} width={40} />
                        </ListItemIcon>
                        <Typography style={{color:'#FFA500'}}>Card Đồ Hoạ</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=mainboard&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={require('../../images/Icon/main.svg').default} width={40} />
                        </ListItemIcon>
                        <Typography style={{color:'#FFA500'}}>Mainboard</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=ram&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={require('../../images/Icon/ram.svg').default} width={40} />
                        </ListItemIcon>
                        <Typography style={{color:'#FFA500'}}>Ram</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=harddisk&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={require('../../images/Icon/ssd.svg').default} width={40} />
                        </ListItemIcon>
                        <Typography style={{color:'#FFA500'}}>Ổ Cứng</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=psu&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={require('../../images/Icon/psu.svg').default} width={40} />
                        </ListItemIcon>
                        <Typography style={{color:'#FFA500'}}>Nguồn</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=casepc&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={require('../../images/Icon/case.svg').default} width={40} />
                        </ListItemIcon>
                        <Typography style={{color:'#FFA500'}}>Vỏ Case</Typography>
                    </ListItemButton>
                </Link>
                <Link to="/search/?type=cooling_system&page=1" >
                    <ListItemButton>
                        <ListItemIcon>
                            <img src={require('../../images/Icon/fan.svg').default} width={40} />
                        </ListItemIcon>
                        <Typography style={{color:'#FFA500'}}>Quạt Tản Nhiệt</Typography>
                    </ListItemButton>
                </Link>
            </List>
        </Box >
    )
}

export default CatergoryList