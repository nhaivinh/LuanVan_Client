import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { TextField, Tooltip } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


export default function OrderManagementFormAccept({ Order, handleResetPage, IDStaff }) {

    let client

    const [, dispatch] = React.useContext(SnackBarContext);

    const [posts, setPosts] = React.useState([]);

    const [deliveryPrice, setDeliveryPrice] = React.useState(0);

    const [open, setOpen] = React.useState(false);

    const [roles, setRoles] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickAdd = () => {
        let thongbao = "Hãy thêm thông tin đúng dạng cho :";

        let validPrice = false;

        if (deliveryPrice === "") {
            thongbao = thongbao + "\nĐịa chỉ"
        } else validPrice = true

        if (validPrice) {
            addPosts(deliveryPrice);
        } else {
            alert(thongbao);
        }
    }
    const addPosts = (Info) => {
        client = axios.create({
            baseURL: "https://localhost:7253/api/OrderCustomer/AcceptOrder/" + Order.id_order + "/1/" + IDStaff + "/" + Info
        });
        client
            .put('', {
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
                handleResetPage();
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

    return (
        <div>
            <Button variant='contained' size='small' sx={{ marginRight: 1 }} onClick={handleOpen}> Duyệt </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 5 }}>
                            Thêm phí vận chuyên mới
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box
                                style={{
                                    display: 'flex',
                                    height: 100,
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center'
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    type={'number'}
                                    defaultValue={deliveryPrice}
                                    label="Phí vận chuyển"
                                    size="small"
                                    onChange={(e) => { setDeliveryPrice(e.target.value) }}
                                />
                                <Box
                                    style={{
                                        display: 'flex',
                                        width: '40%',
                                        flexDirection: 'column',
                                        padding: 20,
                                    }}>
                                    <ColorButtonContained variant='contained' onClick={handleClickAdd}>Xác nhận</ColorButtonContained>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </Box >
            </Modal>
        </div >
    );
}