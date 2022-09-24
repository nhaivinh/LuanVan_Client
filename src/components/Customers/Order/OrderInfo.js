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
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import ShowDetailsOrder from './ShowDetailsOrder'

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
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={statusValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Tất cả" value="-1" />
                                <Tab label="Chưa duyệt" value="0" />
                                <Tab label="Đã duyệt" value="1" />
                                <Tab label="Đang vận chuyển" value="2" />
                                <Tab label="Đã giao" value="3" />
                                <Tab label="Đã hủy" value="4" />
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
                <Box style={{ height: 450 }}>
                    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                        <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '10%' }} ><Typography variant='body2'>Mã số</Typography></TableCell>
                                    <TableCell style={{ width: '15%' }} align="left">Tên người nhận</TableCell>
                                    <TableCell style={{ width: '20%' }} align="left">Hình thức thanh toán</TableCell>
                                    <TableCell style={{ width: '15%' }} align="left">Ngày đặt hàng</TableCell>
                                    <TableCell style={{ width: '15%' }} align="left">Tổng tiền</TableCell>
                                    <TableCell style={{ width: '15%' }} align="left">Trạng thái</TableCell>
                                    <TableCell style={{ width: '10%' }} align="left">Thao tác</TableCell>
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
                                                    {row.delivery_name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {showStatusPaymentOrder(row.payment_type)}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {getFormattedDate(new Date(row.order_date))}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.total_payment}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {showStatusOrder(row.delivery_status)}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <ShowDetailsOrder Order={row} idOrder={row.id_order}/>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container >
        </Box >
    )
}

export default OrderInfo