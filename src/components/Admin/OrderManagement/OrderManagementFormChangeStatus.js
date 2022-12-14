import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import OrderManagementFormAccept from './OrderManagementFormAccept';

function OrderManagementFormChangeStatus({ idOrder, Order, idStaff, handleResetPage }) {

    let client

    const [, dispatch] = React.useContext(SnackBarContext);

    const [posts, setPosts] = React.useState([]);

    const handleSubmit = (status) => {
        client = axios.create({
            baseURL: "https://localhost:7253/api/OrderCustomer/"+ idOrder +"/"+ status + "/" + idStaff
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
    function showFunction() {
        switch (Order.delivery_status) {
            case 0:
                return (
                    <Box
                    style={{
                        display: 'flex'
                    }}
                    >                  
                        <OrderManagementFormAccept Order={Order} handleResetPage={handleResetPage} IDStaff = {idStaff}/>
                        <Button variant='contained' size='small' color='error' onClick={() => handleSubmit(4)}> Hu??? </Button>
                    </Box>
                )
            case 1:
                return (
                    <Button variant='contained' size='small' color='success' onClick={() => handleSubmit(2)}>V???n chuy???n</Button>
                )
            case 2:
                return (
                    <Button variant='contained' size='small' color='success' onClick={() => handleSubmit(3)}>Ho??n th??nh</Button>
                )
            default:
                break;
        }
    }
    return (
        <Box>
            {
                showFunction()
            }
        </Box>
    );
}

export default OrderManagementFormChangeStatus