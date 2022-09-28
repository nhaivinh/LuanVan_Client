import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';

function OrderManagementFormChangeStatus({ idOrder, Order, handleResetPage }) {

    let client

    const [, dispatch] = React.useContext(SnackBarContext);

    const [posts, setPosts] = React.useState([]);

    const handleSubmit = (status) => {
        client = axios.create({
            baseURL: "https://localhost:7253/api/OrderCustomer/"+ idOrder +"/"+ status
        });
        client
            .put('', {
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
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
        handleResetPage();
    };
    function showFunction() {
        switch (Order.delivery_status) {
            case 0:
                return (
                    <>
                        <Button variant='contained' size='small' sx={{ marginRight: 1 }} onClick={() => handleSubmit(1)}> Duyệt </Button>
                        <Button variant='contained' size='small' color='error' onClick={() => handleSubmit(4)}> Huỷ </Button>
                    </>
                )
            case 1:
                return (
                    <Button variant='contained' size='small' color='success' onClick={() => handleSubmit(2)}>Vận chuyển</Button>
                )
            case 2:
                return (
                    <Button variant='contained' size='small' color='success' onClick={() => handleSubmit(3)}>Hoàn thành vận chuyển</Button>
                )
            default:
                break;
        }
    }

    // function showFunction() {
    //     switch (Order.delivery_status) {
    //         case 0:
    //             return (
    //                 <>
    //                     <Button variant='contained' size='small' sx={{ marginRight: 1 }} onClick={handleSubmit(1)}> Duyệt </Button>
    //                     <Button variant='contained' size='small' color='error' onClick={handleSubmit(4)}> Huỷ </Button>
    //                 </>
    //             )
    //         case 1:
    //             return (
    //                 <Button variant='contained' size='small' color='success' onClick={handleSubmit(2)}>Vận chuyển</Button>
    //             )
    //         case 2:
    //             return (
    //                 <Button variant='contained' size='small' color='success' onClick={handleSubmit(3)}>Hoàn thành vận chuyển</Button>
    //             )
    //         default:
    //             break;
    //     }
    // }
    return (
        <Box>
            {
                showFunction()
            }
        </Box>
    );
}

export default OrderManagementFormChangeStatus