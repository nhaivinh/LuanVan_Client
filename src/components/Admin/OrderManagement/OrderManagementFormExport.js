import React, { useRef } from 'react';
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
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import Button from '@mui/material/Button';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}

function OrderManagementFormExport({ idOrder, Order }) {
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

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
    });

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
            <Button onClick={handleOpen}><PrintIcon></PrintIcon></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Box ref={componentRef}>
                        <Grid container
                            style={{
                                borderBottom: '1px solid black',
                            }}
                        >
                            <Grid item xs={2}>
                                <Typography variant="body1" style={{ textAlign: "left", }}>
                                    LoGO
                                </Typography>
                            </Grid>
                            <Grid item xs={10}
                            >
                                <Box
                                    style={{
                                        paddingBottom: 20,
                                        paddingLeft: 20
                                    }}
                                >
                                    <Typography variant="h6" style={{ textAlign: "left", marginTop: 20 }}>
                                        <b>CÔNG TY TNHH LINH KIỆN MÁY TÍNH NHAIVINH</b>
                                    </Typography>
                                    <Typography variant="body1" style={{ textAlign: "left", }}>
                                        Địa chỉ: Số 08, đường số 6, phường Hưng Phú, quận Cái Răng, thành phố Cần Thơ
                                    </Typography>
                                    <Typography variant="body1" style={{ textAlign: "left", }}>
                                        Điện thoại: 0939450413
                                    </Typography>
                                    <Typography variant="body1" style={{ textAlign: "left", }}>
                                        Email: vinhb1805938@student.ctu.edu.vn
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box
                            style={{
                                paddingBottom: 5
                            }}
                        >
                            <Typography variant="h4" style={{ paddingBottom: 20, textAlign: "center", marginTop: 20 }}>
                                <b>HOÁ ĐƠN BÁN LẺ</b>
                            </Typography>
                        </Box>
                        <Box
                            style={{
                                paddingBottom: 20,
                                paddingLeft: 20
                            }}
                        >
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{ textAlign: "left", }}>
                                        <b>Họ tên người mua hàng:</b>  {Order.delivery_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{ textAlign: "left", }}>
                                        <b>Số điện thoại:</b> {Order.delivery_phone}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" style={{ textAlign: "left", }}>
                                <b>Địa chỉ giao hàng:</b> {Order.delivery_address}
                            </Typography>
                            <Typography variant="body1" style={{ textAlign: "left", }}>
                                <b>Hình thức thanh toán:</b> {showStatusTypePaymentOrder(Order.payment_type)}
                            </Typography>
                        </Box>
                        <Box style={{
                            marginLeft: 10,
                            marginRight: 10,
                            border: '1px solid lightgrey'
                        }}>
                            <Table sx={{ minWidth: 650, }} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '5%' }}>Số TT</TableCell>
                                        <TableCell style={{ width: '40%' }}>Tên Hàng Hoá</TableCell>
                                        <TableCell style={{ width: '15%' }}>Đơn vị tính</TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">Đơn giá</TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">Số lượng</TableCell>
                                        <TableCell style={{ width: '20%' }} align="left">Thành tiền</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailsOrder.map(function (row, index) {
                                        return (
                                            <TableRow
                                                key={row.index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="left">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {row.name_product}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    Cái
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
                                    <TableRow
                                        key={100}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell colSpan={5} component="th" scope="row" align="right">
                                            <Typography>Tổng Cộng:</Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            <Typography variant='h6'>
                                                {Order.total_payment.toLocaleString('vi-VI',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-evenly" marginTop={3}>
                        <Button variant="contained" onClick={handlePrint}>In hóa đơn</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}

export default OrderManagementFormExport