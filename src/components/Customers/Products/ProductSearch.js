import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

function ProductSearch() {

    const [products, setProducts] = React.useState([])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product/`)
            .then(res => {
                const Products = res.data;
                setProducts(Products);
                handleChosenProducts(Products);
            })
    }, [])

    const [chosenProducts, setChosenProducts] = React.useState([])

    const [resetPage, setResetPage] = React.useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const params = Object.fromEntries([...searchParams]);

    const handleResetPage = function () {
        setResetPage(!resetPage);
    }

    React.useEffect(() => {
        handleChosenProducts(products)
    }, [searchParams])

    const handleChosenProducts = function (Products) {
        var filteredProducts = Products
        if (params.type !== undefined) {
            filteredProducts = Products.filter(function (product) {
                return (product.type_product === params.type)
            })
        }

        if (params.name !== undefined) {
            filteredProducts = Products.filter(function (product) {
                return (product.name_product.toLowerCase().includes(params.name.toLowerCase()))
            })
        }

        console.log(params.name)
        if (params.sort === 'byprice') {
            filteredProducts.sort(function (a, b) {
                switch (params.order) {
                    case 'desc':
                        return a.unit_price_product - b.unit_price_product
                    case 'asc':
                        return b.unit_price_product - a.unit_price_product
                    default:
                        break;
                }
            })
        }
        handleResetPage()
        setChosenProducts(filteredProducts)
    }

    const handleChangePage = (event, newPage) => {
        setSearchParams({ ...params, page: newPage });
    };
    const showProducts = function (Products) {
        if (Products.length > 0) {
            return (
                Products
                    .slice((parseInt(params.page) - 1) * 20, parseInt(params.page) * 20)
                    .map(function (Product) {
                        return (
                            <Box
                                key={Product.id_product}
                                style={{
                                    display: 'flex',
                                    marginBottom: 2,
                                    width: 'calc(20% - 2px)',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                }}>
                                <Link to={"/product/" + Product.id_product}>
                                    <Box
                                        key={Product.id_product}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <img src={"data:image/png;base64, " + Product.picture_link_product} alt="product images" width={'80%'} height={'80%'} />
                                        <Box
                                            key={Product.id_product}
                                            style={{
                                                display: 'flex',
                                                width: '100%',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                paddingTop: 10,
                                            }}
                                        >
                                            <Typography variant='body2'>{Product.name_product}</Typography>
                                            <Typography variant='body1'>{
                                                (Product.unit_price_product).toLocaleString('vi-VI',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                        )
                        // }
                    })
            );
        } else {
            return (
                'Không tìm thấy kết quả tương ứng'
            )
        }
    }
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
                        <Typography color="text.primary">Bộ lọc</Typography>
                    </Breadcrumbs>
                </Box>
                <Box style={{}}>
                    Bộ Lọc {params.productType}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
            <Container maxWidth="lg" style={{ backgroundColor: 'rgb(248, 248, 252)', borderRadius: '10px', marginTop: 10 }}>
                <Box style={{
                    width: '100%',
                    borderBottom: '1px solid rgb(234, 234, 234)',
                    WebkitBoxPack: 'justify',
                    alignItems: 'center',
                    fontSize: 14,
                    height: 64,
                    display: 'flex',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                }}>
                    <Typography>Sắp xếp Theo: </Typography>
                    {params.sort == "byprice" && params.order == "asc" ?
                        <Button
                            variant="contained"
                            onClick={() => { searchParams.delete('order'); searchParams.delete('sort'); setSearchParams(searchParams); }}
                            style={{ marginLeft: 10 }}>
                            Giá giảm dần
                        </Button>
                        :
                        <Button
                            variant="outlined"
                            onClick={() => { setSearchParams({ ...params, order: 'asc', sort: 'byprice' }); }}
                            style={{ marginLeft: 10 }}>
                            Giá giảm dần
                        </Button>
                    }
                    {params.sort == "byprice" && params.order == "desc" ?
                        <Button
                            variant="contained"
                            onClick={() => { searchParams.delete('order'); searchParams.delete('sort'); setSearchParams(searchParams); }}
                            style={{ marginLeft: 10 }}>
                            Giá Tăng dần
                        </Button>
                        :
                        <Button
                            variant="outlined"
                            onClick={() => { setSearchParams({ ...params, order: 'desc', sort: 'byprice' }); }}
                            style={{ marginLeft: 10 }}>
                            Giá Tăng dần
                        </Button>
                    }
                    {params.sort === "bydiscount" ?
                        <Button
                            variant="contained"
                            onClick={() => { searchParams.delete('sort'); setSearchParams(searchParams); }}
                            style={{ marginLeft: 10 }}>
                            Khuyến mãi tốt nhất
                        </Button>
                        :
                        <Button
                            variant="outlined"
                            onClick={() => { setSearchParams({ ...params, sort: 'bydiscount' }); }}
                            style={{ marginLeft: 10 }}>
                            Khuyến mãi tốt nhất
                        </Button>
                    }
                </Box>
                <Box style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: 2,
                    placeContent: 'flex-start space-between',
                    background: 'rgb(246, 246, 246)',
                    padding: '2px 0px'
                }}>
                    {
                        showProducts(chosenProducts)
                    }
                </Box>
                <Box style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50
                }}>
                    <Pagination
                        count={Math.ceil(chosenProducts.length / 20)}
                        page={parseInt(params.page)}
                        onChange={handleChangePage}
                        showFirstButton
                        showLastButton
                    />
                </Box>
            </Container >
        </Box >
    )

}

export default ProductSearch