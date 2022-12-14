import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
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


export default function StaffFormAdd({ handleResetPage }) {

    var md5 = require('md5');

    const client = axios.create({
        baseURL: "https://localhost:7253/api/staff"
    });

    const [, dispatch] = React.useContext(SnackBarContext);

    const [posts, setPosts] = React.useState([]);

    const [staff, setStaff] = React.useState({
    });

    const [open, setOpen] = React.useState(false);

    const [roles, setRoles] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    }

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

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickAdd = () => {
        let thongbao = "H??y th??m th??ng tin ????ng d???ng cho :";
        let validName = false;
        let validEmail = false;
        let validPhoneNumber = false;
        let validPosition = false;
        let validAddress = false;
        let validIdentityCard = false;

        if(staff.name_staff !== undefined && staff.name_staff !== ""){
            if (staff.name_staff === "" || staff.name_staff.search(/[0-9]/) >= 0) {
                thongbao = thongbao + "\nH??? v?? T??n"
            } else validName = true
        }else{
            thongbao = thongbao + "\nH??? v?? T??n"
        }
        

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(staff.email_staff)) {
            thongbao = thongbao + "\nEmail"
        } else validEmail = true


        if (!/^[0-9\b]+$/i.test(staff.identity_card_staff) || staff.identity_card_staff.length !== 12) {
            thongbao = thongbao + "\nC??n c?????c c??ng d??n"
        } else validIdentityCard = true

        if (!/^[0-9\b]+$/i.test(staff.phone_number_staff) || staff.phone_number_staff.length !== 10) {
            thongbao = thongbao + "\nS??? ??i???n tho???i"
        } else validPhoneNumber = true

        if (staff.position === "") {
            thongbao = thongbao + "\nCh???c v???"
        } else validPosition = true

        if (staff.address_staff === "") {
            thongbao = thongbao + "\n?????a ch???"
        } else validAddress = true

        if (validName && validEmail && validPhoneNumber && validPosition && validAddress && validIdentityCard) {
            
            addPosts(staff);
        } else {
            alert(thongbao);
        }
    }
    const addPosts = (Staff) => {
        client
            .post('', {
                "username" : staff.email_staff.slice(0,staff.email_staff.search(/@/)),
                "nameStaff": Staff.name_staff,
                "emailStaff": Staff.email_staff,
                "position": Staff.position,
                "phoneNumberStaff": Staff.phone_number_staff,
                "addressStaff": Staff.address_staff,
                "genderStaff": Staff.gender_staff,
                "identityCardStaff": Staff.identity_card_staff,
                "roles": roles
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
                handleResetPage();
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
            <Stack direction="column" spacing={2} alignItems="flex-end" marginBottom={2}>
                <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color4)' }}>Th??m Nh??n Vi??n M???i</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 5 }}>
                            Th??m nh??n vi??n m???i
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
                                    onChange={(e) => { setStaff({ ...staff, name_staff: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Ch???c v???"
                                    size="small"
                                    onChange={(e) => { setStaff({ ...staff, position: e.target.value }) }}
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
                                    onChange={(e) => { setStaff({ ...staff, phone_number_staff: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="CCCD"
                                    size="small"
                                    onChange={(e) => { setStaff({ ...staff, identity_card_staff: e.target.value }) }}
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
                                        onChange={(e) => { setStaff({ ...staff, gender_staff: e.target.value }) }}
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
                                    onChange={(e) => { setStaff({ ...staff, address_staff: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    label="Email"
                                    onChange={(e) => { setStaff({ ...staff, email_staff: e.target.value }) }}
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
                        <Button variant='contained' onClick={handleClickAdd}>Th??m nh??n vi??n</Button>
                    </Box>
                </Box >
            </Modal>
        </div >
    );
}