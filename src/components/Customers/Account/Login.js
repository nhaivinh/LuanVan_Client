import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography,
    IconButton,
    Box,
    TextField
} from '@material-ui/core';

import Register from "./Register";

const useStyles = makeStyles({
    button: {
      color: '#ffa500',
      '&:hover': {
        color: '#fff',
    },
  }})

const Login = () => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton variant="text" onClick={handleOpen} className={classes.button}>
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginLeft: 3,
                    }}>
                    <AccountCircleOutlinedIcon fontSize="large" />
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
                        <Typography variant="h4">Đăng Nhập</Typography>
                    </Stack>
                    <Stack direction="column" spacing={2} alignItems="center" marginBottom={5}>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Typography>Tên đăng nhập</Typography>
                            <TextField
                                required
                                label="Tên"
                                variant="outlined"
                            >
                            </TextField>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Typography>Mật Khẩu</Typography>
                            <TextField
                                required
                                label="Mật Khẩu"
                                variant="outlined"
                            >
                            </TextField>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="outlined" >Đăng Nhập</Button>
                        <Register handleCloseLogin={handleClose} />
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default Login