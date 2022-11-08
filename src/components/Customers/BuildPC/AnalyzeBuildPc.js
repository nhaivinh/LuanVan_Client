import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { CanvasJSChart, CanvasJS } from 'canvasjs-react-charts'
import './Graph.scss'
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import { Bar } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { Cookies } from 'react-cookie';

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

export default function AnalyzeBuildPc({ chosenPC, Products, handleSetChosenProduct, showHint }) {
    const [cpu, setCpu] = React.useState({})
    const [mainboard, setMainboard] = React.useState({})
    const [ram, setRam] = React.useState({})
    const [gpu, setGpu] = React.useState({})
    const [psu, setPsu] = React.useState({})
    const [harddisk1, setHarddisk1] = React.useState({})
    const [harddisk2, setHarddisk2] = React.useState({})
    const [casepc, setCasePc] = React.useState({})

    const [cpus, setCpus] = React.useState([])
    const [gpus, setGpus] = React.useState([])
    const [mainboards, setMainboards] = React.useState([])
    const [rams, setRams] = React.useState([])
    const [psus, setPsus] = React.useState([])
    const [harddisks, setHarddisks] = React.useState([])
    const [casepcs, setCasePcs] = React.useState([])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/cpu`)
            .then(res => {
                const Cpus = res.data;
                setCpus(Cpus);
            })
        axios.get(`https://localhost:7253/api/gpu`)
            .then(res => {
                const Gpus = res.data;
                setGpus(Gpus);
            })
        axios.get(`https://localhost:7253/api/mainboard`)
            .then(res => {
                const Mainboards = res.data;
                setMainboards(Mainboards);
            })
        axios.get(`https://localhost:7253/api/ram`)
            .then(res => {
                const Rams = res.data;
                setRams(Rams);
            })
        axios.get(`https://localhost:7253/api/psu`)
            .then(res => {
                const Psus = res.data;
                setPsus(Psus);
            })
        axios.get(`https://localhost:7253/api/harddisk`)
            .then(res => {
                const Harddisks = res.data;
                setHarddisks(Harddisks);
            })
        axios.get(`https://localhost:7253/api/casepc`)
            .then(res => {
                const CasePCs = res.data;
                setCasePcs(CasePCs);
            })
    }, [])


    React.useEffect(() => {
        if (chosenPC.cpu.id !== 0 &&
            chosenPC.cpu.quantity !== 0 &&
            chosenPC.mainboard.id !== 0 &&
            chosenPC.mainboard.quantity !== 0 &&
            chosenPC.ram.id !== 0 &&
            chosenPC.ram.quantity !== 0 &&
            chosenPC.gpu.id !== 0 &&
            chosenPC.gpu.quantity !== 0 &&
            chosenPC.psu.id !== 0 &&
            chosenPC.psu.quantity !== 0 &&
            chosenPC.casepc.id !== 0 &&
            chosenPC.casepc.quantity !== 0 &&
            (
                (
                    chosenPC.harddisk1.id !== 0 &&
                    chosenPC.harddisk1.quantity !== 0
                ) ||
                (
                    chosenPC.harddisk2.id !== 0 &&
                    chosenPC.harddisk2.quantity !== 0
                )
            )) {
            axios.get(`https://localhost:7253/api/Product/getproductbyid/` + chosenPC.cpu.id_product)
                .then(res => {
                    const Cpu = res.data;
                    setCpu(Cpu[0]);
                })
            axios.get(`https://localhost:7253/api/Product/getproductbyid/` + chosenPC.mainboard.id_product)
                .then(res => {
                    const Product = res.data;
                    setMainboard(Product[0]);
                })
            axios.get(`https://localhost:7253/api/Product/getproductbyid/` + chosenPC.ram.id_product)
                .then(res => {
                    const Product = res.data;
                    setRam(Product[0]);
                })
            axios.get(`https://localhost:7253/api/Product/getproductbyid/` + chosenPC.gpu.id_product)
                .then(res => {
                    const Product = res.data;
                    setGpu(Product[0]);
                })
            axios.get(`https://localhost:7253/api/Product/getproductbyid/` + chosenPC.psu.id_product)
                .then(res => {
                    const Product = res.data;
                    setPsu(Product[0]);
                })
            axios.get(`https://localhost:7253/api/Product/getproductbyid/` + chosenPC.casepc.id_product)
                .then(res => {
                    const Product = res.data;
                    setCasePc(Product[0]);
                })
            if (chosenPC.harddisk1.id_product !== 0) {
                axios.get(`https://localhost:7253/api/Product/getproductbyid/` + chosenPC.harddisk1.id_product)
                    .then(res => {
                        const Product = res.data;
                        setHarddisk1(Product[0]);
                    })
            }
            if (chosenPC.harddisk2.id_product !== 0) {
                axios.get(`https://localhost:7253/api/Product/getproductbyid/` + chosenPC.harddisk2.id_product)
                    .then(res => {
                        const Product = res.data;
                        setHarddisk2(Product[0]);
                    })
            }
        }
    }, [chosenPC])

    const options = {
        animationEnabled: true,
        theme: "light2",
        height: 200,
        title: {
            text: ""
        },
        data: [{
            type: "bar",
            dataPoints: [
                { label: "GPU", y: gpu.scope_gpu },
                { label: 'CPU', y: cpu.scope_cpu }
            ]
        }]
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


    function handleClick(id, type) {
        handleSetChosenProduct(id, type)
    }

    function handleShowHintProduct(type, scope) {
        var exportProduct = Products
        var filteredProducts
        switch (type) {
            case 'cpu':
                filteredProducts = cpus.filter(function (product) {
                    return (product.scope_cpu < (scope + 3000) && product.scope_cpu > (scope - 3000))
                })
                filteredProducts.sort((a, b) => (Math.abs(a.scope_cpu - scope) > Math.abs(b.scope_cpu - scope)) ? 1 : -1)
                break;
            case 'gpu':
                filteredProducts = gpus.filter(function (product) {
                    return (product.scope_gpu < (scope + 3000) && product.scope_gpu > (scope - 3000))
                })
                filteredProducts.sort((a, b) => (Math.abs(a.scope_gpu - scope) > Math.abs(b.scope_gpu - scope)) ? 1 : -1)
                break;
            case 'mainboard':
                filteredProducts = mainboards.filter(function (product) {
                    return (product.socket_mainboard === scope)
                })
                filteredProducts.sort((a, b) => (Math.abs(a.unit_price_product - mainboard.unit_price_product) > Math.abs(a.unit_price_product - mainboard.unit_price_product)) ? 1 : -1)
                break;
            case 'ram':
                filteredProducts = rams.filter(function (product) {
                    return (product.generation_ram === scope)
                })
                filteredProducts.sort((a, b) => (Math.abs(a.unit_price_product - mainboard.unit_price_product) > Math.abs(a.unit_price_product - mainboard.unit_price_product)) ? 1 : -1)
                break;
            default:
                break;
        }

        if (filteredProducts !== undefined) {
            exportProduct = handleGetIDProduct(filteredProducts).map(function (id) {
                return (
                    Products.find(element => element.id_product === id)
                )
            })
        }
        if (exportProduct.length !== 0) {
            return (
                <Box
                    style={{
                        display: 'flex',
                        height: 350,
                        flexFlow: 'row nowrap',
                        flexGrow: 1,
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        paddingLeft: 20,
                        paddingRight: 20,
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        alignContent: 'flex-start',
                    }}
                >
                    {exportProduct.map(function (Product) {
                        return (
                            <Box
                                key={Product.id_product}
                                style={{
                                    display: 'flex',
                                    width: '23%',
                                    flexDirection: 'column',
                                    margin: "1%",
                                    border: '2px solid lightgrey',
                                    borderRadius: 10
                                }}
                            >

                                <Box
                                    key={Product.id_product}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {
                                        Product.picture_product !== null ?
                                            <img src={Product.picture_product} width={'200px'} />
                                            :
                                            <img src={"data:image/png;base64, " + Product.picture_link_product} alt="product images" width={'200px'} height={'200px'} />
                                    }
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
                                        <Link to={"/product/" + Product.id_product} target="_blank">
                                            <Typography variant='body2'>{Product.name_product}</Typography>
                                        </Link>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                width: '100%',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                                paddingBottom: 5,
                                                paddingTop: 5
                                            }}
                                        >
                                            <Typography variant='body2'>{
                                                (Product.unit_price_product).toLocaleString('vi-VI',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                            </Typography>
                                            <ColorButtonContained
                                                onClick={() => { handleClick(Product.id_product, Product.type_product) }}
                                            > Chọn </ColorButtonContained>
                                        </Box>
                                    </Box>
                                </Box>

                            </Box >
                        )
                    })
                    }
                </Box >
            )
        } else {
            return (
                <Typography>Không tìm thấy sản phẩm phù hợp</Typography>
            )
        }
    }
    function handleShowResult(percent) {
        if (percent < 10) {
            return (
                <>
                    <Box
                        style={{
                            display: 'flex',
                            background: 'white',
                            minHeight: 100,
                            padding: 10,
                            borderRadius: 10,
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant='h6'>Kết quả phân tích:</Typography>
                        <Typography variant='body1'>
                            <Link to={"/product/" + cpu.id_product} target="_blank"> {cpu.name_product} </Link>
                            và
                            <Link to={"/product/" + gpu.id_product} target="_blank"> {gpu.name_product} </Link>
                            tương thích tốt khi sử dụng các tác vụ thông thường
                        </Typography>
                        <Typography variant='body1'>Độ nghẽn cổ chai của 2 linh kiện là {(percent - 0).toFixed(1)}%</Typography>
                        <Typography variant='body1'>Đạt hiệu năng tối ưu</Typography>
                    </Box>
                </>
            )
        } else {
            if (percent < 30) {
                if (cpu.scope_cpu > gpu.scope_gpu) {
                    return (
                        <>
                            <Box
                                style={{
                                    display: 'flex',
                                    background: 'white',
                                    minHeight: 100,
                                    padding: 10,
                                    borderRadius: 10,
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant='h6'>Kết quả phân tích:</Typography>
                                <Typography variant='body1'>
                                    <Link to={"/product/" + gpu.id_product} target="_blank"> {gpu.name_product} </Link>
                                    yếu so với
                                    <Link to={"/product/" + cpu.id_product} target="_blank"> {cpu.name_product} </Link>
                                    khi sử dụng các tác vụ thông thường
                                </Typography>
                                <Typography variant='body1'>Độ nghẽn cổ chai của linh kiện là {(percent - 0).toFixed(1)}%</Typography>
                                <Typography variant='body1'>CPU chỉ đạt hiệu năng: {(100 - percent).toFixed(1)}% khi GPU hoạt động với hiệu suất 100%</Typography>
                                <Typography variant='body1'>Khi sử dụng các tác vụ năng GPU của bạn sẽ không đạt được hiệu năng tối đa. Do CPU không đủ nhanh để xử lý dữ liệu</Typography>
                            </Box>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Box
                                style={{
                                    display: 'flex',
                                    background: 'white',
                                    minHeight: 100,
                                    padding: 10,
                                    borderRadius: 10,
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant='h6'>Kết quả phân tích:</Typography>
                                <Typography variant='body1'>
                                    <Link to={"/product/" + cpu.id_product} target="_blank"> {cpu.name_product} </Link>
                                    yếu so với
                                    <Link to={"/product/" + gpu.id_product} target="_blank"> {gpu.name_product} </Link>
                                    khi sử dụng các tác vụ thông thường
                                </Typography>
                                <Typography variant='body1'>Độ nghẽn cổ chai của linh kiện là {(percent - 0).toFixed(1)}%</Typography>
                                <Typography variant='body1'>GPU chỉ đạt hiệu năng: {(100 - percent).toFixed(1)}% khi CPU hoạt động với hiệu suất 100%</Typography>
                                <Typography variant='body1'>Khi sử dụng các tác vụ năng GPU của bạn sẽ không đạt được hiệu năng tối đa. Do CPU không đủ nhanh để xử lý dữ liệu</Typography>
                            </Box>
                        </>
                    )
                }
            } else {
                if (cpu.scope_cpu > gpu.scope_gpu) {
                    return (
                        <>
                            <Box
                                style={{
                                    display: 'flex',
                                    background: 'white',
                                    minHeight: 100,
                                    padding: 10,
                                    borderRadius: 10,
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant='h6'>Kết quả phân tích:</Typography>
                                <Typography variant='body1'>
                                    <Link to={"/product/" + gpu.id_product} target="_blank"> {gpu.name_product} </Link>
                                    Rất Yếu so với
                                    <Link to={"/product/" + cpu.id_product} target="_blank"> {cpu.name_product} </Link>
                                    khi sử dụng các tác vụ thông thường
                                </Typography>
                                <Typography variant='body1'>Độ nghẽn cổ chai của linh kiện là {(percent - 0).toFixed(1)}%</Typography>
                                <Typography variant='body1'>CPU chỉ đạt hiệu năng: {(100 - percent).toFixed(1)}% khi GPU hoạt động với hiệu suất 100%</Typography>
                                <Typography variant='h6' style={{ color: 'red' }}>CPU và GPU không thể hoạt động hiệu quả</Typography>
                            </Box>
                        </>
                    )
                } else {
                    return (
                        <>
                            <Box
                                style={{
                                    display: 'flex',
                                    background: 'white',
                                    minHeight: 100,
                                    padding: 10,
                                    borderRadius: 10,
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant='h6'>Kết quả phân tích:</Typography>
                                <Typography variant='body1'>
                                    <Link to={"/product/" + cpu.id_product} target="_blank"> {cpu.name_product} </Link>
                                    Rất Yếu so với
                                    <Link to={"/product/" + gpu.id_product} target="_blank"> {gpu.name_product} </Link>
                                    khi sử dụng các tác vụ thông thường
                                </Typography>
                                <Typography variant='body1'>Độ nghẽn cổ chai của linh kiện là {(percent - 0).toFixed(1)}%</Typography>
                                <Typography variant='body1'>GPU chỉ đạt hiệu năng: {(100 - percent).toFixed(1)}% khi CPU hoạt động với hiệu suất 100%</Typography>
                                <Typography variant='h6' style={{ color: 'red' }}>CPU và GPU không thể hoạt động hiệu quả</Typography>
                            </Box>
                        </>
                    )
                }
            }
        }
    }

    function handlePercentBottleNeck() {
        if (cpu.scope_cpu > gpu.scope_gpu)
            return (
                ((cpu.scope_cpu - gpu.scope_gpu) / cpu.scope_cpu * 100).toFixed(1)
            )
        else {
            return (
                ((gpu.scope_gpu - cpu.scope_cpu) / gpu.scope_gpu * 100).toFixed(1)
            )
        }
    }

    function SemiCircleChart({ min, max, value }) {
        let color
        if (value < 10) {
            color = 'green'
        } else {
            if (value < 30) {
                color = 'yellow'
            } else {
                color = 'red'
            }
        }
        const angle = (value / max) * 180;
        const style = { '--angle': angle + 'deg', 'backgroundColor': color };

        return (
            <div className="sc-gauge">
                <div className="sc-background">
                    <div className="sc-percentage" style={style}></div>
                    <div className="sc-mask"></div>
                    <span className="sc-value">{value}%</span>
                </div>
                <span className="sc-min">{min}</span>
                <span className="sc-max">{max}</span>
            </div>
        )

    }

    function showHintMainboard() {
        if (cpu.socket_cpu !== mainboard.socket_mainboard) {
            return (
                <Box
                    style={{
                        display: 'flex',
                        background: 'white',
                        minHeight: 100,
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 10,
                        flexDirection: 'column'
                    }}
                >
                    <Stack direction="row" spacing={2} justifyContent="space-between" borderLeft={'5px solid black'} marginTop={2} marginBottom={2} paddingRight={3}>
                        <Typography variant='h6' paddingLeft={2}>Gợi ý bo mạch chủ phù hợp</Typography>
                    </Stack>
                    {handleShowHintProduct('mainboard', cpu.socket_cpu)}
                </Box>
            )
        }
    }

    function showHintRam() {
        if (ram.generation_ram !== mainboard.type_ram_support) {
            return (
                <Box
                    style={{
                        display: 'flex',
                        background: 'white',
                        minHeight: 100,
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 10,
                        flexDirection: 'column'
                    }}
                >
                    <Stack direction="row" spacing={2} justifyContent="space-between" borderLeft={'5px solid black'} marginTop={2} marginBottom={2} paddingRight={3}>
                        <Typography variant='h6' paddingLeft={2}>Gợi ý Ram phù hợp với Bo mạch chủ</Typography>
                    </Stack>
                    {handleShowHintProduct('ram', mainboard.type_ram_support)}
                </Box>
            )
        }
    }

    return (
        <Box
            style={{
                display: 'flex',
                minHeight: 500,
                flexDirection: 'column'
            }}
        >
            <Typography variant='h6'>
                Phân tích cấu hình
            </Typography>
            <Grid container spacing={2} minHeight={500}>
                <Grid item xs={6}>
                    <Box
                        style={{
                            display: 'flex',
                            background: 'white',
                            borderRadius: 10,
                            padding: 20,
                            height: 260
                        }}
                    >
                        <Box style={{
                            width: 200,
                            height: 200
                        }}>
                            {
                                cpu.picture_product !== null ?
                                    <img src={cpu.picture_product} width={'200px'} />
                                    :
                                    <img src={"data:image/png;base64, " + cpu.picture_link_product} alt="product images" width={'200px'} height={'200px'} />
                            }
                        </Box>
                        <Box style={{
                            display: 'flex',
                            paddingLeft: 10,
                            flexDirection: 'column'
                        }}>
                            <Typography variant='h6'> {cpu.name_product} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Thương hiệu: {cpu.brand_product} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Số nhân: {cpu.core_cpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Số luồng: {cpu.thread_cpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Socket: {cpu.socket_cpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Kiến trúc: {cpu.architecture_cpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Xung nhịp: {cpu.clock_speed_cpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> TDP: {cpu.tdp_cpu}W </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Bộ nhớ đệm: {cpu.cache_cpu}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        style={{
                            display: 'flex',
                            background: 'white',
                            borderRadius: 10,
                            padding: 20,
                            height: 260
                        }}
                    >
                        <Box style={{
                            width: 200,
                            height: 200
                        }}>
                            {
                                gpu.picture_product !== null ?
                                    <img src={gpu.picture_product} width={'200px'} />
                                    :
                                    <img src={"data:image/png;base64, " + gpu.picture_link_product} alt="product images" width={'200px'} height={'200px'} />
                            }
                        </Box>
                        <Box style={{
                            display: 'flex',
                            paddingLeft: 10,
                            flexDirection: 'column'
                        }}>
                            <Typography variant='h6'> {gpu.name_product} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Thương hiệu: {gpu.brand_product} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Chipset: {gpu.chipset_gpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Thương hiệu Chipset: {gpu.producer_chipset} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Số nhân: {gpu.amount_core} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Xung nhịp: {gpu.clock_speed_gpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Loại bộ nhớ: {gpu.type_memory_gpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> Dung lượng: {gpu.capacity_memory_gpu} </Typography>
                            <Typography variant='body2' style={{ color: "#303030" }}> TDP: {gpu.tdp_gpu}W </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        style={{
                            display: 'flex',
                            background: 'white',
                            borderRadius: 10,
                            height: 200,
                            justifyContent: 'center'
                        }}
                    >
                        <SemiCircleChart
                            min={0}
                            max={100}
                            value={handlePercentBottleNeck()}
                        />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box
                        style={{
                            display: 'flex',
                            background: 'white',
                            borderRadius: 10,
                            height: 200
                        }}
                    >
                        {/* <CanvasJSChart options={options} /> */}
                        <Bar
                            height="75%"
                            data={{
                                labels: [
                                    "",
                                ],
                                datasets: [
                                    {
                                        label: "CPU",
                                        backgroundColor: [
                                            "#3e95cd",
                                        ],
                                        data: [
                                            cpu.scope_cpu,
                                        ]
                                    },
                                    {
                                        label: "GPU",
                                        backgroundColor: [
                                            "#8e5ea2",
                                        ],
                                        data: [
                                            gpu.scope_gpu,
                                        ]
                                    },
                                ],
                            }}
                            options={{
                                indexAxis: 'y',
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: true,
                                    text: ""
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return tooltipItem.yLabel;
                                        }
                                    }
                                }
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {handleShowResult(handlePercentBottleNeck())}
                    {(showHint === true && handlePercentBottleNeck() > 10) &&
                        <>
                            < Box
                                style={{
                                    display: 'flex',
                                    background: 'white',
                                    minHeight: 100,
                                    padding: 10,
                                    marginTop: 10,
                                    borderRadius: 10,
                                    flexDirection: 'column'
                                }}
                            >
                                <Stack direction="row" spacing={2} justifyContent="space-between" borderLeft={'5px solid black'} marginTop={2} marginBottom={2} paddingRight={3}>
                                    <Typography variant='h6' paddingLeft={2}>Gợi ý nâng cấp vi xử lý</Typography>
                                </Stack>
                                {handleShowHintProduct('cpu', gpu.scope_gpu)}
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    background: 'white',
                                    minHeight: 100,
                                    padding: 10,
                                    marginTop: 10,
                                    borderRadius: 10,
                                    flexDirection: 'column'
                                }}
                            >
                                <Stack direction="row" spacing={2} justifyContent="space-between" borderLeft={'5px solid black'} marginTop={2} marginBottom={2} paddingRight={3}>
                                    <Typography variant='h6' paddingLeft={2}>Gợi ý hạ cấp vi card đồ hoạ</Typography>
                                </Stack>
                                {handleShowHintProduct('gpu', cpu.scope_cpu)}
                            </Box>

                        </>
                    }
                    {showHintMainboard()}
                    {showHintRam()}
                </Grid>
            </Grid>
        </Box >
    )
}