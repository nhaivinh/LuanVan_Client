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
function Checkout() {

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
                        Đặt hàng
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={8} >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            padding: 20,
                            marginBottom: 10,
                            borderRadius: 10,
                            height: 500
                        }}
                    >                        
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            padding: 20,
                            marginBottom: 10,
                            borderRadius: 10
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10
                            }}
                        >
                            <Typography variant='h5'>Thông tin đơn hàng</Typography>
                            <Link to="/cart">
                                <Typography color="text.primary">Chỉnh sửa</Typography>
                            </Link>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {cart.map(function (row) {
                                return (
                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'top',
                                            marginTop: 10
                                        }}
                                    >
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                border: '1px solid lightgray',
                                                borderRadius: 5,
                                                padding: 5
                                            }}
                                        >
                                            <img src={"data:image/png;base64, " + row.picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        </Grid>

                                        <Grid item xs={9} >
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    paddingLeft: 10
                                                }}
                                            >
                                                <Typography variant='body2'>{row.name_product}</Typography>
                                                <Typography variant='body2'>Số lượng: {row.quantity_product_cart}</Typography>
                                                <Typography>
                                                    {row.unit_price_product.toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
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

export default Checkout