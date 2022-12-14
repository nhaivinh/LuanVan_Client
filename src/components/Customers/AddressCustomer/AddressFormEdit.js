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
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


export default function AddressFormEdit({ Address, handleResetPage }) {

    var md5 = require('md5');

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Address"
    });

    const [, dispatch] = React.useContext(SnackBarContext);

    const [posts, setPosts] = React.useState([]);

    const [address, setAddress] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const [roles, setRoles] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickAdd = () => {
        let thongbao = "H??y th??m th??ng tin ????ng d???ng cho :";

        let validAddress = false;

        if (address === "") {
            thongbao = thongbao + "\n?????a ch???"
        } else validAddress = true

        if (validAddress) {
            addPosts(address);
        } else {
            alert(thongbao);
        }
    }
    const addPosts = (Info) => {
        client
            .put('', {
                "idAddress": Address.id_address,
                "addressCustomer": Info
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
                            Ch???nh s???a ?????a ch???
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
                                    multiline
                                    fullWidth
                                    rows={3}
                                    defaultValue={Address.address_customer}
                                    label="?????a ch???"
                                    size="small"
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                                <Box
                                    style={{
                                        display: 'flex',
                                        width: '40%',
                                        flexDirection: 'column',
                                        padding: 20,
                                    }}>
                                    <ColorButtonContained variant='contained' onClick={handleClickAdd}>X??c nh???n</ColorButtonContained>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </Box >
            </Modal>
        </div >
    );
}