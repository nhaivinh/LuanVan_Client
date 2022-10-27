import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import { useCookies } from "react-cookie";
import Tab from '@mui/material/Tab';
import { Tabs } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ImageIcon from '@mui/icons-material/Image';
import LockIcon from '@mui/icons-material/Lock';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: orange[500],
        left: 0,
        paddingLeft: 10,
        borderRadius: 10
    },
});

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: orange[400],
    '&:hover': {
        color: orange[900],
        opacity: 1,
    },
    '&.Mui-selected': {
        color: orange[400],
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
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

function AccountInfo() {

    var md5 = require('md5');

    const textInput1 = React.useRef(null);
    const textInput2 = React.useRef(null);
    const textInput3 = React.useRef(null);

    const [resetpage, setResetPage] = React.useState(false)

    const [account, setAccount] = React.useState({})

    const [changePassword, setChangePassword] = React.useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    })

    const [editAccount, setEditAccount] = React.useState({});

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const [, dispatch] = React.useContext(SnackBarContext);

    const [avatar, setAvatar] = React.useState(null);

    const [posts, setPosts] = React.useState([]);

    const [postsChangePassword, setPostsChangePassword] = React.useState([]);

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Customer"
    });

    const clientChangePassword = axios.create({
        baseURL: "https://localhost:7253/api/Login/changepassword"
    });

    const [statusValue, setStatusValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setStatusValue(newValue);
        if (textInput1.current !== null && textInput2.current !== null && textInput3.current !== null) {
            switch (newValue) {
                case '0':
                    textInput1.current.value = editAccount.name_customer
                    textInput2.current.value = editAccount.email_customer
                    textInput3.current.value = editAccount.phone_number_customer
                    break;
                case '2':
                    textInput1.current.value = changePassword.oldPassword
                    textInput2.current.value = changePassword.newPassword
                    textInput3.current.value = changePassword.repeatNewPassword
                    break;
                default:
                    break;
            }
        }
    };


    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Login/getinfobyid/` + cookies.Account)
            .then(res => {
                const Account = res.data;
                setAccount(Account);
                setEditAccount(Account[0])
            })
    }, [resetpage])

    function handleResetPage() {
        setResetPage(!resetpage)
    }

    const saveFile = (e) => {
        setAvatar(e.target.files)
    }

    function saveImage() {
        let reader = new FileReader();
        reader.readAsDataURL(avatar[0])
        reader.onload = (e) => {
            fetch("https://localhost:7253/api/Login/uploadavatar", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "IDAccount": account[0].id_account,
                    "pictureChar": e.target.result
                })
            })
                .then(res => res.json())
                .then((result) => {
                    handleResetPage()
                })
        }
    }

    function handleShowEditAccount() {
        const DateOfBirthCustomer = new Date(account[0].date_of_birth_customer)
        switch (statusValue) {
            case '0':
                return (
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            paddingBottom: 30,
                            paddingTop: 10
                        }}>
                        <Box
                            style={{
                                display: 'flex',
                                width: '50%',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                padding: 20,
                                borderRadius: 10,
                                height: 450
                            }}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Họ tên"
                                size="small"
                                inputRef={textInput1}
                                defaultValue={account[0].name_customer}
                                onChange={(e) => { setEditAccount({ ...editAccount, name_customer: e.target.value }) }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined" size="small"
                                inputRef={textInput2}
                                defaultValue={account[0].email_customer}
                                onChange={(e) => { setEditAccount({ ...editAccount, email_customer: e.target.value }) }}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                inputRef={textInput3}
                                label="Số điện thoại"
                                defaultValue={account[0].phone_number_customer}
                                onChange={(e) => { setEditAccount({ ...editAccount, phone_number_customer: e.target.value }) }}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                label="Căn cước công dân"
                                defaultValue={account[0].identity_card_customer}
                                onChange={(e) => { setEditAccount({ ...editAccount, identity_card_customer: e.target.value }) }}
                            />
                            <TextField
                                required
                                type="date"
                                label="Sinh nhật"
                                variant="outlined"
                                defaultValue={getFormattedDate(DateOfBirthCustomer)}
                                onChange={(e) => { setEditAccount({ ...editAccount, date_of_birth_customer: e.target.value }) }}
                            >
                            </TextField>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Giới tính</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue={account[0].gender_customer}
                                    onChange={(e) => { setEditAccount({ ...editAccount, gender_customer: e.target.value }) }}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="other" control={<Radio />} label="Khác" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                width: '50%',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                padding: 20,
                            }}>
                            <ColorButtonContained variant='contained' onClick={handleClickUpdate}>Cập nhật</ColorButtonContained>
                        </Box>
                    </Box>
                )
            case '1':
                return (
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            paddingBottom: 30,
                            paddingTop: 10
                        }}>
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                paddingBottom: 30,
                                paddingTop: 10
                            }}>
                            <Avatar
                                alt="Remy Sharp"
                                src={account[0].picture_char}
                                sx={{ width: 200, height: 200 }}
                            />
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: 300,
                                paddingLeft: 10
                            }}
                        >
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: 300,
                                    paddingLeft: 10,
                                    paddingBottom: 10
                                }}
                            >
                                <input className="custom-file-input" type="file" onChange={saveFile} />
                            </Box>
                            <ColorButtonContained variant='contained' onClick={saveImage}>Cập nhật ảnh đại diện</ColorButtonContained>
                        </Box>
                    </Box >
                )
            case '2':
                return (
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            paddingBottom: 30,
                            paddingTop: 10
                        }}>
                        <Box
                            style={{
                                display: 'flex',
                                width: '50%',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                padding: 20,
                                borderRadius: 10,
                                height: 200
                            }}>
                            <TextField
                                type={'password'}
                                variant="outlined"
                                label="Mật khẩu hiện tại"
                                inputRef={textInput1}
                                defaultValue={changePassword.oldPassword}
                                size="small"
                                onChange={(e) => { setChangePassword({ ...changePassword, oldPassword: e.target.value }) }}
                            />
                            <TextField
                                type={'password'}
                                variant="outlined"
                                label="Mật khẩu mới"
                                defaultValue={""}
                                inputRef={textInput2}
                                size="small"
                                onChange={(e) => { setChangePassword({ ...changePassword, newPassword: md5(e.target.value) }) }}
                            />
                            <TextField
                                type={'password'}
                                variant="outlined"
                                defaultValue={""}
                                inputRef={textInput3}
                                label="Nhập lại mật khẩu mới"
                                size="small"
                                onChange={(e) => { setChangePassword({ ...changePassword, repeatNewPassword: md5(e.target.value) }) }}
                            />
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                width: '50%',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                padding: 20,
                            }}>
                            <ColorButtonContained variant='contained' onClick={handleClickChangePassword}>Cập nhật</ColorButtonContained>
                        </Box>
                    </Box>
                )
            default:
                break;
        }
    }

    function handleClickUpdate() {
        const current = new Date();
        const date = getFormattedDate(current);

        let thongbao = "Hãy thêm thông tin đúng dạng cho :";
        let validName = false;
        let validEmail = false;
        let validPhoneNumber = false;
        let validIdentityCard = false;
        let validDayOfBirth = false;
        let validGender = false;

        if (editAccount.name_customer === "" || editAccount.name_customer.search(/[0-9]/) >= 0) {
            thongbao = thongbao + "\nHọ và Tên"
        } else validName = true

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(editAccount.email_customer)) {
            thongbao = thongbao + "\nEmail"
        } else validEmail = true


        if (!/^[0-9\b]+$/i.test(editAccount.phone_number_customer) || editAccount.phone_number_customer.length !== 10) {
            thongbao = thongbao + "\nSố điện thoại"
        } else validPhoneNumber = true

        if (!/^[0-9\b]+$/i.test(editAccount.identity_card_customer) || editAccount.identity_card_customer.length !== 12) {
            thongbao = thongbao + "\nCăn cước công dân"
        } else validIdentityCard = true

        if (editAccount.gender_customer.length === '') {
            thongbao = thongbao + "\nGiới tính"
        } else validGender = true

        if (editAccount.date_of_birth_customer > date) {
            thongbao = thongbao + "\nNgày Cấp Phải Trước Ngày Hiện tại"
        } else validDayOfBirth = true

        if (validName && validEmail && validPhoneNumber && validDayOfBirth && validIdentityCard && validGender) {
            addPosts(editAccount);
        } else {
            alert(thongbao);
            console.log(editAccount);
        }
    }
    const addPosts = (Account) => {
        client
            .put('', {
                "idCustomer": Account.id_customer,
                "nameCustomer": Account.name_customer,
                "emailCustomer": Account.email_customer,
                "phoneNumberCustomer": Account.phone_number_customer,
                "dateOfBirthCustomer": Account.date_of_birth_customer,
                "identityCardCustomer": Account.identity_card_customer,
                "genderCustomer": Account.gender_customer,
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
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

    function handleClickChangePassword() {


        let thongbao = "";
        let validPassword = false;
        let validNewPassword = false;
        let validRepeatNewPassword = false;

        if (changePassword.newPassword !== changePassword.repeatNewPassword) {
            thongbao = thongbao + "Nhập lại mật khẩu"
        } else validRepeatNewPassword = true

        if (validRepeatNewPassword) {
            addPostsChangePassword(editAccount, changePassword);
        } else {
            alert(thongbao);
            console.log(editAccount);
        }
    }

    const addPostsChangePassword = (Account, ChangePassword) => {
        clientChangePassword
            .put('', {
                "idAccount": Account.id_account,
                "password": ChangePassword.oldPassword,
                "newPassword": ChangePassword.newPassword,
            })
            .then((response) => {
                setPostsChangePassword([response.data, ...postsChangePassword]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
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

    if (account[0] !== undefined) {
        return (
            <Box style={{}}>
                <Container maxWidth="lg" style={{ backgroundColor: 'var(--background1)', borderRadius: '10px', marginTop: 70, padding: 0 }}>
                    <Grid container spacing={2} minHeight={700}>
                        <Grid item xs={3} style={{ paddingTop: 0 }}>
                            <Box sx={{ width: '100%', typography: 'body1', backgroundColor: 'rgb(45, 45, 45)', height: '100%', borderStartStartRadius: 10, borderBottomLeftRadius: 10 }}>
                                <AntTabs
                                    orientation="vertical"
                                    value={statusValue}
                                    onChange={handleChange}
                                >
                                    <AntTab icon={<InfoIcon />} iconPosition="start" label="Thông tin cá nhân" value="0" />
                                    <AntTab icon={<ImageIcon />} iconPosition="start" label="Ảnh đại diện" value="1" />
                                    <AntTab icon={<LockIcon />} iconPosition="start" label="Bảo mật" value="2" />
                                </AntTabs>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box
                                style={{
                                    display: 'flex',
                                    height: 50,
                                    alignItems: 'center',
                                }}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit" to="/">
                                        <Typography color="text.primary">Trang Chủ</Typography>
                                    </Link>
                                    <Typography color="text.primary">
                                        Thông tin cá nhân
                                    </Typography>
                                </Breadcrumbs>
                            </Box>
                            {handleShowEditAccount()}
                        </Grid>
                    </Grid>
                </Container>
            </Box >
        )
    }
}

export default AccountInfo