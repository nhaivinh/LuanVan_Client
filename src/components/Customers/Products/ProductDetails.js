import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "swiper/css/bundle";
import 'react-slideshow-image/dist/styles.css';
import ProductImagesSlider from './ProductImagesSlider'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ShowTechInfo from './ShowTechInfo';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import { useCookies } from "react-cookie";
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import ShowRateProduct from './ShowRateProduct';

const useStyles = makeStyles({
    addToCartButton: {
        color: 'black',
        backgroundColor: '#ffa500',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#e69500'
        },
    }
})

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));



function ProductDetails({ resetPage, handleResetPage }) {

    const classes = useStyles();

    let params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = React.useState([])
    const [images, setImages] = React.useState([])
    const [rates, setRates] = React.useState([])
    const [, dispatch] = React.useContext(SnackBarContext);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [posts, setPosts] = React.useState([]);
    const client = axios.create({
        baseURL: "https://localhost:7253/api/Cart"
    });
    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product/getproductbyid/` + params.productId)
            .then(res => {
                const Product = res.data;
                setProduct(Product);
            })
        axios.get(`https://localhost:7253/api/Picture/getpicturebyid/` + params.productId)
            .then(res => {
                const Images = res.data;
                setImages(Images);
            })
        axios.get(`https://localhost:7253/api/RateProduct/GetByIDProduct/` + params.productId)
            .then(res => {
                const Rates = res.data;
                setRates(Rates);
            })
    }, [])

    function handleClickAdd() {
        addPosts(cookies.Account, params.productId);
    }

    function handleClickBuyNow() {
        addPosts(cookies.Account, params.productId);
        navigate('/cart')
    }
    const addPosts = (idAccount, idProduct) => {
        client
            .post('', {
                "idAccount": idAccount,
                "idProduct": idProduct,
                "quantity": 1
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
                handleResetPage()
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

    function showRate(items){
        if(items.length !== 0){
            return(
                items.map(function (item, index){
                    return(
                        <ShowRateProduct key={index} rate={item}/>
                    )
                })
            )
        }else{
            return(
                <Typography>Chưa có đánh giá</Typography>
            )
        }
    }

    return (
        <Box style={{}}>
            <Container maxWidth="lg" style={{ backgroundColor: 'var(--background1)', borderRadius: '10px', marginTop: 50 }}>
                <Box
                    style={{
                        display: 'flex',
                        height: 50,
                        alignItems: 'center'
                    }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/">
                            <Typography color="text.primary">Trang Chủ</Typography>
                        </Link>
                        {product[0] !== undefined &&
                            <Link color="text.primary" to={'/search/?type=' + product[0].type_product + '&page=1'}>
                                {product[0].type_product.toUpperCase()}
                            </Link>
                        }

                        <Typography color="text.primary">
                            {product[0] !== undefined &&
                                product[0].name_product
                            }
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <Box style={{ height: 450 }}>
                    <Grid container >
                        <Grid item xs={5}>
                            <Box>
                                <ProductImagesSlider images={images} />
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            {product[0] !== undefined ?
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        paddingLeft: 100,
                                        alignItems: 'flex-start'
                                    }}
                                    key={product[0].id_product}
                                >
                                    <Typography variant="h4"> {product[0].name_product}</Typography>
                                    <Typography variant="body1"> Thương Hiệu: {product[0].brand_product}</Typography>
                                    <Typography variant="body1"> Bảo Hành: {product[0].insurance_product} Tháng</Typography>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'left',
                                            paddingTop: 30,
                                            width: 300,
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Typography variant="h5">{
                                            (product[0].unit_price_product * (1 - product[0].discount_product * 0.01)).toLocaleString('vi-VI',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                        </Typography>
                                        {product[0].discount_product !== 0 &&
                                            <Typography variant='body2'>
                                                <del>
                                                    {product[0].unit_price_product.toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </del>
                                            </Typography>
                                        }
                                    </Box>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'left',
                                            paddingTop: 30,
                                            width: 300,
                                            justifyContent: 'space-between'
                                        }}
                                        key={product[0].id_product}
                                    >
                                        {cookies.Account === undefined ?
                                            <>
                                                <ColorButton variant="contained" className={classes.addToCartButton} onClick={() => navigate('/login')}>Mua Ngay</ColorButton>
                                                <ColorButton variant="contained" className={classes.addToCartButton} onClick={() => navigate('/login')}>Thêm Vào Giỏ Hàng</ColorButton>
                                            </>
                                            :
                                            <>
                                                <ColorButton variant="contained" className={classes.addToCartButton} onClick={handleClickBuyNow}>Mua Ngay</ColorButton>
                                                <ColorButton variant="contained" className={classes.addToCartButton} onClick={handleClickAdd}>Thêm Vào Giỏ Hàng</ColorButton>
                                            </>
                                        }

                                    </Box>

                                </Box>
                                :
                                ''
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Grid container style={{ marginTop: 20 }}>
                    <Grid item xs={7}>
                        <Box
                            style={{
                                paddingRight: 50
                            }}>
                            <Typography variant="h5">Đánh giá</Typography>
                            {showRate(rates)}
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box >
                            <Typography variant="h5">Thông Số Kỹ Thuật</Typography>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <ShowTechInfo ImportProduct={product} />
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default ProductDetails