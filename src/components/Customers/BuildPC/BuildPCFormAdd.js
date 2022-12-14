import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
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

const ColorButtonOutline = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[600]),
    fontWeight: 900,
    backgroundColor: 'white',
    border: '1px solid ' + orange[500],
    '&:hover': {
        border: '1px solid ' + orange[700],
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    padding: 0
};

function BuildPCFormAdd({ Type, handleSetChosenProduct, Products, chosenProducts }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [page, setPage] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState("")

    const [sortOption, setSortOption] = React.useState("")

    const [filter, setFilter] = React.useState({
        brand_product: "all",
        socket_cpu: "all",
        core_cpu: "all",
        chipset_mainboard: "all",
        size_mainboard: "all",
        generation_ram: "all",
        capacity_ram: "all",
        chipset_gpu: "all",
        capacity_memory_gpu: "all",
        type_size_psu: "all",
        wattage: "all",
        type_harddisk: "all",
        capacity_harddisk: "all",
        type_case: "all",
        color_case: "all"
    })

    const [cpus, setCpus] = React.useState([])
    const [mainboards, setMainboards] = React.useState([])
    const [rams, setRams] = React.useState([])
    const [gpus, setGpu] = React.useState([])
    const [psus, setPsus] = React.useState([])
    const [harddisks, setHarddisks] = React.useState([])
    const [casepcs, setCasePcs] = React.useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    function handleClick(id) {
        handleSetChosenProduct(id, Type)
        handleClose()
    }

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
    }, [])

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

    function handleShowInfoProduct(Product) {
        switch (Product.type_product) {
            case 'cpu':
                return (
                    <>
                        <Typography variant='h6'>{Product.name_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Socket: {cpus.find(element => element.id_product === Product.id_product).socket_cpu}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th????ng hi???u: {Product.brand_product}</Typography>
                        <Box
                            style={{ display: 'flex' }}
                        >
                            <Typography variant='body2' style={{ color: "#303030" }}>S??? l??i:{cpus.find(element => element.id_product === Product.id_product).core_cpu}</Typography>
                            &nbsp;
                            <Typography variant='body2' style={{ color: "#303030" }}>S??? lu???ng:{cpus.find(element => element.id_product === Product.id_product).thread_cpu}</Typography>
                        </Box>
                    </>
                )
            case 'mainboard':
                return (
                    <>
                        <Typography variant='h6'>{Product.name_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Socket: {mainboards.find(element => element.id_product === Product.id_product).socket_mainboard}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th????ng hi???u: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>K??ch th?????c: {mainboards.find(element => element.id_product === Product.id_product).size_mainboard}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Lo???i ram h??? tr???: {mainboards.find(element => element.id_product === Product.id_product).type_ram_support}</Typography>
                    </>
                )
            case 'ram':
                return (
                    <>
                        <Typography variant='h6'>{Product.name_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th??? h???: {rams.find(element => element.id_product === Product.id_product).generation_ram}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th????ng hi???u: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>B??? nh???: {rams.find(element => element.id_product === Product.id_product).capacity_ram} GB</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>T???c ?????: {rams.find(element => element.id_product === Product.id_product).speed_bus} Mhz</Typography>
                    </>
                )
            case 'gpu':
                return (
                    <>
                        <Typography variant='h6'>{Product.name_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th??? h???: {gpus.find(element => element.id_product === Product.id_product).generation_gpu}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th????ng hi???u: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Nh?? s???n xu???t Chipset: {gpus.find(element => element.id_product === Product.id_product).producer_chipset}</Typography>
                        <Box
                            style={{ display: 'flex' }}
                        >
                            <Typography variant='body2' style={{ color: "#303030" }}>Chipset : {gpus.find(element => element.id_product === Product.id_product).chipset_gpu}</Typography>
                            &nbsp;
                            <Typography variant='body2' style={{ color: "#303030" }}>B??? nh???: {gpus.find(element => element.id_product === Product.id_product).capacity_memory_gpu}</Typography>
                        </Box>
                    </>
                )
            case 'psu':
                return (
                    <>
                        <Typography variant='h6'>{Product.name_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>K??ch th?????c: {psus.find(element => element.id_product === Product.id_product).type_size_psu}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th????ng hi???u: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>C??ng xu???t: {psus.find(element => element.id_product === Product.id_product).wattage} W</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Chu???n hi???u su???t : {psus.find(element => element.id_product === Product.id_product).energy_efficiency}</Typography>
                    </>
                )
            case 'harddisk':
                return (
                    <>
                        <Typography variant='h6'>{Product.name_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Lo???i ??? c???ng: {harddisks.find(element => element.id_product === Product.id_product).type_harddisk}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th????ng hi???u: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Dung l?????ng: {harddisks.find(element => element.id_product === Product.id_product).capacity_harddisk} W</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>K??ch th?????c : {harddisks.find(element => element.id_product === Product.id_product).size_harddisk}</Typography>
                    </>
                )
            case 'casepc':
                return (
                    <>
                        <Typography variant='h6'>{Product.name_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>K??ch th?????c: {casepcs.find(element => element.id_product === Product.id_product).type_case}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Th????ng hi???u: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Ch???t li???u {casepcs.find(element => element.id_product === Product.id_product).material_case}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>H??? tr??? bo m???ch ch??? : {casepcs.find(element => element.id_product === Product.id_product).mainboard_support}</Typography>
                    </>
                )
            default:
                break;
        }
    }
    function sortProductsByType(Products, type) {
        var exportProduct = Products
        var filteredProducts

        switch (type) {
            case 'cpu':
                filteredProducts = cpus
                if (filter.core_cpu !== "all") {
                    filteredProducts = filteredProducts.filter(function (product) {
                        return (product.core_cpu === filter.core_cpu)
                    })
                }
                if (filter.socket_cpu !== "all") {
                    filteredProducts = filteredProducts.filter(function (product) {
                        return (product.socket_cpu.toLowerCase().includes(filter.socket_cpu.toLowerCase()))
                    })
                }
                break;
            case 'mainboard':
                filteredProducts = mainboards
                if (filter.size_mainboard !== "all") {
                    filteredProducts = filteredProducts.filter(function (product) {
                        return (product.size_mainboard.toLowerCase().includes(filter.size_mainboard.toLowerCase()))
                    })
                }
                if (filter.chipset_mainboard !== "all") {
                    filteredProducts = filteredProducts.filter(function (product) {
                        return (product.chipset_mainboard.toLowerCase().includes(filter.chipset_mainboard.toLowerCase()))
                    })
                }
                // if (chosenProducts.cpu.id_product !== 0) {
                //     filteredProducts = mainboards.filter(function (product) {
                //         return (product.socket_mainboard === cpus.find(element => element.id_product === chosenProducts.cpu.id_product).socket_cpu)
                //     })
                // }
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
            case 'harddisk1':
            case 'harddisk2':
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
                break;
            default:
                break;
        }

        if (filteredProducts !== undefined) {
            exportProduct = Products.filter(function (product) {
                return (handleGetIDProduct(filteredProducts).includes(product.id_product))
            })
        }

        if (filter.brand_product !== "all") {
            exportProduct = exportProduct.filter(function (product) {
                return (product.brand_product.toLowerCase().includes(filter.brand_product.toLowerCase()))
            })
        }

        if (sortOption !== "") {
            exportProduct.sort(function (a, b) {
                switch (sortOption) {
                    case 'price-desc':
                        return a.unit_price_product - b.unit_price_product
                    case 'price-asc':
                        return b.unit_price_product - a.unit_price_product
                    case 'discount':
                        return b.discount_product - a.discount_product
                    default:
                        break;
                }
            })
        }
        if (searchInput !== "") {
            exportProduct = exportProduct.filter(function (product) {
                return (product.name_product.toLowerCase().includes(searchInput.toLowerCase()))
            })
        }
        return (exportProduct)
    }
    function showFilter(Type) {
        switch (Type) {
            case 'cpu':
                return (
                    <>
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Th????ng hi???u</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Th????ng hi???u"
                                value={filter.brand_product}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        brand_product: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t C???
                                </MenuItem>
                                {[...new Set(
                                    Products.filter(function (product) {
                                        return (product.type_product === 'cpu')
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Socket</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Socket"
                                value={filter.socket_cpu}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        socket_cpu: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">S??? nh??n th???c</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="S??? nh??n th???c"
                                value={filter.core_cpu}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        core_cpu: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
                                </MenuItem>
                                {[...new Set(
                                    cpus.map(item => item.core_cpu)
                                )]
                                    .map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </>
                )
            case 'mainboard':
                return (
                    <>
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Th????ng hi???u</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Th????ng hi???u"
                                defaultValue={"all"}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        brand_product: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t C???
                                </MenuItem>
                                {[...new Set(
                                    Products.filter(function (product) {
                                        return (product.type_product === 'mainboard')
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Chipset</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Chipset"
                                value={filter.chipset_mainboard}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        chipset_mainboard: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">K??ch th?????c</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="K??ch th?????c"
                                value={filter.size_mainboard}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        size_mainboard: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                    </>
                )
            case 'ram':
                return (
                    <>
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Th????ng hi???u</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Th????ng hi???u"
                                defaultValue={"all"}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        brand_product: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t C???
                                </MenuItem>
                                {[...new Set(
                                    Products.filter(function (product) {
                                        return (product.type_product === 'ram')
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Th??? h???</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Th??? h???"
                                value={filter.generation_ram}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        generation_ram: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Dung l?????ng</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Dung l?????ng"
                                value={filter.capacity_ram}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        capacity_ram: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
                                </MenuItem>
                                {[...new Set(
                                    rams.map(item => item.capacity_ram)
                                )]
                                    .map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item} GB
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </>
                )
            case 'gpu':
                return (
                    <>
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Th????ng hi???u</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Th????ng hi???u"
                                defaultValue={"all"}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        brand_product: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t C???
                                </MenuItem>
                                {[...new Set(
                                    Products.filter(function (product) {
                                        return (product.type_product === 'gpu')
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Chipset</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Chipset"
                                value={filter.chipset_gpu}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        chipset_gpu: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Dung l?????ng</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Dung l?????ng"
                                value={filter.capacity_ram}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        capacity_memory_gpu: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                    </>
                )
            case 'psu':
                return (
                    <>
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Th????ng hi???u</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Th????ng hi???u"
                                defaultValue={"all"}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        brand_product: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t C???
                                </MenuItem>
                                {[...new Set(
                                    Products.filter(function (product) {
                                        return (product.type_product === 'psu')
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">K??ch th?????c</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="K??ch th?????c"
                                value={filter.type_size_psu}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        type_size_psu: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">C??ng su???t</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="C??ng su???t"
                                value={filter.wattage}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        wattage: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                    </>)
            case 'harddisk1':
            case 'harddisk2':
                return (
                    <>
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Th????ng hi???u</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Th????ng hi???u"
                                defaultValue={"all"}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        brand_product: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t C???
                                </MenuItem>
                                {[...new Set(
                                    Products.filter(function (product) {
                                        return (product.type_product === 'harddisk')
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Lo???i ??? c???ng</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Lo???i ??? c???ng"
                                value={filter.type_harddisk}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        type_harddisk: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Dung l?????ng</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Dung l?????ng"
                                value={filter.capacity_harddisk}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        capacity_harddisk: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                    </>)
            case 'casepc':
                return (
                    <>
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">Th????ng hi???u</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="Th????ng hi???u"
                                defaultValue={"all"}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        brand_product: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t C???
                                </MenuItem>
                                {[...new Set(
                                    Products.filter(function (product) {
                                        return (product.type_product === 'casepc')
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">K??ch th?????c</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="K??ch th?????c"
                                value={filter.type_case}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        type_case: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                        <FormControl sx={{ minWidth: '30%' }}>
                            <InputLabel htmlFor="outlined-adornment-search">M??u S???c</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                size='small'
                                label="M??u S???c"
                                value={filter.color_case}
                                onChange={(e) =>
                                    setFilter(existingValues => ({
                                        ...existingValues,
                                        color_case: e.target.value
                                    }))}
                            >
                                <MenuItem value={"all"} key={0}>
                                    T???t c???
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
                    </>
                )
            default:
                break;
        }
    }

    return (
        <div>
            <ColorButtonContained onClick={handleOpen} variant="contained" color="primary">
                Ch???n
            </ColorButtonContained>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={2} justifyContent="space-between" borderLeft={'5px solid black'} marginTop={2} marginBottom={2} paddingRight={3}>
                        <Typography variant='h6' paddingLeft={2}>B??? l???c</Typography>
                        <IconButton variant="contained" onClick={handleClose} ><CloseIcon /></IconButton>
                    </Stack>
                    <Box
                        style={{
                            display: 'flex',
                            height: '100px',
                            borderBottom: '1px solid lightgrey',
                            marginBottom: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            flexDirection: 'column'
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '40px',
                                justifyContent: 'space-between',
                                paddingBottom: 10
                            }}
                        >
                            {showFilter(Type)}
                        </Box>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '40px',
                                width: '100%',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                }}
                            >
                                <Typography>S???p x???p Theo: </Typography>
                                {sortOption === "price-asc" ?
                                    <ColorButtonContained
                                        variant="contained"
                                        onClick={() => { setSortOption("") }}
                                        style={{ marginLeft: 10 }}>
                                        Gi?? gi???m d???n
                                    </ColorButtonContained>
                                    :
                                    <ColorButtonOutline
                                        variant="outlined"
                                        onClick={() => { setSortOption("price-asc") }}
                                        style={{ marginLeft: 10 }}>
                                        Gi?? gi???m d???n
                                    </ColorButtonOutline>
                                }
                                {sortOption === "price-desc" ?
                                    <ColorButtonContained
                                        variant="contained"
                                        onClick={() => { setSortOption("") }}
                                        style={{ marginLeft: 10 }}>
                                        Gi?? T??ng d???n
                                    </ColorButtonContained>
                                    :
                                    <ColorButtonOutline
                                        variant="outlined"
                                        onClick={() => { setSortOption("price-desc") }}
                                        style={{ marginLeft: 10 }}>
                                        Gi?? T??ng d???n
                                    </ColorButtonOutline>
                                }
                                {sortOption === "discount" ?
                                    <ColorButtonContained
                                        variant="contained"
                                        onClick={() => { setSortOption("") }}
                                        style={{ marginLeft: 10 }}>
                                        Khuy???n m??i
                                    </ColorButtonContained>
                                    :
                                    <ColorButtonOutline
                                        variant="outlined"
                                        onClick={() => { setSortOption("discount") }}
                                        style={{ marginLeft: 10 }}>
                                        Khuy???n m??i
                                    </ColorButtonOutline>
                                }
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    width: '30%'
                                }}
                            >
                                <TextField
                                    fullWidth
                                    size='small'
                                    id="filled-search"
                                    label="T??m ki???m"
                                    defaultValue={searchInput}
                                    type="search"
                                    variant="outlined"
                                    onChange={e => {
                                        setSearchInput(e.target.value);
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        style={{
                            display: 'flex',
                            height: '500px',
                            flexDirection: 'column',
                            flexGrow: 1,
                            overflowY: "auto",
                            flexWrap: 'nowrap',
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                    >
                        {sortProductsByType(Products, Type)
                            .slice((parseInt(page) - 1) * 10, parseInt(page) * 10)
                            .map(function (Product) {
                                return (
                                    <Box
                                        key={Product.id_product}
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            borderBottom: '1px solid lightgrey',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 10
                                        }}
                                    >
                                        <Box
                                            style={{
                                                display: 'flex',
                                                width: '75%',
                                                alignItems: 'center',
                                                marginBottom: 10,
                                            }}
                                        >
                                            <Box style={{
                                                border: '2px solid lightgrey',
                                                borderRadius: '10px',
                                                padding: 2,
                                                marginRight: 20
                                            }}>
                                                {Product.picture_product !== null ?
                                                    <img src={Product.picture_product} alt="product images" width={'80px'} />
                                                    :
                                                    <img src={"data:image/png;base64, " + Product.picture_link_product} alt="product images" width={'80px'} height={'80px'} />
                                                }
                                            </Box>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                {handleShowInfoProduct(Product)}
                                            </Box>
                                        </Box>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: 10,
                                                justifyContent: ' space-between',
                                                paddingRight: 10
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    width: '25%',
                                                }}
                                            >
                                                <Typography >
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
                                            <ColorButtonContained variant='contained' onClick={() => { handleClick(Product.id_product) }}>
                                                Ch???n
                                            </ColorButtonContained>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        borderTop: '1px solid lightgrey'
                    }}>
                        <Pagination
                            color="primary"
                            count={Math.ceil(sortProductsByType(Products, Type).length / 10)}
                            page={parseInt(page)}
                            onChange={handleChangePage}
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}

export default BuildPCFormAdd