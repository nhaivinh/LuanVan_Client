import React from 'react';
import { Box, Typography } from "@mui/material";
import axios from "axios";
import AddressFormAdd from './AddressFormAdd';
import AddressFormEdit from './AddressFormEdit';
import AddressFormDelete from './AddressFormDelete';

export default function AddressCustomer({ Customer }) {

    const [address, setAddress] = React.useState([]);
    const [resetpage, setResetPage] = React.useState(false)

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Address/getaddressidCustomer/` + Customer.id_customer)
            .then(res => {
                const Address = res.data;
                setAddress(Address);
            })
    }, [resetpage])

    function handleResetPage() {
        setResetPage(!resetpage)
    }

    console.log(address)

    function showAddress(items) {
        if (items.length !== 0)
            return (
                items.map(function (item, index) {
                    return (
                        <Box
                            key={index}
                            style={{
                                display: 'flex',
                                backgroundColor: '#e6e6e6',
                                padding: 20,
                                borderRadius: 10,
                                marginRight: 10,
                                marginBottom: 10
                            }}
                        >
                            <Box
                                style={{
                                    display: 'flex',
                                    width: '80%'
                                }}
                            >
                                <Typography variant='body1' style={{ width: '15%' }}><b>Địa chỉ {index + 1}:</b></Typography>
                                <Typography variant='body1' style={{ width: '85%' }}>{item.address_customer}</Typography>
                            </Box>

                            <Box
                                style={{
                                    display: 'flex',
                                    width: '20%'
                                }}
                            >
                                <AddressFormEdit handleResetPage={handleResetPage} Address={item}/>
                                <AddressFormDelete handleResetPage={handleResetPage} Address={item}/>
                            </Box>
                        </Box>
                    )
                })
            )
        else {
            <Typography>Chưa có địa chỉ</Typography>
        }
    }

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: 30,
                paddingTop: 10
            }}>
            <AddressFormAdd handleResetPage={handleResetPage} IDCustomer={Customer.id_customer}/>
            {showAddress(address)}
        </Box>
    )
}