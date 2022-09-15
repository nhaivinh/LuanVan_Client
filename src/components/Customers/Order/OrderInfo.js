import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function OrderInfo() {
    return (
        <Box style={{}}>
            <Container maxWidth="lg" style={{ backgroundColor: 'rgb(248, 248, 252)', borderRadius: '10px', marginTop: 50 }}>
                <Box
                    style={{
                        display: 'flex',
                        height: 50,
                        alignItems: 'center'
                    }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/">
                            <Typography color="text.primary">Trang Chủ</Typography>
                        </Link>
                        <Typography color="text.primary">
                            Quản lý đơn hàng
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <Box style={{ height: 450 }}>
                    Jesadsada
                </Box>
            </Container>
        </Box>
    )
}

export default OrderInfo