import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const ColorSlider = styled(Slider)(({ theme }) => ({
    color: orange[400],
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));

const ColorButtonContained = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    fontWeight: 900,
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

const ColorButtonOutline = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[600]),
    fontWeight: 900,
    backgroundColor: 'white',
    border: '1px solid ' + orange[500],
    '&:hover': {
        border: '1px solid ' + orange[700],
    },
}));

function ProductSearch() {
    const [products, setProducts] = React.useState([])

    const [cpus, setCpus] = React.useState([])
    const [mainboards, setMainboards] = React.useState([])
    const [rams, setRams] = React.useState([])
    const [gpus, setGpu] = React.useState([])
    const [psus, setPsus] = React.useState([])
    const [harddisks, setHarddisks] = React.useState([])
    const [casepcs, setCasePcs] = React.useState([])
    const [coolingsystems, setCoolingsystems] = React.useState([])

    const [rangePrice, setRangePrice] = React.useState([0, 30000000]);

    const handleChange = (event, newValue) => {
        setRangePrice(newValue);
    };

    const [filter, setFilter] = React.useState({
        brand_product: "all",
        socket_cpu: "all",
        core_cpu: "all",
        architecture_cpu: "all",
        thread_cpu: "all",
        chipset_mainboard: "all",
        size_mainboard: "all",
        socket_mainboard: "all",
        generation_ram: "all",
        capacity_ram: "all",
        speed_bus_ram: "all",
        chipset_gpu: "all",
        capacity_memory_gpu: "all",
        producer_chipset: "all",
        generation_gpu: "all",
        type_size_psu: "all",
        wattage: "all",
        type_harddisk: "all",
        capacity_harddisk: "all",
        type_connection_harddisk: "all",
        size_harddisk: "all",
        type_case: "all",
        color_case: "all",
        material_case: "all",
        material_side_case: "all",
        type_cooling_system: "all",
        size_cooling_system: "all"
    })
    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product/`)
            .then(res => {
                const Products = res.data;
                setProducts(Products);
                handleChosenProducts(Products);
            })
    }, [])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/cpu`)
            .then(res => {
                const Cpus = res.data;
                setCpus(Cpus);
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
        axios.get(`https://localhost:7253/api/gpu`)
            .then(res => {
                const Gpus = res.data;
                setGpu(Gpus);
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
        axios.get(`https://localhost:7253/api/CoolingSystem`)
            .then(res => {
                const CoolingSystems = res.data;
                setCoolingsystems(CoolingSystems);
            })
    }, [])

    const [chosenProducts, setChosenProducts] = React.useState([])

    const [resetPage, setResetPage] = React.useState(false)

    const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

    const params = Object.fromEntries([...searchParams]);

    const handleResetPage = function () {
        setResetPage(!resetPage);
    }

    React.useEffect(() => {
        handleChosenProducts(products)
    }, [searchParams, filter, rangePrice])

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

    const handleChosenProducts = function (Products) {
        var exportProduct = Products
        var filteredProducts

        exportProduct = exportProduct.filter(function (product) {
            return (product.unit_price_product > rangePrice[0] && product.unit_price_product < rangePrice[1])
        })

        if (params.type !== 'all' && params.type !== undefined) {
            exportProduct = exportProduct.filter(function (product) {
                return (product.type_product === params.type)
            })
            switch (params.type) {
                case 'cpu':
                    filteredProducts = cpus
                    if (filter.core_cpu !== 'all') {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.core_cpu === filter.core_cpu)
                        })
                    }
                    if (filter.thread_cpu !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.thread_cpu === filter.thread_cpu)
                        })
                    }
                    if (filter.socket_cpu !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.socket_cpu.toLowerCase().includes(filter.socket_cpu.toLowerCase()))
                        })
                    }
                    if (filter.architecture_cpu !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.architecture_cpu.toLowerCase().includes(filter.architecture_cpu.toLowerCase()))
                        })
                    }
                    break;
                case 'mainboard':
                    filteredProducts = mainboards
                    if (filter.chipset_mainboard !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.chipset_mainboard.toLowerCase().includes(filter.chipset_mainboard.toLowerCase()))
                        })
                    }
                    if (filter.size_mainboard !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.size_mainboard.toLowerCase().includes(filter.size_mainboard.toLowerCase()))
                        })
                    }
                    if (filter.socket_mainboard !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.socket_mainboard.toLowerCase().includes(filter.socket_mainboard.toLowerCase()))
                        })
                    }
                    break;
                case 'ram':
                    filteredProducts = rams
                    if (filter.generation_ram !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.generation_ram.toLowerCase().includes(filter.generation_ram.toLowerCase()))
                        })
                    }
                    if (filter.capacity_ram !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.capacity_ram === filter.capacity_ram)
                        })
                    }
                    if (filter.speed_bus_ram !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.speed_bus === filter.speed_bus_ram)
                        })
                    }
                    break;
                case 'gpu':
                    filteredProducts = gpus
                    if (filter.chipset_gpu !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.chipset_gpu.toLowerCase().includes(filter.chipset_gpu.toLowerCase()))
                        })
                    }
                    if (filter.capacity_memory_gpu !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.capacity_memory_gpu.toLowerCase().includes(filter.capacity_memory_gpu.toLowerCase()))
                        })
                    }
                    if (filter.generation_gpu !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.generation_gpu.toLowerCase().includes(filter.generation_gpu.toLowerCase()))
                        })
                    }
                    if (filter.producer_chipset !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.producer_chipset.toLowerCase().includes(filter.producer_chipset.toLowerCase()))
                        })
                    }
                    break;
                case 'psu':
                    filteredProducts = psus
                    if (filter.type_size_psu !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.type_size_psu.toLowerCase().includes(filter.type_size_psu.toLowerCase()))
                        })
                    }
                    if (filter.wattage !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.wattage === filter.wattage)
                        })
                    }
                    break;
                case 'casepc':
                    filteredProducts = casepcs
                    if (filter.type_case !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.type_case.toLowerCase().includes(filter.type_case.toLowerCase()))
                        })
                    }
                    if (filter.color_case !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.color_case.toLowerCase().includes(filter.color_case.toLowerCase()))
                        })
                    }
                    if (filter.material_side_case !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.material_side_case.toLowerCase().includes(filter.material_side_case.toLowerCase()))
                        })
                    }
                    if (filter.material_case !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.material_case.toLowerCase().includes(filter.material_case.toLowerCase()))
                        })
                    }
                    break;
                case 'harddisk':
                    filteredProducts = harddisks
                    if (filter.type_harddisk !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.type_harddisk.toLowerCase().includes(filter.type_harddisk.toLowerCase()))
                        })
                    }
                    if (filter.capacity_harddisk !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.capacity_harddisk.toLowerCase().includes(filter.capacity_harddisk.toLowerCase()))
                        })
                    }
                    if (filter.size_harddisk !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.size_harddisk.toLowerCase().includes(filter.size_harddisk.toLowerCase()))
                        })
                    }
                    if (filter.type_connection_harddisk !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.type_connection_harddisk.toLowerCase().includes(filter.type_connection_harddisk.toLowerCase()))
                        })
                    }
                    break;
                case 'cooling_system':
                    filteredProducts = coolingsystems
                    if (filter.size_cooling_system !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.size_cooling_system.toLowerCase().includes(filter.size_cooling_system.toLowerCase()))
                        })
                    }
                    if (filter.type_cooling_system !== "all") {
                        filteredProducts = filteredProducts.filter(function (product) {
                            return (product.type_cooling_system.toLowerCase().includes(filter.type_cooling_system.toLowerCase()))
                        })
                    }
                    break;
                default:
                    break;
            }
            if (filteredProducts !== undefined && products.length !== 0) {
                exportProduct = exportProduct.filter(function (product) {
                    return (handleGetIDProduct(filteredProducts).includes(product.id_product))
                })
            }
        }

        if (params.brand !== 'all' && params.brand !== undefined) {
            exportProduct = exportProduct.filter(function (product) {
                return (product.brand_product === params.brand)
            })
        }

        if (params.name !== undefined) {
            exportProduct = exportProduct.filter(function (product) {
                return (product.name_product.toLowerCase().includes(params.name.toLowerCase()))
            })
        }
        if (params.sort === 'byprice') {
            exportProduct.sort(function (a, b) {
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

        if (params.sort === 'bydiscount') {
            exportProduct.sort(function (a, b) {
                return b.discount_product - a.discount_product
            })
        }

        handleResetPage()
        setChosenProducts(exportProduct)
    }

    const handleChangePage = (event, newPage) => {
        setSearchParams({ ...params, page: newPage });
    };

    function showTypeProduct(type) {
        switch (type) {
            case 'cpu':
                return (
                    "Vi xử lý"
                )
            case 'gpu':
                return (
                    "Card đồ họa"
                )
            case 'mainboard':
                return (
                    "Bo mạch chủ"
                )
            case 'ram':
                return (
                    "Ram"
                )
            case 'psu':
                return (
                    "Nguồn"
                )
            case 'casepc':
                return (
                    "Case máy tính"
                )
            case 'harddisk':
                return (
                    "Ổ cứng"
                )
            case 'cooling_system':
                return (
                    "Tản nhiệt"
                )

            default:
                break;
        }
    }

    function showFilterByType(Type) {
        switch (Type) {
            case 'cpu':
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Kiến trúc:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.architecture_cpu}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            architecture_cpu: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        cpus.map(item => item.architecture_cpu)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Socket:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.socket_cpu}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            socket_cpu: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        cpus.map(item => item.socket_cpu)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Số lõi:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.core_cpu}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            core_cpu: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        cpus.map(item => item.core_cpu)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item} lõi
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Số luồng:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.thread_cpu}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            thread_cpu: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        cpus.map(item => item.thread_cpu)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item} luồng
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )
            case 'mainboard':
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Chipset:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.chipset_mainboard}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            chipset_mainboard: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        mainboards.map(item => item.chipset_mainboard)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Socket Hỗ Trợ:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.socket_mainboard}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            socket_mainboard: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        mainboards.map(item => item.socket_mainboard)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Kích thước:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.size_mainboard}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            size_mainboard: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        mainboards.map(item => item.size_mainboard)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )
            case 'ram':
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Dung Lượng:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.capacity_ram}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            capacity_ram: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        rams.map(item => item.capacity_ram)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}GB
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Tốc độ:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.speed_bus_ram}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            speed_bus_ram: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        rams.map(item => item.speed_bus)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Thế hệ:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.generation_ram}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            generation_ram: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        rams.map(item => item.generation_ram)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )
            case 'gpu':
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Chipset:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.chipset_gpu}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            chipset_gpu: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        gpus.map(item => item.chipset_gpu)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>NSX Chipset:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.producer_chipset}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            producer_chipset: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        gpus.map(item => item.producer_chipset)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Thế hệ:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.generation_gpu}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            generation_gpu: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        gpus.map(item => item.generation_gpu)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Dung lượng:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.capacity_memory_gpu}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            capacity_memory_gpu: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        gpus.map(item => item.capacity_memory_gpu)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )
            case 'psu':
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Kích thước:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.type_size_psu}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            type_size_psu: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        psus.map(item => item.type_size_psu)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Công xuất:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.wattage}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            wattage: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        psus.map(item => item.wattage)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}W
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )
            case 'harddisk':
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Loại ổ cứng:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.type_harddisk}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            type_harddisk: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        harddisks.map(item => item.type_harddisk)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Dung lượng:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.capacity_harddisk}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            capacity_harddisk: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        harddisks.map(item => item.capacity_harddisk)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Loại kết nối:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.type_connection_harddisk}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            type_connection_harddisk: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        harddisks.map(item => item.type_connection_harddisk)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Kích thước:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.size_harddisk}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            size_harddisk: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        harddisks.map(item => item.size_harddisk)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )
            case 'casepc':
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Kích thước:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.type_case}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            type_case: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        casepcs.map(item => item.type_case)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Màu sắc:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.color_case}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            color_case: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        casepcs.map(item => item.color_case)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Vật liệu:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.material_case}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            material_case: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        casepcs.map(item => item.material_case)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Nắp hông:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.material_side_case}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            material_side_case: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        casepcs.map(item => item.material_side_case)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )
            case 'cooling_system':
                return (
                    <>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Loại tản nhiệt:</Typography>
                            <FormControl sx={{ minWidth: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.type_cooling_system}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            type_cooling_system: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        coolingsystems.map(item => item.type_cooling_system)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 10
                            }}
                        >
                            <Typography>Kích thước:</Typography>
                            <FormControl sx={{ width: '60%' }}>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="select-ward"
                                    size='small'
                                    value={filter.size_cooling_system}
                                    onChange={(e) =>
                                        setFilter(existingValues => ({
                                            ...existingValues,
                                            size_cooling_system: e.target.value
                                        }))}
                                >
                                    <MenuItem value={"all"} key={0}>
                                        Tất cả
                                    </MenuItem>
                                    {[...new Set(
                                        coolingsystems.map(item => item.size_cooling_system)
                                    )]
                                        .map((item, index) => (
                                            <MenuItem value={item} key={index}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </>
                )
            default:
                break;
        }
    }

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
                                        <Box
                                            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            {Product.picture_product !== null ?
                                                <img
                                                    draggable={false}
                                                    style={{ width: "80%", height: "80%" }}
                                                    src={Product.picture_product} alt="product" />
                                                :
                                                <img
                                                    draggable={false}
                                                    style={{ width: "80%", height: "80%" }}
                                                    src={"data:image/png;base64, " + Product.picture_link_product} alt="product" />
                                            }
                                            {Product.discount_product !== 0 &&
                                                <Box
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: '0px',
                                                        left: '0px',
                                                    }}
                                                >
                                                    <Box
                                                        style={{
                                                            display: 'flex',
                                                            width: '100px',
                                                            height: '45px',
                                                            borderRadius: 5,
                                                            backgroundColor: 'red',
                                                            flexDirection: 'column',
                                                            paddingLeft: 10
                                                        }}
                                                    >
                                                        <Typography variant='body2' style={{ color: 'yellow' }}><b>Tiết kiệm</b></Typography>
                                                        <Typography variant='body1' style={{ color: 'white' }}>
                                                            <b>
                                                                {(Product.unit_price_product * (Product.discount_product * 0.01)).toLocaleString('vi-VI',
                                                                    {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    })}
                                                            </b>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            }
                                        </Box>
                                        <Box
                                            key={Product.id_product}
                                            style={{
                                                display: 'flex',
                                                width: '95%',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                paddingTop: 10,
                                                paddingLeft: 20,
                                                paddingRight: 20
                                            }}
                                        >
                                            <Typography variant='body2' style={{ color: 'black' }}>{Product.name_product}</Typography>
                                            <Typography variant="h6" style={{ color: orange[900] }}>{
                                                (Product.unit_price_product * (1 - Product.discount_product * 0.01)).toLocaleString('vi-VI',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                            </Typography>
                                            {Product.discount_product !== 0 &&
                                                <Typography variant='body2' style={{ color: 'black' }}>
                                                    <del>
                                                        {Product.unit_price_product.toLocaleString('vi-VI',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })}
                                                    </del>
                                                    &nbsp;
                                                    -{Product.discount_product}%
                                                </Typography>
                                            }
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                        )
                    })
            );
        } else {
            return (
                'Không tìm thấy kết quả tương ứng'
            )
        }
    }

    return (
        <Box>
            <Container maxWidth="xl" style={{ minHeight: 600 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Container maxWidth="xl" style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: '10px', marginTop: 10, padding: 0 }}>
                            <Box
                                style={{
                                    display: 'flex',
                                    padding: 20,
                                    flexDirection: 'column',
                                }}>
                                <Stack direction="row" spacing={2} justifyContent="space-between" borderLeft={'5px solid black'} marginTop={2} marginBottom={2} paddingRight={3}>
                                    <Typography variant='h6' paddingLeft={2}>Bộ lọc</Typography>
                                </Stack>
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginBottom: 10
                                    }}>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: 10
                                        }}
                                    >
                                        <Typography>Loại Sản Phẩm:</Typography>
                                        <FormControl sx={{ minWidth: '60%' }}>
                                            {params.type !== undefined ?
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="select-ward"
                                                    size='small'
                                                    value={params.type}
                                                    onChange={(e) => setSearchParams({ ...params, type: e.target.value, brand: 'all' })}
                                                >
                                                    <MenuItem value={"all"} key={0}>
                                                        Tất Cả
                                                    </MenuItem>
                                                    {[...new Set(
                                                        products
                                                            .map(item => item.type_product)
                                                    )]
                                                        .map((type, index) => (
                                                            <MenuItem value={type} key={index}>
                                                                {showTypeProduct(type)}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                                :
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="select-ward"
                                                    size='small'
                                                    defaultValue={"all"}
                                                    onChange={(e) => setSearchParams({ ...params, type: e.target.value, brand: 'all' })}
                                                >
                                                    <MenuItem value={"all"} key={0}>
                                                        Tất Cả
                                                    </MenuItem>
                                                    {[...new Set(
                                                        products
                                                            .map(item => item.type_product)
                                                    )]
                                                        .map((type, index) => (
                                                            <MenuItem value={type} key={index}>
                                                                {showTypeProduct(type)}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            }

                                        </FormControl>
                                    </Box>
                                    {params.type !== undefined && params.type !== 'all' ?
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography>Thương hiệu:</Typography>
                                            <FormControl sx={{ minWidth: '60%' }}>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="select-ward"
                                                    size='small'
                                                    defaultValue={"all"}
                                                    onChange={(e) => setSearchParams({ ...params, brand: e.target.value })}
                                                >
                                                    <MenuItem value={"all"} key={0}>
                                                        Tất Cả
                                                    </MenuItem>
                                                    {[...new Set(
                                                        products.filter(function (product) {
                                                            return (product.type_product === params.type)
                                                        })
                                                            .map(item => item.brand_product)
                                                    )]
                                                        .map((brand, index) => (
                                                            <MenuItem value={brand} key={index}>
                                                                {brand}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        :
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',

                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography>Thương hiệu:</Typography>
                                            <FormControl sx={{ minWidth: '60%' }}>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="select-ward"
                                                    size='small'
                                                    defaultValue={"all"}
                                                    onChange={(e) => setSearchParams({ ...params, brand: e.target.value })}
                                                >
                                                    <MenuItem value={"all"} key={0}>
                                                        Tất Cả
                                                    </MenuItem>
                                                    {[...new Set(
                                                        products
                                                            .map(item => item.brand_product)
                                                    )]
                                                        .map((brand, index) => (
                                                            <MenuItem value={brand} key={index}>
                                                                {brand}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    }
                                </Box>
                                {params.type !== undefined && params.type !== 'all' &&
                                    <Box
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingBottom: 10
                                        }}
                                    >
                                        {showFilterByType(params.type)}
                                    </Box>
                                }
                            </Box>
                        </Container>
                    </Grid>
                    <Grid item xs={9}>
                        <Container maxWidth="xl" style={{ 
                            backgroundColor: 'rgb(248, 248, 252)', 
                            borderRadius: '10px', 
                            marginTop: 10 ,              
                            }}>
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
                                {params.sort === "byprice" && params.order === "asc" ?
                                    <ColorButtonContained
                                        variant="contained"
                                        onClick={() => { searchParams.delete('order'); searchParams.delete('sort'); setSearchParams(searchParams); }}
                                        style={{ marginLeft: 10 }}>
                                        Giá giảm dần
                                    </ColorButtonContained>
                                    :
                                    <ColorButtonOutline
                                        variant="outlined"
                                        onClick={() => { setSearchParams({ ...params, order: 'asc', sort: 'byprice' }); }}
                                        style={{ marginLeft: 10 }}>
                                        Giá giảm dần
                                    </ColorButtonOutline>
                                }
                                {params.sort === "byprice" && params.order === "desc" ?
                                    <ColorButtonContained
                                        variant="contained"
                                        onClick={() => { searchParams.delete('order'); searchParams.delete('sort'); setSearchParams(searchParams); }}
                                        style={{ marginLeft: 10 }}>
                                        Giá Tăng dần
                                    </ColorButtonContained>
                                    :
                                    <ColorButtonOutline
                                        variant="outlined"
                                        onClick={() => { setSearchParams({ ...params, order: 'desc', sort: 'byprice' }); }}
                                        style={{ marginLeft: 10 }}>
                                        Giá Tăng dần
                                    </ColorButtonOutline>
                                }
                                {params.sort === "bydiscount" ?
                                    <ColorButtonContained
                                        variant="contained"
                                        onClick={() => { searchParams.delete('sort'); setSearchParams(searchParams); }}
                                        style={{ marginLeft: 10 }}>
                                        Khuyến mãi tốt nhất
                                    </ColorButtonContained>
                                    :
                                    <ColorButtonOutline
                                        variant="outlined"
                                        onClick={() => { setSearchParams({ ...params, sort: 'bydiscount' }); }}
                                        style={{ marginLeft: 10 }}>
                                        Khuyến mãi tốt nhất
                                    </ColorButtonOutline>
                                }
                                <Box
                                    style={{
                                        display: 'flex',
                                        width: 450,
                                        paddingLeft: 20
                                    }}
                                >
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={4}>
                                            <TextField
                                                style={{
                                                    backgroundColor: 'white',
                                                    borderRadius: 10
                                                }}
                                                value={rangePrice[0].toLocaleString('vi-VI',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                size="small"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <ColorSlider
                                                value={rangePrice}
                                                onChange={handleChange}
                                                aria-labelledby="input-slider"
                                                min={0}
                                                max={100000000}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                style={{
                                                    backgroundColor: 'white',
                                                    borderRadius: 10
                                                }}
                                                value={rangePrice[1].toLocaleString('vi-VI',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                size="small"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
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
                    </Grid>
                </Grid>
            </Container>
        </Box >
    )

}

export default ProductSearch