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
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
// import { cookie, CreateCookie, GetCookie } from '../../Cookie/CookieFunc';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import md5 from "md5";

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

const Register = () => {

    var md5 = require('md5');

    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(["user"]);

    const [postsAccount, setPostsAccount] = React.useState([]);

    const [postsCustomer, setPostsCustomer] = React.useState([]);

    const [, dispatch] = React.useContext(SnackBarContext);

    const clientAccount = axios.create({
        baseURL: "https://localhost:7253/api/Login/postaccount"
    });

    const clientCustomer = axios.create({
        baseURL: "https://localhost:7253/api/Customer"
    });

    const [register, setRegister] = useState({
        Username: '',
        Password: '',
        RepeatPassword: '',
        Phone: '',
        Name: '',
        Email: '',
        CCCD: '',
        Birthday: '2022-01-01',
        Gender: 'male'
    });

    const ClickBack = () => {
        navigate("/login")
    }

    const CheckRegister = () => {
        const current = new Date();
        const date = getFormattedDate(current);

        let thongbao = "Hãy thêm thông tin đúng dạng cho :";
        let validUsername = false;
        let validName = false;
        let validPassword = false;
        let validEmail = false;
        let validPhoneNumber = false;
        let validIdentityCard = false;
        let validDayOfBirth = false;
        let validGender = false;

        if (register.Username === "") {
            thongbao = thongbao + "\nTên đăng nhập"
        } else validUsername = true

        if (register.Password !== register.RepeatPassword) {
            thongbao = thongbao + "\nNhập lại mật khẩu"
        } else validPassword = true

        if (register.Name === "" || register.Name.search(/[0-9]/) >= 0) {
            thongbao = thongbao + "\nHọ và Tên"
        } else validName = true

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(register.Email)) {
            thongbao = thongbao + "\nEmail"
        } else validEmail = true


        if (!/^[0-9\b]+$/i.test(register.Phone) || register.Phone.length !== 10) {
            thongbao = thongbao + "\nSố điện thoại"
        } else validPhoneNumber = true

        if (!/^[0-9\b]+$/i.test(register.CCCD) || register.CCCD.length !== 12) {
            thongbao = thongbao + "\nCăn cước công dân"
        } else validIdentityCard = true

        if (register.Gender.length === '') {
            thongbao = thongbao + "\nGiới tính"
        } else validGender = true

        if (register.Birthday > date) {
            thongbao = thongbao + "\nNgày sinh nhật Phải Trước Ngày Hiện tại"
        } else validDayOfBirth = true

        if (validName && validEmail && validPhoneNumber && validDayOfBirth && validIdentityCard && validGender) {
            addPosts(register);
        } else {
            alert(thongbao);
        }
    }

    const addPosts = (Account) => {
        clientAccount
            .post('', {
                "username": Account.Username,
                "password": Account.Password,
                "role": "customer",
            })
            .then((response) => {
                setPostsAccount([response.data, ...postsAccount]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
                if (response.data.severity === "success") {
                    navigate("/login")
                }
            })
            .then((response) => {
                if (response.data.severity === "success") {
                    clientCustomer
                    .post('', {
                        "nameCustomer": Account.Name,
                        "emailCustomer": Account.Email,
                        "phoneNumberCustomer": Account.Phone,
                        "dateOfBirthCustomer": Account.Birthday,
                        "identityCardCustomer": Account.CCCD,
                        "genderCustomer": Account.Gender,
                    })
                    .then((response) => {
                        setPostsCustomer([response.data, ...postsCustomer]);
                        dispatch(setOpenSnackBar());
                        dispatch(setMessage(response.data.message));
                        dispatch(setSeverity(response.data.severity));
                        if (response.data.severity === "success") {
                            navigate("/login")
                        }
                    })
                    .catch((err) => {
                        if (err.response) {
                            // The client was given an error response (5xx, 4xx)
                            console.log(err.response.data);
                            console.log(err.response.status);
                            console.log(err.response.headers);
                        } else if (err.request) {
                            // The client never received a response, and the request was never left
                        } else {
                            // Anything else
                        }
                    });
                }
                
            })
            .catch((err) => {
                if (err.response) {
                    // The client was given an error response (5xx, 4xx)
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                } else {
                    // Anything else
                }
            });
    };

    return (
        <div style={{ minHeight: 600 }}>
            <Container maxWidth="lg" style={{ backgroundColor: 'rgb(248, 248, 252)', borderRadius: '10px', marginTop: 50 }}>
                <Box style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    boxShadow: 24,
                    p: 4,
                    flexDirection: 'column'
                }}>
                    <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={5}>
                        <Stack direction="column" spacing={2} alignItems="center" marginBottom={5}>
                            <Typography variant="h4">Đăng Ký tài khoản</Typography>
                        </Stack>
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: 1000,
                                marginBottom: 10
                            }}>
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around'
                                }}>
                                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="Tên tài khoản"
                                        size="small"
                                        onChange={(e) => { setRegister({ ...register, Username: e.target.value }) }}
                                    >
                                    </TextField>
                                    <TextField
                                        required
                                        variant="outlined"
                                        type="password"
                                        label="Mật khẩu"
                                        size="small"
                                        onChange={(e) => { setRegister({ ...register, Password: md5(e.target.value) }) }}
                                    >
                                    </TextField>
                                    <TextField
                                        required
                                        variant="outlined"
                                        type="password"
                                        label="Nhập lại mật khẩu"
                                        size="small"
                                        onChange={(e) => { setRegister({ ...register, RepeatPassword: md5(e.target.value) }) }}
                                    >
                                    </TextField>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="Số điện thoại"
                                        size="small"
                                        onChange={(e) => { setRegister({ ...register, Phone: e.target.value }) }}
                                    >
                                    </TextField>
                                </Stack>
                                <Stack direction="column" spacing={2} alignItems="stretch" marginBottom={0}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="Họ và tên"
                                        size="small"
                                        onChange={(e) => { setRegister({ ...register, Name: e.target.value }) }}
                                    >
                                    </TextField>
                                    <TextField
                                        required
                                        variant="outlined"
                                        label="Email"
                                        size="small"
                                        onChange={(e) => { setRegister({ ...register, Email: e.target.value }) }}
                                    >
                                    </TextField>

                                    <TextField
                                        required
                                        variant="outlined"
                                        label="CCCD"
                                        size="small"
                                        onChange={(e) => { setRegister({ ...register, CCCD: e.target.value }) }}
                                    >

                                    </TextField>
                                    <TextField
                                        required
                                        type="date"
                                        label="Sinh nhật" variant="outlined"
                                        defaultValue="2020-01-01"
                                        size="small"
                                        onChange={(e) => { setRegister({ ...register, Birthday: e.target.value }) }}
                                    >
                                    </TextField>
                                </Stack>
                                <Stack direction="column" spacing={2} alignItems="stretch" marginBottom={0}>
                                    <FormControl>
                                        <FormLabel id="demo-controlled-radio-buttons-group"
                                            sx={{
                                                "&, &.Mui-focused": {
                                                    color: "orange"
                                                }
                                            }}>
                                            Giới tính
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            defaultValue='male'
                                            onChange={(e) => { setRegister({ ...register, Gender: e.target.value }) }}
                                        >
                                            <FormControlLabel value="male"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            "&, &.Mui-checked": {
                                                                color: "orange"
                                                            }
                                                        }} />
                                                }
                                                label="Nam"
                                            />
                                            <FormControlLabel value="female"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            "&, &.Mui-checked": {
                                                                color: "orange"
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="Nữ" />
                                            <FormControlLabel value="other"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            "&, &.Mui-checked": {
                                                                color: "orange"
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="Khác" />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" marginBottom={5}>
                        <ColorButtonContained variant="contained" onClick={CheckRegister}>Đăng ký</ColorButtonContained>
                        <ColorButtonContained variant="contained" onClick={ClickBack}>Quay về</ColorButtonContained>
                    </Stack>
                </Box>
            </Container >
        </div >
    )
}
export default Register