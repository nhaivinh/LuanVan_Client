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

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

function AccountInfo() {

    const [selectedImage, setSelectedImage] = React.useState(null);


    const [account, setAccount] = React.useState({})
    const [editAccount, setEditAccount] = React.useState({});
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [, dispatch] = React.useContext(SnackBarContext);
    const [posts, setPosts] = React.useState([]);
    const client = axios.create({
        baseURL: "https://localhost:7253/api/Customer"
    });


    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Login/getinfobyid/` + cookies.Account)
            .then(res => {
                const Account = res.data;
                setAccount(Account);
                setEditAccount(Account[0])
            })
    }, [])

    function handleClickUpadte() {
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
                "idCustomer": Account.id_account,
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
    
    if (account[0] !== undefined) {
        const DateOfBirthCustomer = new Date(account[0].date_of_birth_customer)
        return (
            <Box style={{}}>
                <Container maxWidth="lg" style={{ backgroundColor: 'rgb(248, 248, 252)', borderRadius: '10px', marginTop: 50 }}>
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
                    <Grid container spacing={2}>
                        <Grid item xs={5} >
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    flexDirection: 'column',
                                    paddingBottom: 30
                                }}>
                                {selectedImage ?
                                    <div>
                                        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                        <br />
                                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                                        
                                    </div>
                                    :
                                    <div>
                                        <img alt="not found" width={"250px"} src={"data:image/png;base64, " + account[0].picture_link_avatar} />
                                        <br />
                                    </div>
                                }
                                <input
                                    type="file"
                                    name="myImage"
                                    onChange={(event) => {
                                        console.log(event.target.files[0]);
                                        setSelectedImage(event.target.files[0]);
                                    }}
                                />
                                <Button variant='contained'>Cập nhật ảnh đại diện</Button>
                                {selectedImage &&
                                console.log(URL.createObjectURL(selectedImage))
                                }
                                <Link to={'"/'+URL.createObjectURL(selectedImage)+'"'} target="_blank" download>Download</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={7} >
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    paddingBottom: 30
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
                                        defaultValue={account[0].name_customer}
                                        onChange={(e) => { setEditAccount({ ...editAccount, name_customer: e.target.value }) }}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined" size="small"
                                        defaultValue={account[0].email_customer}
                                        onChange={(e) => { setEditAccount({ ...editAccount, email_customer: e.target.value }) }}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
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
                                        label="Sinh nhật" variant="outlined"
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
                                    <Button variant='contained' onClick={handleClickUpadte}>Cập nhật</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box >
        )
    }
}

export default AccountInfo