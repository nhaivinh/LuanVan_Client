import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};
const Info__style = {
    display: 'flex',
    width: 600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10
};
function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}

function ShowDetailsOrder({ idOrder, Order }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [detailsOrder, setDetailsOrder] = React.useState([]);

    React.useEffect(() => {
        axios.get(`https://localhost:7253/getdetailsorderbyidorder/` + idOrder)
            .then(res => {
                const Orders = res.data;
                setDetailsOrder(Orders);
            })
    }, [])

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

    function showStatusTypePaymentOrder(status) {
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

    function showStatusPaymentOrder(status) {
        switch (status) {
            case 0:
                return (
                    "Chưa thanh toán"
                )
            case 1:
                return (
                    "Đã thanh toán"
                )
            default:
                break;
        }
    }

    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="primary">
                <Tooltip title="Xem Chi Tiết">
                    <VisibilityIcon
                        sx={{ color: 'var(--color7)' }}
                    />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={1} alignItems="flex-end" justifyContent="space-between" marginBottom={5}>
                        <Typography variant="h6">
                            Chi Tiết Đơn Hàng: {idOrder}
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Người nhận: {Order.delivery_name}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Địa chỉ nhận: {Order.delivery_address}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Số điện thoại: {Order.delivery_phone}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Hình thức thanh toán: {showStatusTypePaymentOrder(Order.payment_type)}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Trạng thái thanh toán: {showStatusPaymentOrder(Order.payment_status)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Tổng tiền:  &nbsp;
                                {
                                    Order.total_payment.toLocaleString('vi-VI',
                                        {
                                            style: 'currency',
                                            currency: 'VND'
                                        })
                                }
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Trạng thái đơn hàng: {showStatusOrder(Order.delivery_status)}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Ngày đặt hàng: {getFormattedDate(new Date(Order.order_date))}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Ngày giao hàng: &nbsp;
                                {Order.delivery_date !== null ?
                                    getFormattedDate(new Date(Order.delivery_date))
                                    :
                                    " Chưa giao hàng"
                                }
                            </Typography>
                        </Grid>
                        <Box style={{}}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: '40%' }} colSpan={2}><Typography variant='h6'>Thông tin sản phẩm</Typography></TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Đơn giá</TableCell>
                                            <TableCell style={{ width: '15%' }} align="left">Số lượng</TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Thành tiền</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {detailsOrder.map(function (row) {
                                            return (
                                                <TableRow
                                                    key={row.id_product}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" style={{ width: '20%' }}>
                                                        {row.picture_product !== null ?
                                                            <img src={row.picture_product} alt="product" width='100%' />
                                                            :
                                                            <img src={"data:image/png;base64, " + row.picture_link_product} alt="product" width='100%' />
                                                        }
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
                                                                {(row.unit_price_order).toLocaleString('vi-VI',
                                                                    {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    })}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant='body1'>
                                                            {row.quantity_product_order}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant='body1'>
                                                            {(row.quantity_product_order * row.unit_price_order).toLocaleString('vi-VI',
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
                </Box>
            </Modal>
        </div >
    );
}

export default ShowDetailsOrder