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

const Register = ({handleCloseLogin}) => {


    
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        handleCloseLogin();
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen} color="default">Đăng Ký</Button>
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
                    width: 400,
                    height: 400,
                    backgroundColor: '#F8F8F8',
                    borderRadius: 10,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Stack direction="column" spacing={2} alignItems="center" marginBottom={5}>
                        <Typography variant="h4">Đăng Ký Tài Khoản</Typography>
                    </Stack>
                    <Stack direction="column" spacing={2} alignItems="center" marginBottom={5}>
                        <TextField
                            required
                            label="Tên"
                            variant="outlined"
                        >
                        </TextField>
                        <TextField
                            required
                            label="Họ và Tên"
                            variant="outlined"
                        >
                        </TextField>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="outlined" >Đăng Ký</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default Register