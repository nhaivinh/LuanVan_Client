import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
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
import Checkbox from '@mui/material/Checkbox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function StaffFormEdit({ Staff, handleResetPage }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [editAccount, setEditAccount] = React.useState({});

    const [roles, setRoles] = React.useState([]);

    const [posts, setPosts] = React.useState([]);

    const [, dispatch] = React.useContext(SnackBarContext);

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Staff"
    });

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Staff/getRoleStaffByID/` + Staff.id_staff)
            .then(res => {
                const Roles = res.data;
                setRoles(Roles.map((Role) => Role.id_permission));
            })
    }, [Staff])

    React.useEffect(() => {
        setEditAccount(Staff)
    }, [Staff])

    const handleCheck = (id) => {
        setRoles(prev => {
            const isChecked = roles.includes(id)
            if (isChecked) {
                return roles.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }


    function handleClickUpdate() {
        let thongbao = "H??y th??m th??ng tin ????ng d???ng cho :";
        let validName = false;
        let validEmail = false;
        let validPhoneNumber = false;
        let validPosition = false;
        let validAddress = false;
        let validIdentityCard = false;

        if (editAccount.name_staff === "" || editAccount.name_staff.search(/[0-9]/) >= 0) {
            thongbao = thongbao + "\nH??? v?? T??n"
        } else validName = true

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(editAccount.email_staff)) {
            thongbao = thongbao + "\nEmail"
        } else validEmail = true


        if (!/^[0-9\b]+$/i.test(editAccount.identity_card_staff) || editAccount.identity_card_staff.length !== 12) {
            thongbao = thongbao + "\nC??n c?????c c??ng d??n"
        } else validIdentityCard = true

        if (!/^[0-9\b]+$/i.test(editAccount.phone_number_staff) || editAccount.phone_number_staff.length !== 10) {
            thongbao = thongbao + "\nS??? ??i???n tho???i"
        } else validPhoneNumber = true

        if (editAccount.position === "") {
            thongbao = thongbao + "\nCh???c v???"
        } else validPosition = true

        if (editAccount.address_staff === "") {
            thongbao = thongbao + "\n?????a ch???"
        } else validAddress = true

        if (validName && validEmail && validPhoneNumber && validPosition && validAddress && validIdentityCard) {
            addPosts(editAccount);
        } else {
            alert(thongbao);
            console.log(editAccount);
        }
    }
    const addPosts = (Account) => {
        client
            .put('', {
                "idStaff": Staff.id_staff,
                "nameStaff": Account.name_staff,
                "emailStaff": Account.email_staff,
                "position": Account.position,
                "phoneNumberStaff": Account.phone_number_staff,
                "addressStaff": Account.address_staff,
                "genderStaff": Account.gender_staff,
                "identityCardStaff": Account.identity_card_staff,
                "roles": roles,
            }
            )
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

    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="warning">
                <Tooltip title="Xem Chi Ti???t">
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
                            Ch???nh s???a th??ng tin nh??n vi??n
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box
                                style={{
                                    display: 'flex',
                                    height: 150,
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="H??? t??n"
                                    size="small"
                                    defaultValue={Staff.name_staff}
                                    onChange={(e) => { setEditAccount({ ...editAccount, name_staff: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Ch???c v???"
                                    size="small"
                                    defaultValue={Staff.position}
                                    onChange={(e) => { setEditAccount({ ...editAccount, position: e.target.value }) }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                style={{
                                    display: 'flex',
                                    height: 150,
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="S??? ??i???n tho???i"
                                    size="small"
                                    defaultValue={Staff.phone_number_staff}
                                    onChange={(e) => { setEditAccount({ ...editAccount, phone_number_staff: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="CCCD"
                                    size="small"
                                    defaultValue={Staff.identity_card_staff}
                                    onChange={(e) => { setEditAccount({ ...editAccount, identity_card_staff: e.target.value }) }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                style={{
                                    display: 'flex',
                                    height: 180,
                                    flexDirection: 'column',
                                    justifyContent: 'space-around'
                                }}
                            >
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Gi???i t??nh</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        fullwidth="true"
                                        defaultValue={Staff.gender_staff}
                                        onChange={(e) => { setEditAccount({ ...editAccount, gender_staff: e.target.value }) }}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="female" control={<Radio />} label="N???" />
                                        <FormControlLabel value="other" control={<Radio />} label="Kh??c" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="?????a ch???"
                                    size="small"
                                    defaultValue={Staff.address_staff}
                                    onChange={(e) => { setEditAccount({ ...editAccount, address_staff: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    label="Email"
                                    defaultValue={Staff.email_staff}
                                    onChange={(e) => { setEditAccount({ ...editAccount, email_staff: e.target.value }) }}
                                />

                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel control={<Checkbox value="1" checked={roles.includes(1)} onChange={() => handleCheck(1)} />} label="Qu???n l?? s???n ph???m" />
                            <FormControlLabel control={<Checkbox value="2" checked={roles.includes(2)} onChange={() => handleCheck(2)} />} label="Qu???n l?? nh???p h??ng" />
                            <FormControlLabel control={<Checkbox value="3" checked={roles.includes(3)} onChange={() => handleCheck(3)} />} label="Qu???n l?? ????n h??ng" />
                            <FormControlLabel control={<Checkbox value="7" checked={roles.includes(7)} onChange={() => handleCheck(7)} />} label="Qu???n l?? nh?? cung c???p" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel control={<Checkbox value="4" checked={roles.includes(4)} onChange={() => handleCheck(4)} />} label="Qu???n l?? th??ng tin kh??ch h??ng" />
                            <FormControlLabel control={<Checkbox value="5" checked={roles.includes(5)} onChange={() => handleCheck(5)} />} label="Qu???n l?? nh??n vi??n" />
                            <FormControlLabel control={<Checkbox value="6" checked={roles.includes(6)} onChange={() => handleCheck(6)} />} label="Th???ng k?? b??o c??o" />
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
                        <Button variant='contained' onClick={handleClickUpdate}>C???p nh???t</Button>
                    </Box>
                </Box >
            </Modal>
        </div >
    );
}

export default StaffFormEdit