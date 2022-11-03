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
import { grey } from '@mui/material/colors';
import Edit from '@mui/icons-material/Edit';

const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: grey[500],
        left: 0,
        paddingLeft: 10,
        borderRadius: 10
    },
});

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[300]),
    fontWeight: 900,
    backgroundColor: grey[300],
    '&:hover': {
        color: theme.palette.getContrastText(grey[500]),
        backgroundColor: grey[500],
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
    color: grey[300],
    '&:hover': {
        color: grey[500],
        opacity: 1,
    },
    '&.Mui-selected': {
        color: grey[300],
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


export default function InfoStaff() {

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

    const [roles, setRoles] = React.useState([]);

    const [postsChangePassword, setPostsChangePassword] = React.useState([]);

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Staff"
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
                    textInput1.current.value = editAccount.name_staff
                    textInput2.current.value = editAccount.email_staff
                    textInput3.current.value = editAccount.phone_number_staff
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

    React.useEffect(() => {
        if (account.length !== undefined) {         
            axios.get(`https://localhost:7253/api/Staff/getRoleStaffByID/` + account[0].id_staff)
                .then(res => {
                    const Roles = res.data;
                    setRoles(Roles.map((Role) => Role.id_permission));
                })
        }
    }, [account])

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
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage(result.message));
                    dispatch(setSeverity(result.severity));
                    handleResetPage()
                })
        }
    }

    function handleShowEditAccount() {
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
                                defaultValue={account[0].name_staff}
                                onChange={(e) => { setEditAccount({ ...editAccount, name_staff: e.target.value }) }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined" size="small"
                                inputRef={textInput2}
                                defaultValue={account[0].email_staff}
                                onChange={(e) => { setEditAccount({ ...editAccount, email_staff: e.target.value }) }}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                inputRef={textInput3}
                                label="Số điện thoại"
                                defaultValue={account[0].phone_number_staff}
                                onChange={(e) => { setEditAccount({ ...editAccount, phone_number_staff: e.target.value }) }}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                inputRef={textInput3}
                                label="Địa chỉ"
                                defaultValue={account[0].address_staff}
                                onChange={(e) => { setEditAccount({ ...editAccount, address_staff: e.target.value }) }}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                label="Căn cước công dân"
                                defaultValue={account[0].identity_card_staff}
                                onChange={(e) => { setEditAccount({ ...editAccount, identity_card_staff: e.target.value }) }}
                            />
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Giới tính</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue={account[0].gender_staff}
                                    onChange={(e) => { setEditAccount({ ...editAccount, gender_staff: e.target.value }) }}
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
                                <input  type="file" onChange={saveFile} />
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
                                onChange={(e) => { setChangePassword({ ...changePassword, oldPassword: md5(e.target.value) }) }}
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
        let thongbao = "Hãy thêm thông tin đúng dạng cho :";
        let validName = false;
        let validEmail = false;
        let validPhoneNumber = false;
        let validIdentityCard = false;
        let validGender = false;

        if (editAccount.name_staff === "" || editAccount.name_staff.search(/[0-9]/) >= 0) {
            thongbao = thongbao + "\nHọ và Tên"
        } else validName = true

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(editAccount.email_staff)) {
            thongbao = thongbao + "\nEmail"
        } else validEmail = true


        if (!/^[0-9\b]+$/i.test(editAccount.phone_number_staff) || editAccount.phone_number_staff.length !== 10) {
            thongbao = thongbao + "\nSố điện thoại"
        } else validPhoneNumber = true

        if (!/^[0-9\b]+$/i.test(editAccount.identity_card_staff) || editAccount.identity_card_staff.length !== 12) {
            thongbao = thongbao + "\nCăn cước công dân"
        } else validIdentityCard = true

        if (editAccount.gender_staff.length === '') {
            thongbao = thongbao + "\nGiới tính"
        } else validGender = true

        console.log(editAccount)

        if (validName && validEmail && validPhoneNumber && validIdentityCard && validGender) {
            addPosts(editAccount);
        } else {
            alert(thongbao);
            console.log(editAccount);
        }
    }
    const addPosts = (Account) => {
        console.log(Account)
        client
            .put('', {
                "idStaff": Account.id_staff,
                "nameStaff": Account.name_staff,
                "emailStaff": Account.email_staff,
                "position": Account.position,
                "phoneNumberStaff": Account.phone_number_staff,
                "addressStaff": Account.address_staff,
                "genderStaff": Account.gender_staff,
                "identityCardStaff": Account.identity_card_staff,
                "roles": roles,
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
                <Container maxWidth="lg" style={{ backgroundColor: 'var(--background1)', borderRadius: '10px', marginTop: 0, padding: 0 }}>
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
                            {handleShowEditAccount()}
                        </Grid>
                    </Grid>
                </Container>
            </Box >
        )
    }
}