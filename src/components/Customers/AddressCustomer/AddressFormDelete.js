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
import DeleteIcon from '@mui/icons-material/Delete';

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

const ColorButtonOutline = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[600]),
    fontWeight: 900,
    backgroundColor: 'white',
    border: '1px solid ' + orange[500],
    '&:hover': {
        border: '1px solid ' + orange[700],
    },
}));

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


export default function AddressFormDelete({ Address, handleResetPage }) {

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

    const handleClick = () => {

        deletePost(Address.id_address);

    }
    const deletePost = (idAddress) => {
        client.delete(`${idAddress}`)
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
                handleResetPage();
                handleClose();
            });
        setPosts(
            posts.filter((post) => {
                return post.idAddress !== Address.id_address;
            })
        );
    };

    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end" onClick={handleOpen} marginBottom={1}>
                <IconButton variant="text" color="error">
                    <Tooltip title="Xoá">
                        <DeleteIcon
                        />
                    </Tooltip>
                </IconButton>
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
                            Xác nhận xoá địa chỉ:
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Typography id="post-request-error-handling" variant='h6'>
                        {Address.address_customer}
                    </Typography>
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
                                <Box
                                    style={{
                                        display: 'flex',
                                        width: '40%',
                                        flexDirection: 'column',
                                        padding: 20,
                                    }}>
                                    <ColorButtonContained variant='contained' onClick={handleClick}>Xoá</ColorButtonContained>
                                </Box>
                                <Box
                                    style={{
                                        display: 'flex',
                                        width: '40%',
                                        flexDirection: 'column',
                                        padding: 20,
                                    }}>
                                    <ColorButtonOutline variant='contained' onClick={handleClose}>Huỷ bỏ</ColorButtonOutline>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                </Box >
            </Modal>
        </div >
    );
}