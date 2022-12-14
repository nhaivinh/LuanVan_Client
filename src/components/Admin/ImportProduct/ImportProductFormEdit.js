import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { useCookies } from "react-cookie";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


export default function ImportProductFormEdit({ handleResetPage, ImportNote }) {

    const clientImportNote = axios.create({
        baseURL: "https://localhost:7253/api/ImportNote"
    });

    const clientDetailImportNote = axios.create({
        baseURL: "https://localhost:7253/api/DetailImportNote"
    });

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const [account, setAccount] = React.useState({})

    const [, dispatch] = React.useContext(SnackBarContext);

    const [postsImportNote, setPostsImportNote] = React.useState([]);

    const [postsDetailImportNote, setPostsDetailImportNote] = React.useState([]);

    const [suppliers, setSuppliers] = React.useState([]);

    const [chosenSupplier, setChosenSupplier] = React.useState(ImportNote.id_supplier);

    const [products, setProducts] = React.useState([]);

    const [importProduct, setImportProduct] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const [totalImportPrice, setTotalImportPrice] = React.useState(ImportNote.total_price_import);

    const [totalImportQuantity, setTotalImportQuantity] = React.useState(0);

    const [chosenProduct, setChosenProduct] = React.useState({
        id_product: 0
    });

    const [importQuantity, setImportQuantity] = React.useState(0);

    const [importPrice, setImportPrice] = React.useState(0);

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product`)
            .then(res => {
                const Products = res.data;
                setProducts(Products);
            })
        axios.get(`https://localhost:7253/api/Supplier`)
            .then(res => {
                const Suppliers = res.data;
                setSuppliers(Suppliers);
            })
        axios.get(`https://localhost:7253/api/DetailImportNote/getdetailsimportnotebyid/` + ImportNote.id_import_note)
            .then(res => {
                const importProducts = res.data;
                setImportProduct(importProducts);
                var result = importProducts.reduce((total, currentValue) =>
                    total + currentValue.quantity_import_product, 0
                );
                setTotalImportQuantity(result);
            })
        axios.get(`https://localhost:7253/api/Login/getinfobyid/` + cookies.Account)
            .then(res => {
                const Account = res.data;
                setAccount(Account[0]);
            })
    }, [])



    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    function handleClickEditImport(IDProduct) {
        if (importPrice <= 0 || importQuantity <= 0 || chosenProduct.id_product === 0) {
            dispatch(setOpenSnackBar());
            dispatch(setMessage("Ph???i ch???n s???n ph???m v?? s??? l?????ng v?? gi?? nh???p ph???i l???n h??n 0"));
            dispatch(setSeverity("warning"));
        } else {
            setTotalImportPrice(totalImportPrice + (importQuantity * importPrice) - importProduct.find(element => element.id_product === IDProduct).unit_price_import * importProduct.find(element => element.id_product === IDProduct).quantity_import_product)
            setTotalImportQuantity(totalImportQuantity + parseInt(importQuantity) - parseInt(importProduct.find(element => element.id_product === IDProduct).quantity_import_product))       
            const index = importProduct.findIndex(element => element.id_product === IDProduct)
            const arr = importProduct
            const ChosenImportProduct = arr.splice(index, 1)
            ChosenImportProduct[0].quantity_product = ChosenImportProduct[0].quantity_product - ChosenImportProduct[0].quantity_import_product + parseInt(importQuantity)
            ChosenImportProduct[0].unit_price_import = importPrice
            ChosenImportProduct[0].quantity_import_product = importQuantity
            setImportProduct(arr)
            setImportProduct([...importProduct, ChosenImportProduct[0]])
        }

    }

    const handleClickAdd = () => {
        let thongbao = "H??y th??m th??ng tin ????ng d???ng cho :";
        let validSupplier = false;
        let validImportProducts = false;

        if (chosenSupplier === 0) {
            thongbao = thongbao + "\nNh?? cung c???p"
        } else validSupplier = true

        if (importProduct.length === 0) {
            thongbao = thongbao + "\nS???n ph???m"
        } else validImportProducts = true

        if (validSupplier && validImportProducts) {
            addPosts(chosenSupplier, handleImportProductPost(importProduct));
        } else {
            alert(thongbao);
            console.log(chosenSupplier)
        }
    }

    function handleImportProductPost(products) {
        var chosenProducts = [];
        if (products.length > 0) {
            products
                .map(function (product) {
                    var chosenProduct = {
                        "idImportNote": product.id_import_note,
                        "idProduct": product.id_product,
                        "quantityImportProduct": product.quantity_import_product,
                        "unitPriceImport": product.unit_price_import,
                        "stock": product.quantity_product
                    }
                    chosenProducts.push(chosenProduct)
                }
                )
        }
        return (chosenProducts)
    }

    const addPosts = (Supplier, ImportProduct) => {
        clientImportNote
            .put('', {
                "idImportNote": ImportNote.id_import_note,
                "iD_Supplier": Supplier,
                "iD_Staff": account.id_staff,
                "totalPriceImport": totalImportPrice
            })
            .then((response) => {
                setPostsImportNote([response.data, ...postsImportNote]);
            })
            .then(() => {
                clientDetailImportNote
                    .put('', ImportProduct)
                    .then((response) => {
                        setPostsDetailImportNote([response.data, ...postsDetailImportNote]);
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
                <Tooltip title="Ch???nh s???a">
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
                    <Stack direction="row" spacing={2} justifyContent="space-between" style={{ paddingBottom: 30 }}>
                        <Typography id="post-request-error-handling" variant="h5" >
                            S???a ?????t nh???p h??ng
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    marginBottom: 20
                                }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Nh?? cung c???p</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={chosenSupplier}
                                        label="Nh?? cung c???p"
                                        onChange={(event) => { setChosenSupplier(event.target.value); }}
                                    >
                                        <MenuItem value={0} key={0}>
                                            H??y ch???n nh?? cung c???p
                                        </MenuItem>
                                        {suppliers
                                            .map((supplier) => (
                                                <MenuItem value={supplier.id_supplier} key={supplier.id_supplier}>
                                                    {supplier.name_supplier}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    marginBottom: 20
                                }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">S???n ph???m c???n s???a</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={chosenProduct.id_product}
                                        label="S???n ph???m c???n s???a"
                                        onChange={(event) => {
                                            setChosenProduct(products.find(element => element.id_product === event.target.value))
                                            setImportQuantity(importProduct.find(element => element.id_product === event.target.value).quantity_import_product)
                                            setImportPrice(importProduct.find(element => element.id_product === event.target.value).unit_price_import)
                                        }}
                                    >
                                        <MenuItem value={0} key={0}>
                                            H??y ch???n s???n ph???m
                                        </MenuItem>
                                        {importProduct
                                            .map((product, index) => (
                                                <MenuItem value={product.id_product} key={product.id_product}>
                                                    {product.id_product} - {product.name_product}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 190,
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    type="number"
                                    label="S??? l?????ng nh???p"
                                    value={importQuantity}
                                    onChange={(e) => { setImportQuantity(e.target.value) }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    type="number"
                                    label="Gi?? nh???p"
                                    value={importPrice}
                                    onChange={(e) => { setImportPrice(e.target.value) }}
                                />
                                <Box
                                    style={{
                                        display: 'flex',
                                    }}
                                >
                                    <Button variant='contained' onClick={() => handleClickEditImport(chosenProduct.id_product)}>S???a s???n ph???m</Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            {chosenProduct.name_product !== undefined ?
                                < Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        paddingTop: 2
                                    }}
                                >
                                    <Typography variant='h6'> Th??ng tin s???n ph???m </Typography>
                                    <Typography variant='body2'> T??n: {chosenProduct.name_product} </Typography>
                                    <Typography> ????n gi??:
                                        &nbsp;
                                        {chosenProduct.unit_price_product.toLocaleString('vi-VI',
                                            {
                                                style: 'currency',
                                                currency: 'VND'
                                            })} </Typography>
                                    <Typography> Hi???n c??: {chosenProduct.quantity_product} s???n ph???m </Typography>
                                    {chosenProduct.picture_link_product !== null ?
                                        <img src={"data:image/png;base64, " + chosenProduct.picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        :
                                        <img src={chosenProduct.picture_link_product} />
                                    }

                                </Box>
                                :
                                <Box>
                                    <Typography variant='h6'> H??y ch???n s???n ph???m !</Typography>
                                </Box>
                            }
                        </Grid>
                        <Grid item xs={7}>
                            <TableContainer component={Paper} sx={{ maxHeight: 420 }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell width={'5%'}>M??</TableCell>
                                            <TableCell align="left" width={'15%'}>H??nh</TableCell>
                                            <TableCell align="left" width={'25%'}>T??n</TableCell>
                                            <TableCell align="left" width={'15%'}>Gi?? nh???p</TableCell>
                                            <TableCell align="left" width={'15%'}>Gi?? b??n</TableCell>
                                            <TableCell align="left" width={'5%'}>l?????ng nh???p</TableCell>
                                            <TableCell align="left" width={'5%'}>T???n kho</TableCell>
                                            <TableCell align="left" width={'15%'}>T???ng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {importProduct.map((row, index) => (
                                            <TableRow
                                                key={row.id_product}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.id_product}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.picture_link_product !== null ?
                                                        <img src={"data:image/png;base64, " + row.picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                                        :
                                                        <img src={row.picture_link_product} />
                                                    }
                                                </TableCell>
                                                <TableCell align="left">{row.name_product}</TableCell>
                                                <TableCell align="left">
                                                    {parseInt(row.unit_price_import).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.unit_price_product.toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </TableCell>
                                                <TableCell align="left">{row.quantity_import_product}</TableCell>
                                                <TableCell align="left">{row.quantity_product}</TableCell>
                                                <TableCell align="left">
                                                    {(row.unit_price_import * row.quantity_import_product).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Box
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'right',
                            flexDirection: 'column',
                            padding: 20,
                            paddingLeft: 1000,
                            height: 120
                        }}>
                        <Typography>T???ng chi ph?? nh???p:
                            &nbsp;
                            {totalImportPrice.toLocaleString('vi-VI',
                                {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                        </Typography>
                        <Typography>T???ng s??? l?????ng nh???p:
                            &nbsp;
                            {totalImportQuantity}
                        </Typography>
                        <Typography>S??? lo???i s???n ph???m:
                            &nbsp;
                            {importProduct.length}
                        </Typography>
                        <Button variant='contained' onClick={handleClickAdd}>L??u ch???nh s???a</Button>
                    </Box>
                </Box >
            </Modal>
        </div >
    );
}