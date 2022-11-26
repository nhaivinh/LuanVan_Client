import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal'
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
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

export default function ProductManagementStatus({ product, handleResetPage }) {

    let client

    const [option, setOption] = React.useState("disable")

    const [, dispatch] = React.useContext(SnackBarContext)

    const [posts, setPosts] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        switch (option) {
            case 'disable':
                client = axios.create({
                    baseURL: "https://localhost:7253/api/Product/" + product.id_product + "/" + product.status_product
                });
                client
                    .put('', {
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
                break;
            case 'delete':
                client = axios.create({
                    baseURL: "https://localhost:7253/api/product"
                });
                client.delete(`${product.id_product}`)
                    .then((response) => {
                        setPosts([response.data, ...posts]);
                        dispatch(setOpenSnackBar());
                        dispatch(setMessage(response.data.message));
                        dispatch(setSeverity(response.data.severity));
                        handleResetPage();
                    });
                setPosts(
                    posts.filter((post) => {
                        return post.idProduct !== product.id_product;
                    })
                );
                break;
            default:
                break;
        }
        handleResetPage();
        handleClose();
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
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 20 }}>
                        Xác nhận chuyển đổi trạng thái sản phẩm
                    </Typography>
                    <Typography id="post-request-error-handling" variant="h4" style={{ paddingBottom: 40 }}>
                        {product.name_product}
                    </Typography>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Thao tác</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={option}
                            onChange={(e) => { setOption(e.target.value) }}
                        >
                            {product.status_product === 1 ?
                                <FormControlLabel value="disable" control={<Radio />} label="Tạm dừng kinh doanh" />
                                :
                                <FormControlLabel value="disable" control={<Radio />} label="Phục hồi kinh doanh" />
                            }

                            <FormControlLabel value="delete" control={<Radio />} label="Xoá sản phẩm" />
                        </RadioGroup>
                    </FormControl>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-evenly" paddingTop={5}>
                        <Button variant="contained" onClick={handleSubmit}>Xác Nhận</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}