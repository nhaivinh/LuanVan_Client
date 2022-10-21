
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
                backgroundImage: 'url("https://img.freepik.com/free-photo/low-angle-shot-mesmerizing-starry-sky_181624-27925.jpg?w=1380&t=st=1666258139~exp=1666258739~hmac=b72c76165a7faf4a469076d17d8a549d1b935c30f8531641318bc41a527610a3")',
                opacity: 0.8,
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