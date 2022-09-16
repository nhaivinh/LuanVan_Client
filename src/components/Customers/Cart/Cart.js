import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useCookies } from "react-cookie";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import DeleteCart from './DeleteCart';
function Cart() {

    const [cart, setCart] = React.useState([])
    const [cookies, setCookie] = useCookies(["user"]);


    const [totalPrice, setTotalPrice] = React.useState(0)

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Cart/getcartbyid/` + cookies.Account)
            .then(res => {
                const Cart = res.data;
                setCart(Cart);

                if (Cart.length === 1)
                    setTotalPrice(Cart[0].unit_price_product * Cart[0].quantity_product_cart)
                else {
                    var result = Cart.reduce((total, currentValue) =>
                        total + currentValue.unit_price_product, 0
                    );
                    setTotalPrice(result);
                }
            })
    }, [])
    return (
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
                        Thông tin cá nhân
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={8} >
                    <Box style={{}}>
                        <TableContainer component={Paper} sx={{maxHeight: 500}}>
                            <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '55%' }} colSpan={2}><Typography variant='h6'>Thông tin sản phẩm</Typography></TableCell>
                                        <TableCell style={{ width: '20%' }} align="left">Đơn giá</TableCell>
                                        <TableCell style={{ width: '15%' }} align="left">Số lượng</TableCell>
                                        <TableCell style={{ width: '20%' }} align="left" colSpan={2}>Thành tiền</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map(function (row) {
                                        return (
                                            <TableRow
                                                key={row.id_product}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" style={{ width: '30%' }}>
                                                    <img src={"data:image/png;base64, " + row.picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {row.name_product}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.unit_price_product}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.quantity_product_cart}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography variant='body1'>{
                                                        (row.unit_price_product * row.quantity_product_cart).toLocaleString('vi-VI',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <DeleteCart idAccount={row.id_account} idProduct={row.id_product} />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        height: 200,
                        justifyContent: 'space-around'
                    }}
                    >
                        <Typography variant="h5">Thanh Toán</Typography>
                        <Typography>{"Tổng tạm tính: " +
                            totalPrice.toLocaleString('vi-VI',
                                {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                        </Typography>
                        <Typography>{"Giảm giá: " +
                            (30000).toLocaleString('vi-VI',
                                {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                        </Typography>
                        <Typography>{"Thành tiền: " +
                            (totalPrice - 30000).toLocaleString('vi-VI',
                                {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                        </Typography>
                        <Button variant='contained'>Đặt mua</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Cart