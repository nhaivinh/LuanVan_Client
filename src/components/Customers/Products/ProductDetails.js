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
import Tab from '@mui/material/Tab';
import { Tabs } from '@mui/material';
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Pagination from '@mui/material/Pagination';
const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: orange[500],
        left: 0,
        paddingLeft: 10,
    },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    fontSize: 16,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(orange[200]),
    '&:hover': {
        color: orange[700],
        opacity: 1,
    },
    '&.Mui-selected': {
        color: orange[800],
        fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        color: "error",
        label: "R???t kh??ng h??i l??ng",
        text: <SentimentVeryDissatisfiedIcon color="error" />
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        color: "error",
        label: "Kh??ng h??i l??ng"
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        color: "warning",
        label: "B??nh Th?????ng"
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        color: "warning",
        label: "H??i L??ng"
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        color: "warning",
        label: "R???t h??i l??ng"
    }
};

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

    const [page, setPage] = React.useState(1);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const [statusValue, setStatusValue] = React.useState('-1');

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

    const handleChange = (event, newValue) => {
        setStatusValue(newValue);
    };

    function handleFilterRates(Rates) {
        var filteredRates = Rates
        if (statusValue != -1) {
            filteredRates = Rates.filter(function (rate) {
                return (rate.level_rate == statusValue)
            })
        }
        return filteredRates
    }

    function showRate(items) {
        let showArray = handleFilterRates(items)
        if (showArray.length !== 0) {
            if (showArray.length > 4) {
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: 300,
                                marginBottom: 20
                            }}
                        >
                            {showArray
                                .slice((page - 1) * 4, page * 4)
                                .map(function (item, index) {
                                    return (
                                        <ShowRateProduct key={index} rate={item} />
                                    )
                                })}
                        </Box>

                        <Pagination
                            count={Math.ceil(showArray.length / 4)}
                            page={page}
                            onChange={handleChangePage}
                            showFirstButton
                            showLastButton
                        />
                    </>

                )
            } else {
                return (
                    showArray.map(function (item, index) {
                        return (
                            <ShowRateProduct key={index} rate={item} />
                        )
                    })
                )
            }
        } else {
            return (
                <Typography style={{ padding: 20 }}>Ch??a c?? ????nh gi??</Typography>
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
                            <Typography color="text.primary">Trang Ch???</Typography>
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
                                    <Typography variant="body1"> Th????ng Hi???u: {product[0].brand_product}</Typography>
                                    <Typography variant="body1"> B???o H??nh: {product[0].insurance_product} Th??ng</Typography>
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
                                    >{product[0].quantity_product !== 0 ?
                                        <>
                                            {cookies.Account === undefined ?
                                                <>
                                                    <ColorButton variant="contained" className={classes.addToCartButton} onClick={() => navigate('/login')}>Mua Ngay</ColorButton>
                                                    <ColorButton variant="contained" className={classes.addToCartButton} onClick={() => navigate('/login')}>Th??m V??o Gi??? H??ng</ColorButton>
                                                </>
                                                :
                                                <>
                                                    <ColorButton variant="contained" className={classes.addToCartButton} onClick={handleClickBuyNow}>Mua Ngay</ColorButton>
                                                    <ColorButton variant="contained" className={classes.addToCartButton} onClick={handleClickAdd}>Th??m V??o Gi??? H??ng</ColorButton>
                                                </>
                                            }
                                        </>
                                        :
                                        <>
                                            <Typography variant='h6'>S???n ph???m t???m th???i h???t h??ng</Typography>
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
                            <Typography variant="h5">????nh gi??</Typography>
                            <Box sx={{ width: '100%', typography: 'body1', height: '100%' }}>
                                <AntTabs
                                    value={statusValue}
                                    onChange={handleChange}
                                >
                                    <AntTab label="T???t c???" value="-1" />
                                    <AntTab label={customIcons[1].icon} value="1" />
                                    <AntTab label={customIcons[2].icon} value="2" />
                                    <AntTab label={customIcons[3].icon} value="3" />
                                    <AntTab label={customIcons[4].icon} value="4" />
                                    <AntTab label={customIcons[5].icon} value="5" />
                                </AntTabs>
                            </Box>
                            {showRate(rates)}
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box >
                            <Typography variant="h5">Th??ng S??? K??? Thu???t</Typography>
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