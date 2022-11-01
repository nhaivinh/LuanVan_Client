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

function StaffFormEdit({ Supplier, handleResetPage }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [editSupplier, setEditSupplier] = React.useState({});

    const [roles, setRoles] = React.useState([]);

    const [posts, setPosts] = React.useState([]);

    const [, dispatch] = React.useContext(SnackBarContext);

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Supplier"
    });

    React.useEffect(() => {
        setEditSupplier(Supplier)
    }, [Supplier])

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
        let thongbao = "Hãy thêm thông tin đúng dạng cho :";
        let validName = false;
        let validEmail = false;
        let validPhoneNumber = false;
        let validAddress = false;

        if (editSupplier.name_supplier === "" || editSupplier.name_supplier.search(/[0-9]/) >= 0) {
            thongbao = thongbao + "\nHọ và Tên"
        } else validName = true

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(editSupplier.email_supplier)) {
            thongbao = thongbao + "\nEmail"
        } else validEmail = true

        if (!/^[0-9\b]+$/i.test(editSupplier.phone_number_supplier) || editSupplier.phone_number_supplier.length !== 10) {
            thongbao = thongbao + "\nSố điện thoại"
        } else validPhoneNumber = true

        if (editSupplier.address_supplier === "") {
            thongbao = thongbao + "\nĐịa chỉ"
        } else validAddress = true

        if (validName && validEmail && validPhoneNumber && validAddress) {
            addPosts(editSupplier);
        } else {
            alert(thongbao);
            console.log(editSupplier);
        }
    }
    const addPosts = (EditSupplier) => {
        client
            .put('', {
                "idSupplier": Supplier.id_supplier,
                "nameSupplier": EditSupplier.name_supplier,
                "phoneSupplier": EditSupplier.phone_number_supplier,
                "emailSupplier": EditSupplier.email_supplier,
                "addressSupplier": EditSupplier.address_supplier
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
                            Chỉnh sửa thông tin nhân viên
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
                                    defaultValue={Supplier.name_supplier}
                                    onChange={(e) => { setEditSupplier({ ...editSupplier, name_supplier: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Email"
                                    size="small"
                                    defaultValue={Supplier.email_supplier}
                                    onChange={(e) => { setEditSupplier({ ...editSupplier, email_supplier: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Số điện thoại"
                                    size="small"
                                    defaultValue={Supplier.phone_number_supplier}
                                    onChange={(e) => { setEditSupplier({ ...editSupplier, phone_number_supplier: e.target.value }) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Địa chỉ"
                                    size="small"
                                    defaultValue={Supplier.address_supplier}
                                    onChange={(e) => { setEditSupplier({ ...editSupplier, address_supplier: e.target.value }) }}
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
                        <Button variant='contained' onClick={handleClickUpdate}>Cập nhật</Button>
                    </Box>
                </Box >
            </Modal>
        </div >
    );
}

export default StaffFormEdit