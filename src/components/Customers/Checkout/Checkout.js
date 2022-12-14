import React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useCookies } from "react-cookie";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import { useSearchParams } from 'react-router-dom';
import { useStore } from "../../Store";
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


function Checkout() {

    const textInput = React.useRef(null);

    const [searchParams, setSearchParams] = useSearchParams();

    const params = Object.fromEntries([...searchParams]);

    const [cart, setCart] = React.useState([])

    const [state, dispatchStore] = useStore();

    const [typeAddress, setTypeAddress] = React.useState('new')

    const [address, setAddress] = React.useState([]);

    const [infoPayment, setInfoPayment] = React.useState({
        NameDelivery: state.account.name_customer,
        PhoneDelivery: state.account.phone_number_customer,
        AddressDelivery: '',
        TypePayment: 'cod'
    })

    const clientStatusPayment = axios.create({
        baseURL: "https://localhost:7253/api/OrderCustomer/setpaymentstatuswhencreateorder"
    });

    if (params.status !== undefined) {
        if (params.status == 'success') {
            clientStatusPayment
                .put('', {
                })
                .then((response) => {
                    setPosts([response.data, ...posts]);
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage(response.data.message));
                    dispatch(setSeverity(response.data.severity));
                    navigate("/order");
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
        }
    }

    const navigate = useNavigate();

    const [customer, setCustomer] = React.useState({})

    const [posts, setPosts] = React.useState([]);

    const client = axios.create({
        baseURL: "https://localhost:7253/api/OrderCustomer"
    });

    const [, dispatch] = React.useContext(SnackBarContext);

    const [cookies, setCookie] = useCookies(["user"]);

    const [totalPrice, setTotalPrice] = React.useState(0)

    const [totalDiscount, setTotalDiscount] = React.useState(0)

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Cart/getcartbyid/` + cookies.Account)
            .then(res => {
                const Cart = res.data;
                setCart(Cart);
                if (Cart.length === 1) {
                    setTotalPrice((Cart[0].unit_price_product * Cart[0].quantity_product_cart))
                    setTotalDiscount((Cart[0].unit_price_product * Cart[0].quantity_product_cart) * (Cart[0].discount_product * 0.01));
                }
                else {
                    var result = Cart.reduce((total, currentValue) =>
                        total + ((currentValue.unit_price_product * currentValue.quantity_product_cart) * (1 - currentValue.discount_product * 0.01)), 0
                    );
                    var resultDiscount = Cart.reduce((total, currentValue) =>
                        total + ((currentValue.unit_price_product * currentValue.quantity_product_cart) * (currentValue.discount_product * 0.01)), 0
                    );
                    setTotalPrice(result);
                    setTotalDiscount(resultDiscount);
                }
            })
        axios.get(`https://localhost:7253/api/Customer/getcustomerbyid/` + cookies.Account)
            .then(res => {
                const Customer = res.data;
                setCustomer(Customer[0]);
            })
        axios.get(`https://localhost:7253/api/Address/getaddressidCustomer/` + state.account.id_customer)
            .then(res => {
                const Address = res.data;
                setAddress(Address);
            })
    }, [])

    function handleClickBuy() {

        let thongbao = "H??y th??m th??ng tin ????ng d???ng cho :";

        let validName = false;
        let validPhoneNumber = false;
        let validAddress = false;
        let validTypePayment = false;


        if (infoPayment.NameDelivery === "" || infoPayment.NameDelivery.search(/[0-9]/) >= 0) {
            thongbao = thongbao + "\nH??? v?? T??n"
        } else validName = true

        if (!/^[0-9\b]+$/i.test(infoPayment.PhoneDelivery) || infoPayment.PhoneDelivery.length !== 10) {
            thongbao = thongbao + "\nS??? ??i???n tho???i"
        } else validPhoneNumber = true

        if (infoPayment.AddressDelivery === "") {
            thongbao = thongbao + "\n?????a ch???"
        } else validAddress = true

        if (infoPayment.TypePayment === "") {
            thongbao = thongbao + "\nLo???i thanh to??n"
        } else validTypePayment = true

        if (validName && validPhoneNumber && validAddress && validTypePayment) {
            switch (infoPayment.TypePayment) {
                case 'cod':
                    addPosts(customer, infoPayment, totalPrice);
                    navigate("/order");
                    break;
                case 'card':
                    addPosts(customer, infoPayment, totalPrice);
                    handleStripe()
                    break;
                default:
                    break;
            }

        } else {
            alert(thongbao);
        }
    }
    function handlePaymentCart(Cart) {
        var chosenPaymentCart = [];
        if (Cart.length > 0) {
            Cart
                .map(function (product) {
                    var chosenPaymentProduct = {
                        "name_product": product.name_product,
                        "unit_price_product": product.unit_price_product,
                        "quantity_product_cart": product.quantity_product_cart,
                    }
                    chosenPaymentCart.push(chosenPaymentProduct)
                }
                )
        }
        return (chosenPaymentCart)
    }

    function handleStripe() {
        fetch("http://localhost:4000/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: handlePaymentCart(cart),
            }),
        })
            .then(res => {
                if (res.ok)
                    return res.json()
                return res.json().then(json => Promise.reject(json))
            })
            .then(({ url }) => {
                window.location = url
            })
            .catch(e => {
                console.error(e.error)
            })
    }

    const addPosts = (customer, infoPayment, totalPrice) => {
        client
            .post('', {
                "idCustomer": customer.id_customer,
                "totalPayment": totalPrice,
                "paymentType": infoPayment.TypePayment,
                "paymentStatus": 0,
                "deliveryName": infoPayment.NameDelivery,
                "deliveryPhone": infoPayment.PhoneDelivery,
                "deliveryAddress": infoPayment.AddressDelivery,
                "deliveryStatus": 0,
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
    };

    console.log(infoPayment)


    function handleChooseAddress(index) {
        setInfoPayment({ ...infoPayment, AddressDelivery: address[index].address_customer })
        textInput.current.value = address[index].address_customer
    }

    return (
        <Container maxWidth="lg" style={{ backgroundColor: 'rgb(248, 248, 252)', borderRadius: '10px', marginTop: 50 }}>
            <Box
                style={{
                    display: 'flex',
                    height: 50,
                    alignItems: 'center'
                }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/">
                        <Typography color="text.primary">Trang Ch???</Typography>
                    </Link>
                    <Typography color="text.primary">
                        ?????t h??ng
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={8} >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            padding: 20,
                            marginBottom: 10,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                width: '80%',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                padding: 20,
                                borderRadius: 10,
                                minHeight: 350
                            }}>
                            <Typography>H??? t??n ng?????i nh???n</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                defaultValue={infoPayment.NameDelivery}
                                onChange={(e) => { setInfoPayment({ ...infoPayment, NameDelivery: e.target.value }) }}
                            />
                            <Typography>S??? ??i???n tho???i ng?????i nh???n</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                defaultValue={infoPayment.PhoneDelivery}
                                onChange={(e) => { setInfoPayment({ ...infoPayment, PhoneDelivery: e.target.value }) }}
                                sx={{ marginBottom: 2 }}
                            />
                            <Box>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group"
                                        sx={{
                                            "&, &.Mui-focused": {
                                                color: "orange"
                                            }
                                        }}
                                    >
                                        Ch???n lo???i ?????a ch???
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={typeAddress}
                                        onChange={(e) => { setTypeAddress(e.target.value) }}
                                    >
                                        <FormControlLabel value="new"
                                            control={
                                                <Radio
                                                    sx={{
                                                        "&, &.Mui-checked": {
                                                            color: "orange"
                                                        }
                                                    }} />
                                            }
                                            label="?????a ch??? m???i" />
                                        {address.length !== 0 &&
                                            <FormControlLabel value="exist"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            "&, &.Mui-checked": {
                                                                color: "orange"
                                                            }
                                                        }} />
                                                }
                                                label="?????a ch??? ???? l??u" />
                                        }
                                    </RadioGroup>
                                </FormControl>
                                {typeAddress === "exist" &&
                                    <>
                                        {
                                            address.map(function (item, index) {
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
                                                                width: '85%'
                                                            }}
                                                        >
                                                            <Typography variant='body2' style={{ width: '15%' }}><b>?????a ch??? {index + 1}:</b></Typography>
                                                            <Typography variant='body2' style={{ width: '85%' }}>{item.address_customer}</Typography>
                                                        </Box>
                                                        <Box
                                                            style={{
                                                                display: 'flex',
                                                                width: '10%'
                                                            }}
                                                        >
                                                            <ColorButtonContained onClick={() => { handleChooseAddress(index) }}> Ch???n </ColorButtonContained>
                                                        </Box>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </>
                                }
                            </Box>
                            <Typography>?????a ch??? giao h??ng</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined" size="small"
                                multiline
                                fullWidth
                                rows={3}
                                inputRef={textInput}
                                defaultValue={infoPayment.AddressDelivery}
                                onChange={(e) => { setInfoPayment({ ...infoPayment, AddressDelivery: e.target.value }) }}
                            />
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group"
                                    sx={{
                                        "&, &.Mui-focused": {
                                            color: "orange"
                                        }
                                    }}
                                >
                                    Ph????ng th???c thanh to??n
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={infoPayment.TypePayment}
                                    onChange={(e) => { setInfoPayment({ ...infoPayment, TypePayment: e.target.value }) }}
                                >
                                    <FormControlLabel value="cod"
                                        control={
                                            <Radio
                                                sx={{
                                                    "&, &.Mui-checked": {
                                                        color: "orange"
                                                    }
                                                }} />
                                        }
                                        label="Giao h??ng nh???n ti???n - COD" />
                                    <FormControlLabel value="card"
                                        control={
                                            <Radio
                                                sx={{
                                                    "&, &.Mui-checked": {
                                                        color: "orange"
                                                    }
                                                }} />
                                        }
                                        label="Thanh to??n tr???c tuy???n b???ng th??? ng??n h??ng" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            padding: 20,
                            marginBottom: 10,
                            borderRadius: 10
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10
                            }}
                        >
                            <Typography variant='h5'>Th??ng tin ????n h??ng</Typography>
                            <Link to="/cart">
                                <Typography color="text.primary">Ch???nh s???a</Typography>
                            </Link>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {cart.map(function (row) {
                                return (
                                    <Box
                                        key={row.id_product}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'top',
                                            marginTop: 10
                                        }}
                                    >
                                        <Grid
                                            item
                                            xs={3}
                                            style={{
                                                border: '1px solid lightgray',
                                                borderRadius: 5,
                                                padding: 5
                                            }}
                                        >
                                            <img src={"data:image/png;base64, " + row.picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        </Grid>
                                        <Grid item xs={9} >
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    paddingLeft: 10
                                                }}
                                            >
                                                <Typography variant='body2'>{row.name_product}</Typography>
                                                <Typography variant='body2'>S??? l?????ng: {row.quantity_product_cart}</Typography>
                                                <Typography>
                                                    {(row.unit_price_product * (1 - row.discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {row.discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {row.unit_price_product.toLocaleString('vi-VI',
                                                                {
                                                                    style: 'currency',
                                                                    currency: 'VND'
                                                                })}
                                                        </del>
                                                    </Typography>
                                                }
                                            </Box>
                                        </Grid>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        height: 200,
                        justifyContent: 'space-around'
                    }}
                    >
                        <Typography variant="h5">Thanh To??n</Typography>
                        <Typography>{"T???ng t???m t??nh: " +
                            totalPrice.toLocaleString('vi-VI',
                                {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                        </Typography>
                        <Typography>{"Gi???m gi??: " +
                            (totalDiscount).toLocaleString('vi-VI',
                                {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                        </Typography>
                        <Typography>{"Th??nh ti???n: " +
                            (totalPrice - totalDiscount).toLocaleString('vi-VI',
                                {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                        </Typography>
                        <ColorButtonContained variant='contained' onClick={handleClickBuy}>?????t mua</ColorButtonContained>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Checkout