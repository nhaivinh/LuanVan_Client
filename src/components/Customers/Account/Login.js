import React, { useState } from "react";
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    IconButton,
    Box,
    TextField
} from '@material-ui/core';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import Register from "./Register";
import { hover } from "@testing-library/user-event/dist/hover";
import { color } from "@mui/system";
// import { cookie, CreateCookie, GetCookie } from '../../Cookie/CookieFunc';
const useStyles = makeStyles({
    button: {
        color: '#ffa500',
        '&:hover': {
            color: '#fff',
        },
    },
    orangeButton: {
        color: '#ffa500',
        '&:hover': {
            color: '#fff',
        },
    }
})

const Login = ({ handleResetPage, typeButton }) => {

    const classes = useStyles();
    const [cookies, setCookie] = useCookies(["user"]);
    const [open, setOpen] = React.useState(false);

    const [StateLogin, setStateLogin] = useState("Not connect")
    const [login, setLogin] = useState({
        Username: '',
        Password: ''
    });

    const handleOpen = () => {
        setOpen(true);
    }

    function handleCookie(id) {
        setCookie("Account", id, {
            path: "/"
        });


    }

    const handleClose = () => setOpen(false);

    const Checklogin = () => {
        if (login.Username.length !== 0 && login.Password.length !== 0) {
            axios.post('https://localhost:7253/api/Login', login)
                .then(res => res.data)
                .then(res => {
                    if (res === "Incorrect") {
                        alert("Tên tài khoản hoặc mật khẩu không đúng")
                    }
                    else {
                        setStateLogin(res)
                        handleCookie(res)
                        handleResetPage();
                        handleClose()
                    }
                })
        } else {
            alert("nhập mật khẩu và tên đăng nhập")
        }
    }

    return (
        <div>
            {typeButton === "from_product" ?
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'left',
                        width: 300,
                        justifyContent: 'space-between'
                    }}
                >
                    <Button variant="contained" onClick={handleOpen} >Mua Ngay</Button>
                    <Button variant="contained" onClick={handleOpen} >Thêm Vào Giỏ Hàng</Button>
                </Box>
                :

                <IconButton
                    variant="text"
                    onClick={handleOpen}
                    className={classes.orangeButton}
                    >
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
                            <Typography variant="body2">Đăng nhập</Typography>
                            <Typography variant="body2">Đăng ký</Typography>
                        </Box>
                    </Box>
                </IconButton>
            }

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
                                onChange={(e) => { setLogin({ ...login, Username: e.target.value }) }}
                            >
                            </TextField>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Typography>Mật Khẩu</Typography>
                            <TextField
                                required
                                label="Mật Khẩu"
                                variant="outlined"
                                onChange={(e) => { setLogin({ ...login, Password: e.target.value }) }}
                            >
                            </TextField>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="outlined" onClick={Checklogin}>Đăng Nhập</Button>
                        <Register handleCloseLogin={handleClose} />
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default Login