import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import {
    Button,
    Typography,
    IconButton,
    Box,
    TextField
} from '@material-ui/core';

const style = {

};

const Login = () => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton variant="contained" onClick={handleOpen} color="default">
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 3,
                    }}>
                    <AccountCircleOutlinedIcon fontSize="large"/>
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            marginLeft: 2,
                            marginRight: 3
                        }}>
                        <Typography>Đăng nhập</Typography>
                        <Typography>Đăng ký</Typography>
                    </Box>
                </Box>
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    height: 400,
                    backgroundColor: '#F8F8F8',
                    borderRadius: 10,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 40 }}>
                        Thêm Khách Hàng Mới
                    </Typography>
                    <TextField
                        required
                        label="Họ và Tên"
                        variant="outlined"
                    >
                    </TextField>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <Button variant="contained" >Thêm Khách Hàng</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default Login