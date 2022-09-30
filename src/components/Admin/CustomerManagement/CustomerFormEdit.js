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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

function CustomerFormEdit({ Customer , handleResetPage}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [editAccount, setEditAccount] = React.useState({});

    const [posts, setPosts] = React.useState([]);

    const [, dispatch] = React.useContext(SnackBarContext);

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Customer"
    });

    React.useEffect(() => {
        setEditAccount(Customer)
    }, [])

    function showGender(gender) {
        switch (gender) {
            case 'male':
                return (
                    'Nam'
                )
            case 'female':
                return (
                    'Nữ'
                )
            case 'other':
                return (
                    'Khác'
                )

            default:
                break;
        }
    }
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
                handleResetPage()
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

    const DateOfBirthCustomer = new Date(Customer.date_of_birth_customer)
    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="warning">
                <Tooltip title="Xem Chi Tiết">
                    <EditIcon
                        sx={{ color: 'var(--color8)' }}
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
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 5 }}>
                            Chỉnh sửa thông tin khách hàng
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box
                                style={{
                                    display: 'flex',
                                    height: 200,
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullwidth="true"
                                    label="Họ tên"
                                    size="small"
                                    defaultValue={Customer.name_customer}
                                    onChange={(e) => { setEditAccount({ ...editAccount, name_customer: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined" 
                                    size="small"
                                    defaultValue={Customer.email_customer}
                                    onChange={(e) => { setEditAccount({ ...editAccount, email_customer: e.target.value }) }}
                                    fullwidth="true"
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    fullwidth="true"
                                    label="Số điện thoại"
                                    defaultValue={Customer.phone_number_customer}
                                    onChange={(e) => { setEditAccount({ ...editAccount, phone_number_customer: e.target.value }) }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                style={{
                                    display: 'flex',
                                    height: 225,
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    fullwidth="true"
                                    label="Căn cước công dân"
                                    defaultValue={Customer.identity_card_customer}
                                    onChange={(e) => { setEditAccount({ ...editAccount, identity_card_customer: e.target.value }) }}
                                />
                                <TextField
                                    required
                                    type="date"
                                    size="small"
                                    fullwidth="true"
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
                                        fullwidth="true"
                                        defaultValue={Customer.gender_customer}
                                        onChange={(e) => { setEditAccount({ ...editAccount, gender_customer: e.target.value }) }}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                        <FormControlLabel value="other" control={<Radio />} label="Khác" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            padding: 20,
                        }}>
                        <Button variant='contained' onClick={handleClickUpadte}>Cập nhật</Button>
                    </Box>
                </Box >
            </Modal>
        </div >
    );
}

export default CustomerFormEdit