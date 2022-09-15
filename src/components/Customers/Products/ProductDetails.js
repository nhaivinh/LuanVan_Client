import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
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

function ProductDetails() {

    let params = useParams();

    const [product, setProduct] = React.useState([])
    const [images, setImages] = React.useState([])

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
    }, [])

    return (
        <Box style={{}}>
            <Container maxWidth="lg" style={{ backgroundColor: 'rgb(248, 248, 252)', borderRadius: '10px', marginTop: 50 }}>
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
                        {product[0] !== undefined ?
                            <Link color="text.primary" to={'/search/?type=' + product[0].type_product + '&page=1'}>
                                    {product[0].type_product.toUpperCase()}
                            </Link>
                            :
                            ''
                        }

                        <Typography color="text.primary">
                            {product[0] !== undefined ?
                                product[0].name_product
                                :
                                ''
                            }
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <Box style={{ height: 450 }}>
                    <Grid container >
                        <Grid item xs={5}>
                            <Box
                                style={{
                                }}
                            >
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
                                            flexDirection: 'row',
                                            alignItems: 'left',
                                            paddingTop: 30,
                                            width: 300,
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Typography variant="h5">{product[0].unit_price_protuct} đ</Typography>
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
                                        <Button variant="contained">Mua Ngay</Button>
                                        <Button variant="contained">Thêm Vào Giỏ Hàng</Button>
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
                            <Typography variant="h5">Mô Tả Sản Phẩm</Typography>
                            <Typography
                                style={{
                                    paddingTop: 10
                                }}>
                                Đánh giá chi tiết Bộ vi xử lý CPU Intel Comet Lake Core i9-10900K
                                CPU là linh kiện quan trọng nhất của một bộ máy tính. Để lựa chọn cho mình một bộ vi xử lý tốc độ cao đáp ứng hầu như mọi nhu cầu sử dụng Bộ vi xử lý CPU Intel Comet Lake Core i9-10900K sẽ là một lựa chọn rất phù hợp với nhu cầu sử dụng cao cấp hiệu năng cao mà bạn đang mong chờ trên bộ PC của mình.
                            </Typography>
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