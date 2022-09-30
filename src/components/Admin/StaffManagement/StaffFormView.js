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

function StaffFormView({ Staff }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [roles, setRoles] = React.useState([])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Staff/getRoleStaff`)
            .then(res => {
                const Roles = res.data;
                setRoles(Roles);
            })
    }, [])

    function showRole(IDStaff) {
        var filteredRoles = roles
        filteredRoles = roles.filter(function (role) {
            return (role.id_staff === IDStaff)
        })
        var result = filteredRoles.reduce((total, currentValue) =>
            total + currentValue.name_permission + " |\n", ""
        );
        return (
            result
        )
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
                            Thông tin chi tiết nhân viên
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Mã nhân viên: {Staff.id_staff}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Họ và tên: {Staff.name_staff}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Địa chỉ: {Staff.address_staff}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Email: {Staff.email_staff}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Số điện thoại: {Staff.phone_number_staff}
                            </Typography>
                            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                Chức vụ: {Staff.position}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography>
                                Các chức năng có thể sử dụng:
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}

export default StaffFormView