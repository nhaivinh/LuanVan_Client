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
    width: 1200,
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

function SupplierFormView({ Staff }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [importedProducts, setImportedProducts] = React.useState([])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Supplier/getImportedProductByIDSupplier/` + Staff.id_supplier)
            .then(res => {
                const ImportedProducts = res.data;
                setImportedProducts(ImportedProducts);
            })
    }, [])

    function showGender(gender) {
        switch (gender) {
            case 'male':
                return (
                    'Nam'
                )
            case 'female':
                return (
                    'Nữ'
                )
            case 'other':
                return (
                    'Khác'
                )
            default:
                break;
        }
    }

    function showImportedProducts(products) {
        if (products.length !== 0)
            return (
                <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                    <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '5%' }} align="left">Mã nhập hàng</TableCell>
                                <TableCell style={{ width: '60%' }} colSpan={2}><Typography variant='body1'>Thông tin sản phẩm</Typography></TableCell>
                                <TableCell style={{ width: '20%' }} align="left">Đơn giá nhập</TableCell>
                                <TableCell style={{ width: '15%' }} align="left">Số lượng </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                products.map(function (row) {
                                    return (
                                        <TableRow
                                            key={row.id_product}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="left">
                                                {row.id_import_note}
                                            </TableCell>
                                            <TableCell component="th" scope="row" style={{ width: '15%' }}>
                                                {row.picture_product !== null ?
                                                    <img src={row.picture_product} alt="product" width={'100%'} height={'100%'} />
                                                    :
                                                    <img src={"data:image/png;base64, " + row.picture_link_product} alt="product" width={'100%'} height={'100%'} />
                                                }
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="left">
                                                {row.name_product}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}
                                                >
                                                    <Typography >
                                                        {(row.unit_price_import).toLocaleString('vi-VI',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography variant='body1'>
                                                    {row.quantity_import_product}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        else {
            return (
                <Typography variant='h6'>Chưa nhập hàng từ nhà cung cấp này</Typography>
            )
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
                            Thông tin chi tiết nhà cung cấp
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={3} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Mã nhà cung cấp: {Staff.id_supplier}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Tên nhà cung cấp: {Staff.name_supplier}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Địa chỉ: {Staff.address_supplier}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Số điện thoại: {Staff.phone_number_supplier}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Email: {Staff.email_supplier}
                            </Typography>
                        </Grid>
                        <Grid item xs={9} >
                            <Box style={{}}>
                                {showImportedProducts(importedProducts)}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}

export default SupplierFormView