import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { CanvasJSChart, CanvasJS } from 'canvasjs-react-charts'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Doughnut, Bar } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";


function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}

export default function StatisticHome() {

    const [countRegisterCustomer, setCountRegisterCustomer] = React.useState([]);
    const [countStockByType, setCountStockByType] = React.useState([]);
    const [countSellingByType, setCountSellingByType] = React.useState([]);
    const [countSelling, setCountSelling] = React.useState([]);
    const [countOrder, setCountOrder] = React.useState([]);
    const [incomeOrder, setIncomeOrder] = React.useState([]);
    const [sellingProducts, setSellingProducts] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [countLastImportSellingProduct, setCountLastImportSellingProduct] = React.useState([]);

    const [period, setPeriod] = React.useState({});
    const [typeShowSellingProduct, setTypeShowSellingProduct] = React.useState(0);

    const handleChange = (event) => {
        setPeriod(handleShowPeriod(incomeOrder).find(element => element.period === event.target.value));
    };

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/product`)
            .then(res => {
                const items = res.data;
                setProducts(items);
            })
        axios.get(`https://localhost:7253/api/Statistic/GetCountRegisterCustomer`)
            .then(res => {
                const items = res.data;
                setCountRegisterCustomer(items);
            })
        axios.get(`https://localhost:7253/api/Statistic/GetCountStockProductByType`)
            .then(res => {
                const items = res.data;
                setCountStockByType(items);
            })
        axios.get(`https://localhost:7253/api/Statistic/GetCountSellingProductByType`)
            .then(res => {
                const items = res.data;
                setCountSellingByType(items);
            })
        axios.get(`https://localhost:7253/api/Statistic/GetCountSellingProduct`)
            .then(res => {
                const items = res.data;
                setCountSelling(items);
            })
        axios.get(`https://localhost:7253/api/Statistic/GetCountOrder`)
            .then(res => {
                const items = res.data;
                setCountOrder(items);
            })
        axios.get(`https://localhost:7253/api/Statistic/GetIncomeOrder`)
            .then(res => {
                const items = res.data;
                setIncomeOrder(items);
            })
        axios.get(`https://localhost:7253/api/Statistic/GetSellingProduct`)
            .then(res => {
                const items = res.data;
                setSellingProducts(items);
            })
        axios.get(`https://localhost:7253/api/Statistic/GetCountDayLastImportAndSelling`)
            .then(res => {
                const items = res.data;
                setCountLastImportSellingProduct(items);
            })
    }, [])

    React.useEffect(() => {
        if (handleShowPeriod(incomeOrder).length !== 0)
            setPeriod(handleShowPeriod(incomeOrder)[handleShowPeriod(incomeOrder).length - 1]);
    }, [incomeOrder])

    function handleShowPeriod(items) {
        var ExportPeriod = [];
        if (items.length > 0) {
            items
                .map(function (item) {
                    var chosenPeriod = {
                        'month': item.month,
                        'year': item.year,
                        'period': item.month + "/" + item.year
                    }
                    ExportPeriod.push(chosenPeriod)
                }
                )
        }
        return (ExportPeriod)
    }

    function handleInfoArrayFromPeriod(items) {
        return (items.filter(element => element.month === period.month && element.year === period.year))
    }


    function handleInfoObjectFromPeriod(items) {
        return (items.find(element => element.month === period.month && element.year === period.year))
    }

    function handleChooseOutdateProduct(items) {
        var filterOutdateProduct = items.filter(function (element) {
            if (element.days_count_last_import === null) {
                return (false)
            } else {
                if (element.days_count_last_selling === null) {
                    if (element.days_count_last_import > 60) {
                        return (true)
                    } else {
                        return (false)
                    }
                } else {
                    if (element.days_count_last_selling > 60) {
                        return (false)
                    } else {
                        return (false)
                    }
                }
            }
        }
        )
        return (filterOutdateProduct)
    }

    function handleShowChartSellingProduct(type) {
        switch (typeShowSellingProduct) {
            case 0:
                if (handleInfoArrayFromPeriod(countSellingByType).find(element => element.type_product === type) !== undefined) {
                    return (handleInfoArrayFromPeriod(countSellingByType).find(element => element.type_product === type).number_of_products)
                } else {
                    return 0
                }
            case 1:
                if (handleInfoArrayFromPeriod(countSellingByType).find(element => element.type_product === type) !== undefined) {
                    return (handleInfoArrayFromPeriod(countSellingByType).find(element => element.type_product === type).imcome)
                } else {
                    return 0
                }
            default:
                break;
        }

    }

    function handleShowChartStockProductCount(type) {
        if (countStockByType.find(element => element.type_product === type) !== undefined) {
            return (countStockByType.find(element => element.type_product === type).number_of_products)
        } else {
            return 0
        }
    }

    function handleShowChartOrderCountByStatus(status) {
        if (handleInfoArrayFromPeriod(countOrder).find(element => element.delivery_status === status) !== undefined) {
            return (handleInfoArrayFromPeriod(countOrder).find(element => element.delivery_status === status).number_of_order)
        } else {
            return 0
        }
    }

    function isEmptyObject(obj) {
        return JSON.stringify(obj) === '{}';
    }

    function handleGetIDProduct(products) {
        var chosenProducts = [];
        if (products.length > 0) {
            products
                .map(function (product) {
                    chosenProducts.push(product.id_product)
                })
        }
        return (chosenProducts)
    }

    function showProduct(ChosenProduct) {
        var exportProduct = products.filter(function (product) {
            return (handleGetIDProduct(ChosenProduct).includes(product.id_product))
        })
        return (exportProduct)
    }

    function showTypeSort() {
        switch (typeShowSellingProduct) {
            case 0:
                return (
                    'Số Lượng'
                )
            case 1:
                return (
                    'Doanh Thu'
                )
            default:
                break;
        }
    }

    return (
        <Box>
            <Container>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="p"
                        sx={
                            {
                                fontSize: 30,
                                color: "var(--color4)",
                                fontWeight: "bold",
                            }
                        }
                    >
                        Thống Kê
                    </Typography>
                    {!isEmptyObject(period) &&
                        <Box sx={{ minWidth: 240 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={period.period}
                                    label="Tháng"
                                    onChange={handleChange}
                                >
                                    {
                                        handleShowPeriod(incomeOrder).map(function (item) {
                                            return (
                                                <MenuItem key={item.period} value={item.period}>{item.period}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    }

                </Stack>
                <Divider sx={{ marginBottom: 3 }}></Divider>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                borderRadius: 10,
                                height: 200,
                                padding: 20,
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant='h6'><b>Doanh Thu</b></Typography>
                            <Typography variant='body1' style={{ color: "darkgrey" }}>Tổng doanh thu của tháng</Typography>
                            <Typography variant='h5' style={{ marginTop: 30 }}>
                                <b>
                                    {handleInfoObjectFromPeriod(incomeOrder) !== undefined &&
                                        handleInfoObjectFromPeriod(incomeOrder).price_of_order.toLocaleString('vi-VI',
                                            {
                                                style: 'currency',
                                                currency: 'VND'
                                            })
                                    }
                                </b>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                borderRadius: 10,
                                height: 200,
                                padding: 20,
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant='h6'><b>Tổng quan</b></Typography>
                            <Typography variant='body1' style={{ color: "darkgrey" }}>Các thông số thu được trong tháng</Typography>
                            <Divider sx={{ marginBottom: 2 }}></Divider>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    paddingTop: 10,
                                    borderRadius: 10,
                                }}
                            >
                                <Grid item xs={4}>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        <AccountBalanceWalletIcon sx={{ fontSize: 50, color: 'orange', marginRight: 1 }} color="action" />
                                        <Box
                                            style={{
                                                display: 'flex',
                                                backgroundColor: 'white',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography variant='body1' style={{ color: "darkgrey" }}>Số đơn hàng</Typography>
                                            <Typography variant='h5'>
                                                {handleInfoObjectFromPeriod(countOrder) !== undefined &&
                                                    handleInfoObjectFromPeriod(countOrder).number_of_order
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        <ShoppingBagIcon sx={{ fontSize: 50, marginRight: 1 }} color="primary" />
                                        <Box
                                            style={{
                                                display: 'flex',
                                                backgroundColor: 'white',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography variant='body1' style={{ color: "darkgrey" }}>Số sản phẩm đã bán</Typography>
                                            <Typography variant='h5'>
                                                {handleInfoObjectFromPeriod(countSelling) !== undefined &&
                                                    handleInfoObjectFromPeriod(countSelling).count_of_order
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        <AccountBoxIcon sx={{ fontSize: 50, marginRight: 1 }} />
                                        <Box
                                            style={{
                                                display: 'flex',
                                                backgroundColor: 'white',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography variant='body1' style={{ color: "darkgrey" }}>Khách hàng mới</Typography>
                                            <Typography variant='h5'>
                                                {handleInfoObjectFromPeriod(countRegisterCustomer) !== undefined &&
                                                    handleInfoObjectFromPeriod(countRegisterCustomer).number_of_register
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                flexDirection: 'column',
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography variant='h6'><b>Sản phẩm</b></Typography>
                                    <Typography variant='body1' style={{ color: "darkgrey" }}>Biểu đồ sản phẩm bán ra</Typography>
                                </Box>

                                <Box sx={{ minWidth: 200 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Lọc</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={typeShowSellingProduct}
                                            label="Lọc"
                                            onChange={(e) => { setTypeShowSellingProduct(e.target.value) }}
                                        >
                                            <MenuItem key={0} value={0}>Theo số lượng</MenuItem>
                                            <MenuItem key={1} value={1}>Theo doanh thu</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            {/* <Doughnut
                                data={{
                                    labels: [
                                        "Vi xử lý",
                                        "Bo mạch chủ",
                                        "Ram",
                                        "Card đồ hoạ",
                                        "Nguồn",
                                        "Ổ cứng",
                                        "Tản nhiệt",
                                    ],
                                    datasets: [
                                        {
                                            label: "Population (millions)",
                                            backgroundColor: [
                                                "#3e95cd",
                                                "#8e5ea2",
                                                "#3cba9f",
                                                "#cd76fb",
                                                "#c45850",
                                                "#ffaa00",
                                                "#254661"
                                            ],
                                            data: [
                                                handleShowChartSellingProduct('cpu'),
                                                handleShowChartSellingProduct('mainboard'),
                                                handleShowChartSellingProduct('ram'),
                                                handleShowChartSellingProduct('gpu'),
                                                handleShowChartSellingProduct('psu'),
                                                handleShowChartSellingProduct('harddisk'),
                                                handleShowChartSellingProduct('cooling_system'),
                                            ]
                                        }
                                    ]
                                }}
                                option={{

                                }}
                            /> */}
                            <Bar
                                data={{
                                    labels: [
                                        "Vi xử lý",
                                        "Bo mạch chủ",
                                        "Ram",
                                        "Card đồ hoạ",
                                        "Nguồn",
                                        "Ổ cứng",
                                        "Tản nhiệt",
                                    ],
                                    datasets: [
                                        {
                                            label: showTypeSort(),
                                            backgroundColor: [
                                                "#3e95cd",
                                                "#8e5ea2",
                                                "#3cba9f",
                                                "#cd76fb",
                                                "#c45850",
                                                "#ffaa00",
                                                "#254661"
                                            ],
                                            data: [
                                                handleShowChartSellingProduct('cpu'),
                                                handleShowChartSellingProduct('mainboard'),
                                                handleShowChartSellingProduct('ram'),
                                                handleShowChartSellingProduct('gpu'),
                                                handleShowChartSellingProduct('psu'),
                                                handleShowChartSellingProduct('harddisk'),
                                                handleShowChartSellingProduct('cooling_system'),
                                            ]
                                        }
                                    ],
                                }}
                                options={{
                                    legend: { display: true },
                                    title: {
                                        display: true,
                                        text: "Predicted world population (millions) in 2050"
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant='h6' style={{ paddingTop: 20, paddingLeft: 20 }}><b>Sản phẩm bán trong tháng</b></Typography>
                            <Typography variant='body1' style={{ color: "darkgrey", paddingLeft: 20 }}>Tổng quản sản phẩm bán ra trong tháng</Typography>
                            <TableContainer style={{ maxHeight: 400 }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader={true}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2} style={{ width: '45%' }} align="left">Sản phẩm</TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Đơn giá</TableCell>
                                            <TableCell style={{ width: '15%' }} align="left">Số lượng bán</TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Tổng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            showProduct(handleInfoArrayFromPeriod(sellingProducts)).map(function (Product) {
                                                return (
                                                    <TableRow key={Product.id_product}>
                                                        <TableCell align="left">
                                                            {Product.picture_product !== null ?
                                                                <img src={Product.picture_product} alt="product images" width={'100px'} />
                                                                :
                                                                <img src={"data:image/png;base64, " + Product.picture_link_product} alt="product images" width={'100px'} height={'100px'} />
                                                            }
                                                        </TableCell>
                                                        <TableCell align="left">{Product.name_product}</TableCell>
                                                        <TableCell align="left">
                                                            <Box
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    flexDirection: 'column',
                                                                    width: '25%',
                                                                }}
                                                            >
                                                                <Typography variant='body1'>
                                                                    {(Product.unit_price_product * (1 - Product.discount_product * 0.01)).toLocaleString('vi-VI',
                                                                        {
                                                                            style: 'currency',
                                                                            currency: 'VND'
                                                                        })}
                                                                </Typography>
                                                                {Product.discount_product !== 0 &&
                                                                    <Typography variant='body2'>
                                                                        <del>
                                                                            {Product.unit_price_product.toLocaleString('vi-VI',
                                                                                {
                                                                                    style: 'currency',
                                                                                    currency: 'VND'
                                                                                })}
                                                                        </del>
                                                                    </Typography>
                                                                }
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {
                                                                handleInfoArrayFromPeriod(sellingProducts).find(element => element.id_product === Product.id_product).quantity
                                                            }
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Typography variant='body1'>
                                                                {
                                                                    ((Product.unit_price_product * (1 - Product.discount_product * 0.01))
                                                                        *
                                                                        handleInfoArrayFromPeriod(sellingProducts).find(element => element.id_product === Product.id_product).quantity)
                                                                        .toLocaleString('vi-VI',
                                                                            {
                                                                                style: 'currency',
                                                                                currency: 'VND'
                                                                            })
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                flexDirection: 'column',
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <Typography variant='h6'><b>Đơn hàng</b></Typography>
                            <Typography variant='body1' style={{ color: "darkgrey" }}>Cơ cấu trạng thái đơn hàng</Typography>
                            <Doughnut
                                data={{
                                    labels: [
                                        "Đang chờ xử lý",
                                        "Đã duyệt",
                                        "Đang vận chuyển",
                                        "Giao hàng thành công",
                                        "Đã huỷ",
                                    ],
                                    datasets: [
                                        {
                                            label: "Population (millions)",
                                            backgroundColor: [
                                                "#5F9DF7",
                                                "#1746A2",
                                                "#FDFF00",
                                                "#329932",
                                                "#FF1E1E",
                                            ],
                                            data: [
                                                handleShowChartOrderCountByStatus(0),
                                                handleShowChartOrderCountByStatus(1),
                                                handleShowChartOrderCountByStatus(2),
                                                handleShowChartOrderCountByStatus(3),
                                                handleShowChartOrderCountByStatus(4)
                                            ]
                                        }
                                    ]
                                }}
                                option={{
                                    title: {
                                        display: true,
                                        text: ""
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                flexDirection: 'column',
                                padding: 20,
                                borderRadius: 10,
                            }}
                        >
                            <Typography variant='h6'><b>Sản phẩm tồn kho</b></Typography>
                            <Typography variant='body1' style={{ color: "darkgrey" }}>Cơ cấu sản phẩm tồn kho</Typography>
                            {countStockByType.length !== 0 &&
                                <Doughnut
                                    data={{
                                        labels: [
                                            "Vi xử lý",
                                            "Bo mạch chủ",
                                            "Ram",
                                            "Card đồ hoạ",
                                            "Nguồn",
                                            "Ổ cứng",
                                            "Tản nhiệt",
                                        ],
                                        datasets: [
                                            {
                                                label: "",
                                                backgroundColor: [
                                                    "#3e95cd",
                                                    "#8e5ea2",
                                                    "#3cba9f",
                                                    "#cd76fb",
                                                    "#c45850",
                                                    "#ffaa00",
                                                    "#254661"
                                                ],
                                                data: [
                                                    handleShowChartStockProductCount('cpu'),
                                                    handleShowChartStockProductCount('mainboard'),
                                                    handleShowChartStockProductCount('ram'),
                                                    handleShowChartStockProductCount('gpu'),
                                                    handleShowChartStockProductCount('psu'),
                                                    handleShowChartStockProductCount('harddisk'),
                                                    handleShowChartStockProductCount('cooling_system'),
                                                ]
                                            }
                                        ]
                                    }}
                                    option={{

                                    }}
                                />
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant='h6' style={{ paddingTop: 20, paddingLeft: 20 }}><b>Danh Sách tồn hàng</b></Typography>
                            <Typography variant='body1' style={{ color: "darkgrey", paddingLeft: 20 }}>Những sản phẩm chưa phát sinh giao dịch trong vòng 60 ngày</Typography>
                            <TableContainer style={{ maxHeight: 600 }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader={true}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2} style={{ width: '35%' }} align="left">Sản phẩm</TableCell>
                                            <TableCell style={{ width: '15%' }} align="left">Số lượng tồn</TableCell>
                                            <TableCell style={{ width: '25%' }} align="left">Lần nhập hàng cuối</TableCell>
                                            <TableCell style={{ width: '25%' }} align="left">Lần bán hàng cuối</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            showProduct(handleChooseOutdateProduct(countLastImportSellingProduct)).map(function (Product) {
                                                return (
                                                    <TableRow key={Product.id_product}>
                                                        <TableCell align="left">
                                                            {Product.picture_product !== null ?
                                                                <img src={Product.picture_product} alt="product images" width={'100px'} />
                                                                :
                                                                <img src={"data:image/png;base64, " + Product.picture_link_product} alt="product images" width={'100px'} height={'100px'} />
                                                            }
                                                        </TableCell>
                                                        <TableCell align="left">{Product.name_product}</TableCell>
                                                        <TableCell align="left">{Product.quantity_product}</TableCell>
                                                        <TableCell align="left">
                                                            {handleChooseOutdateProduct(countLastImportSellingProduct).find(element => element.id_product === Product.id_product).import_date !== null ?
                                                                getFormattedDate(new Date(handleChooseOutdateProduct(countLastImportSellingProduct).find(element => element.id_product === Product.id_product).import_date))
                                                                + " - " +
                                                                handleChooseOutdateProduct(countLastImportSellingProduct).find(element => element.id_product === Product.id_product).days_count_last_import
                                                                + " Ngày"
                                                                :
                                                                "Chưa tồn tại nhập hàng"
                                                            }

                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {handleChooseOutdateProduct(countLastImportSellingProduct).find(element => element.id_product === Product.id_product).order_date !== null ?
                                                                getFormattedDate(new Date(handleChooseOutdateProduct(countLastImportSellingProduct).find(element => element.id_product === Product.id_product).order_date))
                                                                + " - " +
                                                                handleChooseOutdateProduct(countLastImportSellingProduct).find(element => element.id_product === Product.id_product).days_count_last_selling
                                                                + " Ngày"
                                                                :
                                                                "Chưa phát sinh giao dịch"
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}