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

function OrderManagementFormView({ idOrder, Order }) {
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
                    "??ang ch??? duy???t"
                )
            case 1:
                return (
                    "???? duy???t"
                )
            case 2:
                return (
                    "??ang v???n chuy???n"
                )
            case 3:
                return (
                    "???? giao"
                )
            case 4:
                return (
                    "???? h???y"
                )
            default:
                break;
        }
    }

    function showStatusTypePaymentOrder(status) {
        switch (status) {
            case "cod":
                return (
                    "Giao h??ng nh???n ti???n"
                )
            case "card":
                return (
                    "Thanh to??n tr???c tuy???n"
                )
            default:
                break;
        }
    }

    function showStatusPaymentOrder(status) {
        switch (status) {
            case 0:
                return (
                    "Ch??a thanh to??n"
                )
            case 1:
                return (
                    "???? thanh to??n"
                )
            default:
                break;
        }
    }

    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="primary">
                <Tooltip title="Xem Chi Ti???t">
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
                            Chi Ti???t ????n H??ng: {idOrder}
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Ng?????i nh???n: {Order.delivery_name}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                ?????a ch??? nh???n: {Order.delivery_address}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                S??? ??i???n tho???i: {Order.delivery_phone}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                H??nh th???c thanh to??n: {showStatusTypePaymentOrder(Order.payment_type)}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Tr???ng th??i thanh to??n: {showStatusPaymentOrder(Order.payment_status)}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Tr???ng th??i ????n h??ng: {showStatusOrder(Order.delivery_status)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                M?? nh??n vi??n:  &nbsp;
                                {
                                    Order.id_staff === null ?
                                        "Ch??a c??"
                                        :
                                        Order.id_staff
                                }
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                T???ng ti???n h??ng:  &nbsp;
                                {
                                    Order.total_payment.toLocaleString('vi-VI',
                                        {
                                            style: 'currency',
                                            currency: 'VND'
                                        })
                                }
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Ph?? v???n chuy???n:  &nbsp;
                                {Order.delivery_price !== null ?
                                    Order.delivery_price.toLocaleString('vi-VI',
                                        {
                                            style: 'currency',
                                            currency: 'VND'
                                        })
                                    :
                                    'Ch??a x??c ?????nh'
                                }
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                T???ng ti???n thanh to??n:  &nbsp;
                                {
                                    Order.delivery_price !== null ?
                                        (Order.total_payment + Order.delivery_price).toLocaleString('vi-VI',
                                            {
                                                style: 'currency',
                                                currency: 'VND'
                                            })
                                        :
                                        (Order.total_payment).toLocaleString('vi-VI',
                                            {
                                                style: 'currency',
                                                currency: 'VND'
                                            })
                                }
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Ng??y ?????t h??ng: {getFormattedDate(new Date(Order.order_date))}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Ng??y giao h??ng: &nbsp;
                                {Order.delivery_date !== null ?
                                    getFormattedDate(new Date(Order.delivery_date))
                                    :
                                    " Ch??a giao h??ng"
                                }
                            </Typography>
                        </Grid>
                        <Box style={{}}>
                            <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
                                <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: '40%' }} colSpan={2}><Typography variant='h6'>Th??ng tin s???n ph???m</Typography></TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">????n gi??</TableCell>
                                            <TableCell style={{ width: '15%' }} align="left">S??? l?????ng</TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Th??nh ti???n</TableCell>
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

export default OrderManagementFormView