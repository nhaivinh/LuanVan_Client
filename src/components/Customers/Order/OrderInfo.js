import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useCookies } from "react-cookie";
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import Grid from '@mui/material/Grid';
import ShowDetailsOrder from './ShowDetailsOrder'
import RateProducts from './RateProducts';
import Tab from '@mui/material/Tab';
import { Button, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: orange[500],
        left: 0,
        paddingLeft: 10,
        borderRadius: 10
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(orange[800]),
    '&:hover': {
        color: orange[700],
        opacity: 1,
    },
    '&.Mui-selected': {
        color: orange[400],
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}

function OrderInfo() {

    const [orders, setOrders] = React.useState([])
    const [cookies, setCookie] = useCookies(["user"]);

    const [resetPage, setResetPage] = React.useState(false);

    const [statusValue, setStatusValue] = React.useState('-1');

    const handleChange = (event, newValue) => {
        setStatusValue(newValue);
    };

    React.useEffect(() => {
        axios.get(`https://localhost:7253/getorderbyidaccount/` + cookies.Account)
            .then(res => {
                const Orders = res.data;
                setOrders(Orders);
            })
    }, [resetPage])

    function showStatusOrder(status) {
        switch (status) {
            case 0:
                return (
                    "Đang chờ duyệt"
                )
            case 1:
                return (
                    "Đã duyệt"
                )
            case 2:
                return (
                    "Đang vận chuyển"
                )
            case 3:
                return (
                    "Đã giao"
                )
            case 4:
                return (
                    "Đã hủy"
                )
            default:
                break;
        }
    }

    function showStatusPaymentOrder(status) {
        switch (status) {
            case "cod":
                return (
                    "Giao hàng nhận tiền"
                )
            case "card":
                return (
                    "Thanh toán trực tuyến"
                )
            default:
                break;
        }
    }

    function handleFilterOrders(Orders) {
        var filteredOrders = Orders
        if (statusValue != -1) {
            filteredOrders = Orders.filter(function (order) {
                return (order.delivery_status == statusValue)
            })
        }
        return filteredOrders
    }

    return (
        <Box style={{}}>
            <Container maxWidth="lg" style={{ backgroundColor: 'var(--background1)', borderRadius: '10px', marginTop: 70, paddingLeft: 0 }}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <Grid container spacing={2} minHeight={700}>
                        <Grid item xs={2} style={{ paddingTop: 0 }}>
                            <Box sx={{ width: '100%', typography: 'body1', backgroundColor: 'rgb(45, 45, 45)', height: '100%', borderStartStartRadius: 10, borderBottomLeftRadius: 10 }}>
                                <AntTabs
                                    orientation="vertical"
                                    value={statusValue}
                                    onChange={handleChange}
                                >
                                    <AntTab label="Tất cả" value="-1" />
                                    <AntTab label="Chưa duyệt" value="0" />
                                    <AntTab label="Đã duyệt" value="1" />
                                    <AntTab label="Đang vận chuyển" value="2" />
                                    <AntTab label="Đã giao" value="3" />
                                    <AntTab label="Đã hủy" value="4" />
                                </AntTabs>
                            </Box>
                        </Grid>
                        <Grid item xs={10} style={{ paddingTop: 0 }}>
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
                            <Box style={{ height: 650 }}>
                                <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
                                    <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ width: '10%' }} ><Typography variant='body2'>Mã số</Typography></TableCell>
                                                <TableCell style={{ width: '20%' }} align="left">Hình thức thanh toán</TableCell>
                                                <TableCell style={{ width: '20%' }} align="left">Ngày đặt hàng</TableCell>
                                                <TableCell style={{ width: '20%' }} align="left">Tổng tiền</TableCell>
                                                <TableCell style={{ width: '10%' }} align="left">Thao tác</TableCell>
                                                <TableCell style={{ width: '20%' }} align="left">Trạng thái</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {handleFilterOrders(orders)
                                                .map(function (row) {
                                                    return (
                                                        <TableRow
                                                            key={row.id_order}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row" align="left">
                                                                {row.id_order}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {showStatusPaymentOrder(row.payment_type)}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {getFormattedDate(new Date(row.order_date))}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {row.total_payment.toLocaleString('vi-VI',
                                                                    {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    })}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Box
                                                                    style={{ display: 'flex', justifyContent: 'left' }}
                                                                >
                                                                    <ShowDetailsOrder Order={row} idOrder={row.id_order} />
                                                                    {
                                                                        row.delivery_status === 3 &&
                                                                        <RateProducts Order={row} idOrder={row.id_order} />
                                                                    }
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {showStatusOrder(row.delivery_status)}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container >
        </Box >
    )
}

export default OrderInfo