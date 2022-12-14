import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
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
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import DecreaseCart from './DecreaseCart'
import IncreaseCart from './IncreaseCart'
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

function Cart({ resetPage, handleResetPage }) {
    const [cart, setCart] = React.useState([])
    const [cookies, setCookie] = useCookies(["user"]);

    const navigate = useNavigate();

    const [totalPrice, setTotalPrice] = React.useState(0)

    const [totalDiscount, setTotalDiscount] = React.useState(0)

    React.useEffect(() => {
        if (cookies.Account !== undefined) {
            axios.get(`https://localhost:7253/api/Cart/getcartbyid/` + cookies.Account)
                .then(res => {
                    const Cart = res.data;
                    setCart(Cart);

                    if (Cart.length === 1) {
                        setTotalPrice((Cart[0].unit_price_product * Cart[0].quantity_product_cart))
                        setTotalDiscount((Cart[0].unit_price_product * Cart[0].quantity_product_cart) * (Cart[0].discount_product * 0.01));
                    }
                    else {
                        var result = Cart.reduce((total, currentValue) =>
                            total + ((currentValue.unit_price_product * currentValue.quantity_product_cart) * (1 - currentValue.discount_product * 0.01)), 0
                        );
                        var resultDiscount = Cart.reduce((total, currentValue) =>
                            total + ((currentValue.unit_price_product * currentValue.quantity_product_cart) * (currentValue.discount_product * 0.01)), 0
                        );
                        setTotalPrice(result);
                        setTotalDiscount(resultDiscount);
                    }
                })
        } else {
            navigate("/login")
        }
    }, [resetPage])

    return (
        <Container maxWidth="lg" style={{ backgroundColor: 'var(--background1)', borderRadius: '10px', marginTop: 50, minHeight: 600 }}>
            <Box
                style={{
                    display: 'flex',
                    height: 50,
                    alignItems: 'center'
                }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/">
                        <Typography color="text.primary">Trang Ch???</Typography>
                    </Link>
                    <Typography color="text.primary">
                        Gi??? h??ng
                    </Typography>
                </Breadcrumbs>
            </Box>
            {cart.length !== 0 ?
                <Grid container spacing={2}>
                    <Grid item xs={8} >
                        <Box style={{}}>
                            <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
                                <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: '55%' }} colSpan={2}><Typography variant='h6'>Th??ng tin s???n ph???m</Typography></TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">????n gi??</TableCell>
                                            <TableCell style={{ width: '15%' }} align="left">S??? l?????ng</TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Th??nh ti???n</TableCell>
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
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                flexDirection: 'column'
                                                            }}
                                                        >
                                                            <Typography >
                                                                {(row.unit_price_product * (1 - row.discount_product * 0.01)).toLocaleString('vi-VI',
                                                                    {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    })}
                                                            </Typography>
                                                            {row.discount_product !== 0 &&
                                                                <Typography variant='body2'>
                                                                    <del>
                                                                        {row.unit_price_product.toLocaleString('vi-VI',
                                                                            {
                                                                                style: 'currency',
                                                                                currency: 'VND'
                                                                            })}
                                                                    </del>
                                                                </Typography>
                                                            }
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                flexDirection: 'column'
                                                            }}>
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}>
                                                                <DecreaseCart idAccount={row.id_account} idProduct={row.id_product} handleResetPage={handleResetPage} />
                                                                {row.quantity_product_cart}
                                                                <IncreaseCart idAccount={row.id_account} idProduct={row.id_product} handleResetPage={handleResetPage} />
                                                            </Box>
                                                            <DeleteCart idAccount={row.id_account} idProduct={row.id_product} handleResetPage={handleResetPage} />
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant='body1'>{
                                                            (row.unit_price_product * row.quantity_product_cart * (1 - row.discount_product * 0.01)).toLocaleString('vi-VI',
                                                                {
                                                                    style: 'currency',
                                                                    currency: 'VND'
                                                                })}
                                                        </Typography>
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
                            <Typography variant="h5">Thanh To??n</Typography>
                            <Typography>{"T???ng t???m t??nh: " +
                                totalPrice.toLocaleString('vi-VI',
                                    {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                            </Typography>
                            <Typography>{"Gi???m gi??: " +
                                (totalDiscount).toLocaleString('vi-VI',
                                    {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                            </Typography>
                            <Typography>{"Th??nh ti???n: " +
                                (totalPrice - totalDiscount).toLocaleString('vi-VI',
                                    {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                            </Typography>
                            <ColorButtonContained variant='contained' onClick={() => navigate('/checkout')}>?????t mua</ColorButtonContained>
                        </Box>
                    </Grid>
                </Grid>
                :
                <Box
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: 220,
                        paddingTop: 100,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <ErrorOutlineIcon sx={{ fontSize: 120, color: 'orange' }} />
                    <Typography>Gi??? h??ng ch??a c?? s???n ph???m n??o</Typography>
                    <Link to="/search">
                        <ColorButtonContained>Mua s???m ngay</ColorButtonContained>
                    </Link>
                </Box>
            }
        </Container>
    )
}

export default Cart