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

function ImportProductFormView({ ImportNotes }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [detailImportNotes, setDetailImportNotes] = React.useState([])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/DetailImportNote/getdetailsimportnotebyid/` + ImportNotes.id_import_note)
            .then(res => {
                const DetailImportNotes = res.data;
                setDetailImportNotes(DetailImportNotes);
            })
    }, [])
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
                            Chi Tiết Đợt Nhập Hàng: {ImportNotes.idOrder}
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                        Nhà cung cấp: {ImportNotes.name_supplier}
                    </Typography>
                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                        Nhân viên nhập hàng: {ImportNotes.name_staff}
                    </Typography>
                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                        Ngày nhập hàng: {getFormattedDate(new Date(ImportNotes.import_date))}
                    </Typography>
                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                        Tổng tiền nhập hàng: {ImportNotes.total_price_import.toLocaleString('vi-VI',
                            {
                                style: 'currency',
                                currency: 'VND'
                            })}
                    </Typography>
                    <Typography variant="h6" style={{ paddingBottom: 20 }}>
                        Chi tiết sản phẩm
                    </Typography>
                    <Box>
                        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                            <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '10%' }}> Mã sản phẩm</TableCell>
                                        <TableCell style={{ width: '10%' }} align="left">Ảnh</TableCell>
                                        <TableCell style={{ width: '30%' }} align="left">Tên sản phẩm</TableCell>
                                        <TableCell style={{ width: '25%' }} align="left">Số lượng nhập</TableCell>
                                        <TableCell style={{ width: '25%' }} align="left">Giá nhập</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailImportNotes.map(function (row) {
                                        return (
                                            <TableRow
                                                key={row.id_product}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.id_product}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <img src={"data:image/png;base64, " + row.picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    <Typography variant='body2'>{row.name_product}</Typography>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    <Typography variant='body1'>{row.quantity_import_product}</Typography>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="left">
                                                    <Typography variant='body1'>{row.unit_price_import.toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}

export default ImportProductFormView