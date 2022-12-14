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
                                <Box
                                    style={{
                                        paddingTop: 30,
                                        paddingLeft: 20
                                    }}>
                                    <img src={require('../../../images/Logo/logoPC.png')} width='100%' />
                                </Box>
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
                                        <b>C??NG TY TNHH LINH KI???N M??Y T??NH TENNO</b>
                                    </Typography>
                                    <Typography variant="body1" style={{ textAlign: "left", }}>
                                        ?????a ch???: S??? 08, ???????ng s??? 6, ph?????ng H??ng Ph??, qu???n C??i R??ng, th??nh ph??? C???n Th??
                                    </Typography>
                                    <Typography variant="body1" style={{ textAlign: "left", }}>
                                        ??i???n tho???i: 0939450413
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
                                <b>HO?? ????N B??N L???</b>
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
                                        <b>H??? t??n ng?????i mua h??ng:</b>  {Order.delivery_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{ textAlign: "left", }}>
                                        <b>S??? ??i???n tho???i:</b> {Order.delivery_phone}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" style={{ textAlign: "left", }}>
                                <b>?????a ch??? giao h??ng:</b> {Order.delivery_address}
                            </Typography>
                            <Typography variant="body1" style={{ textAlign: "left", }}>
                                <b>H??nh th???c thanh to??n:</b> {showStatusTypePaymentOrder(Order.payment_type)}
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
                                        <TableCell style={{ width: '5%' }}>S??? TT</TableCell>
                                        <TableCell style={{ width: '40%' }}>T??n H??ng Ho??</TableCell>
                                        <TableCell style={{ width: '15%' }}>????n v??? t??nh</TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">????n gi??</TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">S??? l?????ng</TableCell>
                                        <TableCell style={{ width: '20%' }} align="left">Th??nh ti???n</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailsOrder.map(function (row, index) {
                                        return (
                                            <TableRow
                                                key={row.id_product}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="left">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    {row.name_product}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    C??i
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
                                        key={-1}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell colSpan={5} component="th" scope="row" align="right">
                                            <Typography>T???ng Ti???n H??ng:</Typography>
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
                                    <TableRow
                                        key={-2}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell colSpan={5} component="th" scope="row" align="right">
                                            <Typography>Ph?? v???n chuy???n:</Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            <Typography variant='h6'>
                                                {
                                                    Order.delivery_price !== null ?
                                                        (Order.delivery_price).toLocaleString('vi-VI',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })
                                                        :
                                                        (0).toLocaleString('vi-VI',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })
                                                }
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={-3}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell colSpan={5} component="th" scope="row" align="right">
                                            <Typography>T???ng thanh to??n:</Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            <Typography variant='h6'>
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
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-evenly" marginTop={3}>
                        <Button variant="contained" onClick={handlePrint}>In h??a ????n</Button>
                        <Button variant="contained" onClick={handleClose}>Hu???</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}

export default OrderManagementFormExport