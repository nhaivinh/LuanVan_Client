import React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { useCookies } from "react-cookie";
import { QuyenChung } from '../AdminHomeMenuData';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[800]),
    fontWeight: 900,
    backgroundColor: grey[800],
    '&:hover': {
        backgroundColor: grey[600],
        color: theme.palette.getContrastText(grey[600]),
    },
}));

function DashboardHome() {

    const [accountInfo, setAccountInfo] = React.useState({})
    const [roleByStaff, setRoleByStaff] = React.useState([])

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

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
        exportItems = items.filter(function (item) {
            return (
                roleStaff.includes(item.id)
            )
        })
        return (
            exportItems
        )
    }

    function showInfoStaff(items) {
        if (items !== {}) {
            return (
                <Grid container>
                    <Typography> Hãy chọn chức năng cần sử dụng:</Typography>
                    <Grid item xs={12}>
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {
                                handleRoleByStaff(QuyenChung).map((item, index) => (
                                    <Box
                                        key={index}
                                        style={{
                                            margin: 10,
                                            paddingRight: 2,
                                        }}
                                    >
                                        <Link to={item.to} key={index}>
                                            <ColorButtonContained>
                                                <Typography><b>{item.display}</b></Typography>
                                            </ColorButtonContained>
                                        </Link>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        <div>
            <h2>Chào mừng đến với trang quản lý</h2>
            {showInfoStaff(accountInfo)}
        </div>
    )
}

export default DashboardHome