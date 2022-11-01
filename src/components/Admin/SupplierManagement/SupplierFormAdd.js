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


export default function SupplierFormAdd({ handleResetPage }) {

    var md5 = require('md5');

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Supplier"
    });

    const [, dispatch] = React.useContext(SnackBarContext);

    const [posts, setPosts] = React.useState([]);

    const [supplier, setSupplier] = React.useState({
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
        let thongbao = "Hãy thêm thông tin đúng dạng cho :";
        let validName = false;
        let validEmail = false;
        let validPhoneNumber = false;
        let validAddress = false;

        if (supplier.name_supplier === "" || supplier.name_supplier.search(/[0-9]/) >= 0) {
            thongbao = thongbao + "\nHọ và Tên"
        } else validName = true

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(supplier.email_supplier)) {
            thongbao = thongbao + "\nEmail"
        } else validEmail = true

        if (!/^[0-9\b]+$/i.test(supplier.phone_number_supplier) || supplier.phone_number_supplier.length !== 10) {
            thongbao = thongbao + "\nSố điện thoại"
        } else validPhoneNumber = true

        if (supplier.address_supplier === "") {
            thongbao = thongbao + "\nĐịa chỉ"
        } else validAddress = true

        if (validName && validEmail && validPhoneNumber && validAddress) {
            addPosts(supplier);
        } else {
            alert(thongbao);
        }
    }
    const addPosts = (Supplier) => {
        client
            .post('', {
                "nameSupplier": Supplier.name_supplier,
                "phoneSupplier": Supplier.phone_number_supplier,
                "emailSupplier": Supplier.email_supplier,
                "addressSupplier": Supplier.address_supplier
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
                <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color4)' }}>Thêm Nhà Cung Cấp Mới</Button>
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
                            Thêm nhà cung cấp mới
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box
                                style={{
                                    display: 'flex',
                                    height: 250,
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly'
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Tên nhà cung cấp"
                                    size="small"
                                    onChange={(e) => { setSupplier({ ...supplier, name_supplier: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Email"
                                    size="small"
                                    onChange={(e) => { setSupplier({ ...supplier, email_supplier: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Số điện thoại"
                                    size="small"
                                    onChange={(e) => { setSupplier({ ...supplier, phone_number_supplier: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Địa chỉ"
                                    size="small"
                                    onChange={(e) => { setSupplier({ ...supplier, address_supplier: e.target.value }) }}
                                />
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
                        <Button variant='contained' onClick={handleClickAdd}>Thêm nhà cung cấp</Button>
                    </Box>
                </Box >
            </Modal>
        </div >
    );
}