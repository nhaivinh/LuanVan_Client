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

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}

function CustomerFormView({ Customer }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

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
                            Thông tin chi tiết khách hàng
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Mã khách hàng : {Customer.id_customer}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Họ và tên: {Customer.name_customer}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Email: {Customer.email_customer}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Căn cước công dân: {Customer.identity_card_customer}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Số điện thoại: {Customer.phone_number_customer}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Giới tính: {showGender(Customer.gender_customer)}
                            </Typography>

                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Sinh nhật: &nbsp;
                                {Customer.date_of_birth_customer !== null ?
                                    getFormattedDate(new Date(Customer.date_of_birth_customer))
                                    :
                                    "Chưa có thông tin"
                                }
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Ngày đăng ký: &nbsp;
                                {Customer.register_date !== null ?
                                    getFormattedDate(new Date(Customer.register_date))
                                    :
                                    "Chưa có thông tin"
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}

export default CustomerFormView