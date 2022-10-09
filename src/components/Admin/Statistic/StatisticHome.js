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

export default function StatisticHome() {

    const [countRegisterCustomer, setCountRegisterCustomer] = React.useState([]);
    const [countStockByType, setCountStockByType] = React.useState([]);
    const [countSellingByType, setCountSellingByType] = React.useState([]);
    const [countSelling, setCountSelling] = React.useState([]);
    const [countOrder, setCountOrder] = React.useState([]);
    const [incomeOrder, setIncomeOrder] = React.useState([]);

    const [period, setPeriod] = React.useState({});

    const handleChange = (event) => {
        setPeriod(handleShowPeriod(incomeOrder).find(element => element.period === event.target.value));
    };

    React.useEffect(() => {
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

    function handleShowChartSellingProductPercent(type) {
        var result = handleInfoArrayFromPeriod(countSellingByType).reduce((total, currentValue) =>
            total + currentValue.number_of_products, 0
        );  
        if(handleInfoArrayFromPeriod(countSellingByType).find(element => element.type_product === type) != undefined){
            return(handleInfoArrayFromPeriod(countSellingByType).find(element => element.type_product === type).number_of_products / result * 100)
        }
        else{
            return 0
        }
    }

    function handleShowChartSellingProductCount(type) { 
        if(handleInfoArrayFromPeriod(countSellingByType).find(element => element.type_product === type) != undefined){
            return(handleInfoArrayFromPeriod(countSellingByType).find(element => element.type_product === type).number_of_products)
        }else{
            return 0
        }
    }

    const optionsProductSell = {
        height: 300,
        //animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        data: [{
            type: "doughnut",
            indexLabel: "{name}: {y}: SL: {count}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: "Vi xử lý", y: handleShowChartSellingProductPercent('cpu') ,count: handleShowChartSellingProductCount('cpu')},
                { name: "Mainboard", y: handleShowChartSellingProductPercent('mainboard') ,count: handleShowChartSellingProductCount('mainboard')},
                { name: "GPU", y: handleShowChartSellingProductPercent('gpu') ,count: handleShowChartSellingProductCount('gpu')},
                { name: "Ram", y: handleShowChartSellingProductPercent('ram') ,count: handleShowChartSellingProductCount('ram')},
                { name: "PSU", y: handleShowChartSellingProductPercent('psu') ,count: handleShowChartSellingProductCount('psu')},
                { name: "CasePC", y: handleShowChartSellingProductPercent('casepc') ,count: handleShowChartSellingProductCount('casepc')},
                { name: "Ổ cứng", y: handleShowChartSellingProductPercent('harddisk') ,count: handleShowChartSellingProductCount('harddisk')},
                { name: "Tản nhiệt", y: handleShowChartSellingProductPercent('cooling_system') ,count : handleShowChartSellingProductCount('cooling_system')}

                // { name: "CPU", y: handleShowChartSellingProductCount('cpu') ,count : 2},
                // { name: "Mainboard", y: handleShowChartSellingProductCount('mainboard') ,count : 2},
                // { name: "GPU", y: handleShowChartSellingProductCount('gpu') ,count : 2},
                // { name: "Ram", y: handleShowChartSellingProductCount('ram') ,count : 2},
                // { name: "PSU", y: handleShowChartSellingProductCount('psu') ,count : 2},
                // { name: "CasePC", y: handleShowChartSellingProductCount('casepc') ,count : 2},
                // { name: "Ổ cứng", y: handleShowChartSellingProductCount('harddisk') ,count : 2},
                // { name: "Tản nhiệt", y: handleShowChartSellingProductCount('cooling_system') ,count : 2}
            ]
        }]
    }

    const optionsProductStock = {
        height: 300,
        //animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        data: [{
            type: "doughnut",
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: "Unsatisfied", y: 5 },
                { name: "Very Unsatisfied", y: 31 },
                { name: "Very Satisfied", y: 40 },
                { name: "Satisfied", y: 17 },
                { name: "Neutral", y: 7 }
            ]
        }]
    }

    const optionsOrder = {
        height: 300,
        //animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        data: [{
            type: "doughnut",
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: "Unsatisfied", y: 5 },
                { name: "Very Unsatisfied", y: 31 },
                { name: "Very Satisfied", y: 40 },
                { name: "Satisfied", y: 17 },
                { name: "Neutral", y: 7 }
            ]
        }]
    }

    const optionsLineGraph = {
        //animationEnabled: true,
        title: {
            text: "Nuclear Electricity Generation in US"
        },
        axisY: {
            title: "Net Generation (in Billion kWh)",
            suffix: " kWh"
        },
        data: [{
            type: "splineArea",
            xValueFormatString: "MM",
            yValueFormatString: "#,##0.## Sản phẩm",
            showInLegend: true,
            legendText: "kWh = one kilowatt hour",
            dataPoints: [
                { x: new Date(2022, 1), y: 0 },
                { x: new Date(2022, 2), y: 0 },
                { x: new Date(2022, 3), y: 0 },
                { x: new Date(2022, 4), y: 72.743 },
                { x: new Date(2022, 5), y: 85.381 },
                { x: new Date(2022, 6), y: 71.406 },
                { x: new Date(2022, 7), y: 73.163 },
                { x: new Date(2022, 8), y: 92.270 },
                { x: new Date(2022, 9), y: 72.525 },
                { x: new Date(2022, 10), y: 109.121 },
                { x: new Date(2022, 11), y: 73.121 },
                { x: new Date(2022, 12), y: 12.121 }
            ]
        }]
    }

    function isEmptyObject(obj) {
        return JSON.stringify(obj) === '{}';
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
                        <CanvasJSChart options={optionsLineGraph}
                        /* onRef={ref => this.chart = ref} */
                        />
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
                            <Typography variant='h6'><b>Sản phẩm</b></Typography>
                            <Typography variant='body1' style={{ color: "darkgrey" }}>Cơ cấu sản phẩm bán ra</Typography>
                            <CanvasJSChart options={optionsProductSell} />
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
                            <CanvasJSChart options={optionsOrder} />
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            style={{
                                display: 'flex',
                                backgroundColor: 'white',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant='h6' style={{ paddingTop: 20, paddingLeft: 20 }}><b>Sản phẩm bán trong tháng</b></Typography>
                            <Typography variant='body1' style={{ color: "darkgrey", paddingLeft: 20 }}>Tổng quản sản phẩm bán ra trong tháng</Typography>
                            <TableContainer style={{ maxHeight: 320 }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2} style={{ width: '40%' }} align="left">Sản phẩm</TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Đơn giá</TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Số lượng bán</TableCell>
                                            <TableCell style={{ width: '20%' }} align="left">Tổng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            key="một"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                "một"
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                "một"
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
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
                            <CanvasJSChart options={optionsProductStock} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}