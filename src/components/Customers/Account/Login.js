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
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from "react-cookie";
import Register from "./Register";
import Container from '@mui/material/Container';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';

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

const Login = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [cookies, setCookie] = useCookies(["user"]);
    const [open, setOpen] = React.useState(false);
    const [, dispatch] = React.useContext(SnackBarContext);
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
                        navigate('/')
                        dispatch(setOpenSnackBar());
                        dispatch(setMessage("Đăng nhập thành công"));
                        dispatch(setSeverity("success"));
                        window.location.reload()
                    }
                })
        } else {
            alert("nhập mật khẩu và tên đăng nhập")
        }
    }

    return (
        <div>
            <Container maxWidth="lg" style={{ backgroundColor: 'white', borderRadius: '10px', marginTop: 50 , height: 400}}>
                <Box style={{
                    display: 'flex',
                    borderRadius: 10,
                    boxShadow: 24,
                    p: 4,
                    flexDirection: 'column',
                }}>
                    <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={5}>
                        <Typography variant="h4">Đăng Nhập</Typography>
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: 400,
                            }}>
                            <Typography>Tên đăng nhập</Typography>
                            <TextField
                                required
                                variant="outlined"
                                
                                onChange={(e) => { setLogin({ ...login, Username: e.target.value }) }}
                            >
                            </TextField>
                            <Typography>Mật Khẩu</Typography>
                            <TextField
                                required
                                type={'password'}
                                variant="outlined"
                                onChange={(e) => { setLogin({ ...login, Password: e.target.value }) }}
                            >
                            </TextField>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" marginBottom={5}>
                        <Button variant="contained" onClick={Checklogin}>Đăng Nhập</Button>
                        <Link to="/register"><Button variant="contained">Đăng ký</Button></Link>
                    </Stack>
                </Box>
            </Container>
        </div >
    )
}
export default Login