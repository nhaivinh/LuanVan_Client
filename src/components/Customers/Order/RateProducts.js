import axios from 'axios';
import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Button, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function RateProducts({ Order, idOrder }) {
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [detailsOrder, setDetailsOrder] = React.useState([]);

    React.useEffect(() => {
        axios.get(`https://localhost:7253/getdetailsorderbyidorder/` + idOrder)
            .then(res => {
                const Orders = res.data;
                setDetailsOrder(Orders);
            })
    }, [])

    console.log(value)

    function showDetail(items) {

        return (
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader={true} sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '40%' }} colSpan={2}><Typography variant='h6'>Thông tin sản phẩm</Typography></TableCell>
                            <TableCell style={{ width: '20%' }} align="left">Đánh giá</TableCell>
                            <TableCell style={{ width: '20%' }} align="left">Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            items.map(function (row, index) {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left" style={{ width: '10%' }}>
                                            {row.picture_product !== null ?
                                                <img src={row.picture_product} alt="product" width='100%' />
                                                :
                                                <img src={"data:image/png;base64, " + row.picture_link_product} alt="product" width='100%' />
                                            }
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            <Typography>{row.name_product}</Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            <Rating
                                                name="simple-controlled"
                                                value={value[index]}
                                                onChange={(event, newValue) => {
                                                    setValue([
                                                        ...value, 
                                                        {
                                                            id_product: row.id_product,
                                                            star: newValue
                                                        }]);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            <Button>Đánh Giá</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="primary">
                <Tooltip title="Đánh giá">
                    <RateReviewIcon
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
                            Đánh giá sản phẩm
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    {showDetail(detailsOrder)}
                </Box>
            </Modal>
        </div >
    );
}

export default RateProducts