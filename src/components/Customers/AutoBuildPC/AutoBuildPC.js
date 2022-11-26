import React from "react";
import axios from "axios";
import { TextField } from "@material-ui/core"
import Container from '@mui/material/Container';
import { Box, Button, Grid, makeStyles, Typography, IconButton } from "@mui/material"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import AnalyzeBuildPc from "../BuildPC/AnalyzeBuildPc";
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { useStore } from "../../Store";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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


function AutoBuildPC({ resetPage, handleResetPage }) {
    const [state,] = useStore();
    const [, dispatch] = React.useContext(SnackBarContext);

    const [typePC, setTypePC] = React.useState(1);

    //get form api
    const [products, setProducts] = React.useState([])
    const [coupleProducts, setCoupleProduct] = React.useState([])
    const [cpus, setCpus] = React.useState([])
    const [mainboards, setMainboards] = React.useState([])
    const [rams, setRams] = React.useState([])
    const [gpus, setGpu] = React.useState([])
    const [psus, setPsus] = React.useState([])
    const [harddisks, setHarddisks] = React.useState([])
    const [casepcs, setCasepcs] = React.useState([])

    const checkGPURef = React.useRef(null);

    //Đồ vật
    /*
    {
        id, ten, gia, pa, giatri
    }
    */
    const [listChosenProduct, setListChosenProduct] = React.useState([]);

    const [selectedProducts, setSelectedProducts] = React.useState([]);

    const [sLLK, setSLLK] = React.useState(7);

    const [validW, setValidW] = React.useState(false);

    const [totalPrice, setTotalPrice] = React.useState(0)

    const [checkGPU, setCheckGPU] = React.useState(true);

    const [typeProducts, setTypeProducts] = React.useState([
        //CPU, GPU , Main, Ram, PSU, ssd, hdd , casepc
        {
            type: 'cpu',
            quantity: 0,
            priority: 5,
            isChosen: false,
        },
        {
            type: 'gpu',
            quantity: 0,
            priority: 5,
            isChosen: false,
        },
        {
            type: 'mainboard',
            quantity: 0,
            priority: 2,
            isChosen: false
        },
        {
            type: 'ram',
            quantity: 0,
            priority: 15,
            isChosen: false,
        },
        {
            type: 'psu',
            quantity: 0,
            priority: 10,
            isChosen: false,
        },
        {
            type: 'harddisk',
            quantity: 0,
            priority: 5,
            isChosen: false,
        },
        {
            type: 'casepc',
            quantity: 0,
            priority: 5,
            isChosen: false,
        },
    ])

    const [W, setW] = React.useState(0)

    const handleChangeTypePC = (event) => {
        switch (event.target.value) {
            case 1:
                setCheckGPU(true)
                setSLLK(7)
                setTypeProducts(
                    [
                        {
                            type: 'cpu',
                            quantity: 0,
                            priority: 5,
                            isChosen: false,
                        },
                        {
                            type: 'gpu',
                            quantity: 0,
                            priority: 5,
                            isChosen: false,
                        },
                        {
                            type: 'mainboard',
                            quantity: 0,
                            priority: 2,
                            isChosen: false
                        },
                        {
                            type: 'ram',
                            quantity: 0,
                            priority: 15,
                            isChosen: false,
                        },
                        {
                            type: 'psu',
                            quantity: 0,
                            priority: 5,
                            isChosen: false,
                        },
                        {
                            type: 'harddisk',
                            quantity: 0,
                            priority: 2,
                            isChosen: false,
                        },
                        {
                            type: 'casepc',
                            quantity: 0,
                            priority: 2,
                            isChosen: false,
                        },
                    ]
                )
                break;
            case 2:
                setTypeProducts(
                    [
                        {
                            type: 'cpu',
                            quantity: 0,
                            priority: 1,
                            isChosen: false,
                        },
                        {
                            type: 'gpu',
                            quantity: 0,
                            priority: 2,
                            isChosen: false,
                        },
                        {
                            type: 'mainboard',
                            quantity: 0,
                            priority: 1,
                            isChosen: false
                        },
                        {
                            type: 'ram',
                            quantity: 0,
                            priority: 3,
                            isChosen: false,
                        },
                        {
                            type: 'psu',
                            quantity: 0,
                            priority: 2,
                            isChosen: false,
                        },
                        {
                            type: 'harddisk',
                            quantity: 0,
                            priority: 3,
                            isChosen: false,
                        },
                        {
                            type: 'casepc',
                            quantity: 0,
                            priority: 3,
                            isChosen: false,
                        },
                    ]
                )
                break;
            default:
                break;
        }
        setTypePC(event.target.value);
    };

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/product`)
            .then(res => {
                const Products = res.data;
                setProducts(Products);
            })
        axios.get(`https://localhost:7253/api/Product/getCoupleProduct`)
            .then(res => {
                const Products = res.data;
                setCoupleProduct(Products);
            })
        axios.get(`https://localhost:7253/api/cpu`)
            .then(res => {
                const Cpus = res.data;
                setCpus(Cpus);
            })
        axios.get(`https://localhost:7253/api/Mainboard/getInfoMainboard`)
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
                setCasepcs(CasePCs);
            })
    }, [])

    React.useEffect(() => {
        if (selectedProducts.length !== 0)
            var result = selectedProducts.reduce((total, currentValue) =>
                total + (currentValue.unit_price_product * (1 - currentValue.discount_product * 0.01)), 0
            );
        setTotalPrice(result)
    }, [selectedProducts])

    React.useEffect(() => {
        var filteredProducts = products.filter(function (product) {
            switch (product.type_product) {
                case 'cpu':
                    switch (typePC) {
                        case 1:
                            return (product.unit_price_product < (W * 80 / 100) && product.unit_price_product > (W * 30 / 100))
                            break;
                        case 2:
                            if (checkGPU !== false) {
                                return (product.unit_price_product < (W * 40 / 100) && product.unit_price_product > (W * 10 / 100))
                            } else {
                                return (product.unit_price_product < (W * 80 / 100) && product.unit_price_product > (W * 30 / 100))
                            }
                            break;
                    }
                case 'gpu':
                    switch (typePC) {
                        case 1:
                            return (product.unit_price_product < (W * 80 / 100) && product.unit_price_product > (W * 30 / 100))
                            break;
                        case 2:
                            if (checkGPU === false && typePC === 2) {
                                return (false)
                            } else {
                                return (product.unit_price_product < (W * 40 / 100) && product.unit_price_product > (W * 10 / 100))
                            }

                            break;
                    }
                    break;
                case 'mainboard':
                    return (true)
                    break;
                //return (product.unit_price_product > (W * 5 / 100))
                //return (product.unit_price_product < (W * 20 / 100) && product.unit_price_product > (W * 10 / 100))
                default:
                    //return(true)
                    return (product.unit_price_product > (W * 2 / 100) && product.type_product !== "cooling_system") && product.unit_price_product < (W * 30 / 100)
                //return (product.type_product !== "cooling_system")
            }
        })
        var filterCpus = cpus.filter(function (product) {
            return (handleGetIDProduct(filteredProducts).includes(product.id_product))
        })
        var filterMainboards = mainboards.filter(function (product) {
            return (handleGetIDProduct(filteredProducts).includes(product.id_product))
        })
        var filterGpus = gpus.filter(function (product) {
            return (handleGetIDProduct(filteredProducts).includes(product.id_product))
        })
        var filterRams = rams.filter(function (product) {
            return (handleGetIDProduct(filteredProducts).includes(product.id_product))
        })
        var filterPsus = psus.filter(function (product) {
            return (handleGetIDProduct(filteredProducts).includes(product.id_product))
        })
        var filterHarddisks = harddisks.filter(function (product) {
            return (handleGetIDProduct(filteredProducts).includes(product.id_product))
        })
        var filterCasePCs = casepcs.filter(function (product) {
            return (handleGetIDProduct(filteredProducts).includes(product.id_product))
        })
        if (typePC === 2 && checkGPU === false) {
            if (
                filterCpus.length !== 0
                && filterMainboards.length !== 0
                && filterRams.length !== 0
                && filterPsus.length !== 0
                && filterHarddisks.length !== 0
                && filterCasePCs.length !== 0
            ) {
                setValidW(true)
            } else {
                setValidW(false)
            }
        } else {
            if (
                filterCpus.length !== 0
                && filterMainboards.length !== 0
                && filterGpus.length !== 0
                && filterRams.length !== 0
                && filterPsus.length !== 0
                && filterHarddisks.length !== 0
                && filterCasePCs.length !== 0
            ) {
                setValidW(true)
            } else {
                setValidW(false)
            }
        }
        handleListChosenProduct(filteredProducts)
        HandleQuantityProductByType(filterCpus.length, filterGpus.length, filterMainboards.length, filterRams.length, filterPsus.length, filterHarddisks.length, filterCasePCs.length)

    }, [W, typePC, checkGPU])

    function handleAnalyzeArrayChosenProduct(items) {
        let chosenCPUGPU = []
        let chosenMainboard = []
        var chosenProducts = []
        if (items.length !== 0) {
            let Cpu = items.find(element => element.type_product === 'cpu')
            let Gpu = items.find(element => element.type_product === 'gpu')
            let Mainboard = items.find(element => element.type_product === 'mainboard')

            if (Gpu !== undefined) {
                items
                    .map(function (product) {
                        if (product.type_product !== 'cpu' && product.type_product !== 'gpu' && product.type_product !== 'mainboard')
                            chosenProducts.push(product.id_product)
                    })
                chosenCPUGPU =
                    coupleProducts.filter(function (item) {
                        return (Math.abs(item.totalprice - (Cpu.unit_price_product + Gpu.unit_price_product)) < 1000000)
                    }).sort((a, b) => Math.abs(a.totalprice) < Math.abs(b.totalprice) ? 1 : -1)
                        .sort((a, b) => Math.abs(a.percentCompatible - 1) > Math.abs(b.percentCompatible - 1) ? 1 : -1)[0]

                chosenMainboard = mainboards.filter(function (item) {
                    return (
                        item.socket_mainboard
                        ===
                        cpus.find(function (item) {
                            return (item.id_product === chosenCPUGPU.cpu_id)
                        }).socket_cpu
                    )
                }).sort((a, b) => Math.abs(a.unit_price_product - Mainboard.unit_price_product) > Math.abs(b.unit_price_product - Mainboard.unit_price_product) ? 1 : -1)

                chosenProducts.push(chosenCPUGPU.cpu_id)
                chosenProducts.push(chosenCPUGPU.gpu_id)
                chosenProducts.push(chosenMainboard[0].id_product)
            } else {
                items
                    .map(function (product) {
                        if (product.type_product !== 'cpu' && product.type_product !== 'mainboard')
                            chosenProducts.push(product.id_product)
                    })

                chosenMainboard = mainboards.filter(function (item) {
                    return (
                        item.socket_mainboard
                        ===
                        cpus.find(function (item) {
                            return (item.id_product === Cpu.id_product)
                        }).socket_cpu
                    )
                }).sort((a, b) => Math.abs(a.unit_price_product - Mainboard.unit_price_product) > Math.abs(b.unit_price_product - Mainboard.unit_price_product) ? 1 : -1)

                chosenProducts.push(Cpu.id_product)
                chosenProducts.push(chosenMainboard[0].id_product)
            }
            return (
                chosenProducts
            )
        }
    }


    function handleAnalyzeSelectedProduct(items) {
        if (items.length !== 0) {
            let Cpu = items.find(element => element.type_product === 'cpu')
            let Gpu = items.find(element => element.type_product === 'gpu')
            let Mainboard = items.find(element => element.type_product === 'mainboard')
            let Psu = items.find(element => element.type_product === 'psu')
            let Ram = items.find(element => element.type_product === 'ram')
            let Harddisk = items.find(element => element.type_product === 'harddisk')
            let Casepc = items.find(element => element.type_product === 'casepc')
            if (Gpu !== undefined) {
                return (
                    {
                        cpu: {
                            id_product: Cpu.id_product,
                            quantity: 1,
                            unit_price_product: Cpu.unit_price_product
                        },
                        mainboard: {
                            id_product: Mainboard.id_product,
                            quantity: 1,
                            unit_price_product: Mainboard.unit_price_product
                        },
                        ram: {
                            id_product: Ram.id_product,
                            quantity: 1,
                            unit_price_product: Ram.unit_price_product
                        },
                        gpu: {
                            id_product: Gpu.id_product,
                            quantity: 1,
                            unit_price_product: Gpu.unit_price_product
                        },
                        psu: {
                            id_product: Psu.id_product,
                            quantity: 1,
                            unit_price_product: Psu.unit_price_product
                        },
                        harddisk1: {
                            id_product: Harddisk.id_product,
                            quantity: 1,
                            unit_price_product: Harddisk.unit_price_product
                        },
                        harddisk2: {
                            id_product: 0,
                            quantity: 0
                        },
                        casepc: {
                            id_product: Casepc.id_product,
                            quantity: 1,
                            unit_price_product: Casepc.unit_price_product
                        },
                    }
                )
            } else {
                return (
                    {
                        cpu: {
                            id_product: Cpu.id_product,
                            quantity: 1,
                            unit_price_product: Cpu.unit_price_product
                        },
                        mainboard: {
                            id_product: Mainboard.id_product,
                            quantity: 1,
                            unit_price_product: Mainboard.unit_price_product
                        },
                        ram: {
                            id_product: Ram.id_product,
                            quantity: 1,
                            unit_price_product: Ram.unit_price_product
                        },
                        psu: {
                            id_product: Psu.id_product,
                            quantity: 1,
                            unit_price_product: Psu.unit_price_product
                        },
                        harddisk1: {
                            id_product: Harddisk.id_product,
                            quantity: 1,
                            unit_price_product: Harddisk.unit_price_product
                        },
                        harddisk2: {
                            id_product: 0,
                            quantity: 0
                        },
                        casepc: {
                            id_product: Casepc.id_product,
                            quantity: 1,
                            unit_price_product: Casepc.unit_price_product
                        },
                    }
                )
            }

        }
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

    function HandleQuantityProductByType(cpu, gpu, mainboard, ram, psu, harddisk, casepc) {
        let newArr = [...typeProducts];
        newArr[0] = {
            ...newArr[0],
            'quantity': cpu
        };
        newArr[1] = {
            ...newArr[1],
            'quantity': gpu
        };
        newArr[2] = {
            ...newArr[2],
            'quantity': mainboard
        };
        newArr[3] = {
            ...newArr[3],
            'quantity': ram
        };
        newArr[4] = {
            ...newArr[4],
            'quantity': psu
        };
        newArr[5] = {
            ...newArr[5],
            'quantity': harddisk
        };
        newArr[6] = {
            ...newArr[6],
            'quantity': casepc
        };
        setTypeProducts(newArr)
    }

    function handleListChosenProduct(ChosenProducts) {
        var filteredProducts = ChosenProducts
        var chosenProduct = filteredProducts.map(function (product) {
            let priority = 0
            switch (product.type_product) {
                case 'cpu':
                    priority = typeProducts[0].priority
                    break;
                case 'gpu':
                    priority = typeProducts[1].priority
                    break;
                case 'mainboard':
                    priority = typeProducts[2].priority
                    break;
                case 'ram':
                    priority = typeProducts[3].priority
                    break;
                case 'psu':
                    priority = typeProducts[4].priority
                    break;
                case 'harddisk':
                    priority = typeProducts[5].priority
                    break;
                case 'casepc':
                    priority = typeProducts[6].priority
                    break;
                default:
                    break;
            }
            return ({
                id_product: product.id_product,
                unit_price_product: product.unit_price_product,
                type_product: product.type_product,
                PA: 0,
                gia_tri: (product.unit_price_product * priority)
            })
        })
        setListChosenProduct(
            chosenProduct.sort((a, b) =>
                a.gia_tri < b.gia_tri ? 1 : -1,
            ))
    }

    const handleCheckGPU = (event) => {
        if (event.target.checked === true) {
            setSLLK(7)
        } else {
            setSLLK(6)
        }
        setCheckGPU(event.target.checked)
    }

    function handleGetChosenProduct(Products) {
        var exportProducts = products
        var filteredProducts = Products.filter(function (product) {
            return (product.PA !== 0)
        })

        // if (filteredProducts !== undefined) {
        //     exportProducts = handleGetIDProduct(filteredProducts).map(function (id) {
        //         return (
        //             products.find(element => element.id_product === id)
        //         )
        //     })
        // }
        if (filteredProducts.length !== 0) {
            exportProducts = handleAnalyzeArrayChosenProduct(filteredProducts).map(function (id) {
                return (
                    products.find(element => element.id_product === id)
                )
            })
            if (typePC === 2 && checkGPU === false) {
                setSelectedProducts(
                    [
                        exportProducts.find(element => element.type_product === 'cpu'),
                        exportProducts.find(element => element.type_product === 'mainboard'),
                        exportProducts.find(element => element.type_product === 'ram'),
                        exportProducts.find(element => element.type_product === 'psu'),
                        exportProducts.find(element => element.type_product === 'harddisk'),
                        exportProducts.find(element => element.type_product === 'casepc'),
                    ]
                )
            } else {
                setSelectedProducts(
                    [
                        exportProducts.find(element => element.type_product === 'cpu'),
                        exportProducts.find(element => element.type_product === 'mainboard'),
                        exportProducts.find(element => element.type_product === 'gpu'),
                        exportProducts.find(element => element.type_product === 'ram'),
                        exportProducts.find(element => element.type_product === 'psu'),
                        exportProducts.find(element => element.type_product === 'harddisk'),
                        exportProducts.find(element => element.type_product === 'casepc'),
                    ]
                )
            }
        } else {
            alert("Số tiền nhập vào chưa phù hợp")
            setSelectedProducts(
                []
            )
        }

    }

    let product = listChosenProduct
    let aW = W
    let aCT = 0
    let aGLNTT = 0
    let aTGT = 0
    let aBool = [false, false, false, false, false, false, false]
    let achosen = []
    let aX = []
    //console.log(listChosenProduct)

    function capNhatDaLayTT() {
        for (let i = 0; i < aBool.length; i++) {
            achosen[i] = aBool[i]
        }
    }

    function capNhatGLNTT() {
        if (aGLNTT < aTGT) {
            aGLNTT = aTGT
            for (let i = 0; i < listChosenProduct.length; i++) {
                product[i].PA = aX[i]
            }
        }
    }

    function HandleClickBuild() {
        if (validW === true) {
            nhanhCan(0)
            handleGetChosenProduct(product)
        } else {
            alert("Số tiền nhập vào chưa phù hợp")
        }
    }

    function nhanhCan(i) {
        let yk = 0
        let y
        // let x
        // let scopeCPU = 0
        // let scopeGPU = 0
        switch (listChosenProduct[i].type_product) {
            // case 'cpu':
            //     for (x = 0; x < typeProducts.length; x++) {
            //         if (typeProducts[x].type === 'gpu') {
            //             if (aBool[x] === true) {
            //                 aX.filter(function (element, index) {
            //                     if (element === 1) {
            //                         if (gpus.filter(element => (element.id_product == index)).length !== 0)
            //                             scopeGPU = gpus.filter(element => (element.id_product == index))[0].scope_gpu
            //                     }
            //                 })
            //                 scopeCPU = cpus.find(element => (element.id_product == listChosenProduct[i].id_product)).scope_cpus
            //                 // xử lý chọn cpu tương ứng
            //             }
            //         }
            //     }
            //     for (y = 0; y < typeProducts.length; y++) {
            //         if (listChosenProduct[i].type_product === typeProducts[y].type) {
            //             if (aBool[y] === true) {
            //                 yk = 0
            //             } else {
            //                 if (aBool[1] === true) {
            //                     // console.log(scopeCPU + "-" + scopeGPU)
            //                     // console.log((Math.abs(scopeCPU - scopeGPU) / Math.max(scopeCPU, scopeGPU) * 100).toFixed(0))   
            //                     if ((Math.abs(scopeCPU - scopeGPU) / Math.max(scopeCPU, scopeGPU) * 100).toFixed(0) < 20) {
            //                         yk = Math.min(1, parseInt(aW / listChosenProduct[i].unit_price_product))
            //                         // console.log("chọn cpu:" + listChosenProduct[i].id_product)
            //                     }
            //                     else {
            //                         yk = 0
            //                     }
            //                 } else {
            //                     yk = Math.min(1, parseInt(aW / listChosenProduct[i].unit_price_product))
            //                 }
            //             }
            //             break;
            //         }
            //     }
            //     break;
            // case 'gpu':
            //     for (x = 0; x < typeProducts.length; x++) {
            //         if (typeProducts[x].type === 'cpu') {
            //             if (aBool[x] === true) {
            //                 scopeCPU = 0
            //                 scopeGPU = 0
            //                 aX.filter(function (element, index) {
            //                     if (element === 1) {
            //                         if (cpus.filter(element => (element.id_product == index)).length !== 0)
            //                             scopeCPU = cpus.filter(element => (element.id_product == index))[0].scope_cpu
            //                     }
            //                 })
            //                 scopeGPU = gpus.find(element => (element.id_product == listChosenProduct[i].id_product)).scope_gpu
            //                 // xử lý chọn cpu tương ứng
            //             }
            //         }
            //     }
            //     for (y = 0; y < typeProducts.length; y++) {
            //         if (listChosenProduct[i].type_product === typeProducts[y].type) {
            //             if (aBool[y] === true) {
            //                 yk = 0
            //             } else {
            //                 if (aBool[0] === true) {
            //                     // console.log(scopeCPU + "-" + scopeGPU)
            //                     // console.log((Math.abs(scopeCPU - scopeGPU) / Math.max(scopeCPU, scopeGPU) * 100).toFixed(0))   
            //                     if ((Math.abs(scopeCPU - scopeGPU) / Math.max(scopeCPU, scopeGPU) * 100).toFixed(0) < 20) {
            //                         yk = Math.min(1, parseInt(aW / listChosenProduct[i].unit_price_product))
            //                         // console.log("chọn gpu:" + listChosenProduct[i].id_product)
            //                     }
            //                     else {
            //                         yk = 0
            //                     }
            //                 } else {
            //                     yk = Math.min(1, parseInt(aW / listChosenProduct[i].unit_price_product))
            //                 }
            //             }
            //             break;
            //         }
            //     }
            //     break;
            default:
                for (y = 0; y < typeProducts.length; y++) {
                    if (listChosenProduct[i].type_product === typeProducts[y].type) {
                        if (aBool[y] === true) {
                            yk = 0
                        } else {
                            yk = Math.min(1, parseInt(aW / listChosenProduct[i].unit_price_product))
                        }
                        break;
                    }
                }
        }
        for (let j = yk; j >= 0; j--) {
            if (j === 1) {
                aBool[y] = true
            }
            aTGT = aTGT + (j * listChosenProduct[i].gia_tri)
            aW = aW - (j * listChosenProduct[i].unit_price_product)
            try {
                aCT = aTGT + (aW * typeProducts[y].priority)
            } catch (error) {
                aCT = aTGT
            }
            if ((aCT > aGLNTT)) {
                let count = 0
                aX[i] = j
                for (let k = 0; k < aBool.length; k++) {
                    if (aBool[k] === true) {
                        count++
                    }
                }
                if (i === listChosenProduct.length - 1 || aW === 0) {
                    if (count >= sLLK) {
                        capNhatGLNTT()
                        capNhatDaLayTT()
                    }
                } else {
                    nhanhCan(i + 1)
                }
            }
            if (j === 1) {
                aX[i] = 0
                aTGT = aTGT - (j * listChosenProduct[i].gia_tri)
                aW = aW + (j * listChosenProduct[i].unit_price_product)
                aBool[y] = false
            }
        }
    }

    function handleShowInfoProduct(Product) {
        switch (Product.type_product) {
            case 'cpu':
                return (
                    <>
                        <Link to={"/product/" + Product.id_product} target="_blank"><Typography variant='h6'>{Product.name_product}</Typography></Link>
                        <Typography variant='body2' style={{ color: "#303030" }}>Socket: {cpus.find(element => element.id_product === Product.id_product).socket_cpu}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thương hiệu: {Product.brand_product}</Typography>
                        <Box
                            style={{ display: 'flex' }}
                        >
                            <Typography variant='body2' style={{ color: "#303030" }}>Số lõi:{cpus.find(element => element.id_product === Product.id_product).core_cpu}</Typography>
                            &nbsp;
                            <Typography variant='body2' style={{ color: "#303030" }}>Số luồng:{cpus.find(element => element.id_product === Product.id_product).thread_cpu}</Typography>
                        </Box>
                    </>
                )
            case 'mainboard':
                return (
                    <>
                        <Link to={"/product/" + Product.id_product} target="_blank"><Typography variant='h6'>{Product.name_product}</Typography></Link>
                        <Typography variant='body2' style={{ color: "#303030" }}>Socket: {mainboards.find(element => element.id_product === Product.id_product).socket_mainboard}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thương hiệu: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Kích thước: {mainboards.find(element => element.id_product === Product.id_product).size_mainboard}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Loại ram hỗ trợ: {mainboards.find(element => element.id_product === Product.id_product).type_ram_support}</Typography>
                    </>
                )
            case 'ram':
                return (
                    <>
                        <Link to={"/product/" + Product.id_product} target="_blank"><Typography variant='h6'>{Product.name_product}</Typography></Link>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thế hệ: {rams.find(element => element.id_product === Product.id_product).generation_ram}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thương hiệu: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Bộ nhớ: {rams.find(element => element.id_product === Product.id_product).capacity_ram} GB</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Tốc độ: {rams.find(element => element.id_product === Product.id_product).speed_bus} Mhz</Typography>
                    </>
                )
            case 'gpu':
                return (
                    <>
                        <Link to={"/product/" + Product.id_product} target="_blank"><Typography variant='h6'>{Product.name_product}</Typography></Link>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thế hệ: {gpus.find(element => element.id_product === Product.id_product).generation_gpu}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thương hiệu: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Nhà sản xuất Chipset: {gpus.find(element => element.id_product === Product.id_product).producer_chipset}</Typography>
                        <Box
                            style={{ display: 'flex' }}
                        >
                            <Typography variant='body2' style={{ color: "#303030" }}>Chipset : {gpus.find(element => element.id_product === Product.id_product).chipset_gpu}</Typography>
                            &nbsp;
                            <Typography variant='body2' style={{ color: "#303030" }}>Bộ nhớ: {gpus.find(element => element.id_product === Product.id_product).capacity_memory_gpu}</Typography>
                        </Box>
                    </>
                )
            case 'psu':
                return (
                    <>
                        <Link to={"/product/" + Product.id_product} target="_blank"><Typography variant='h6'>{Product.name_product}</Typography></Link>
                        <Typography variant='body2' style={{ color: "#303030" }}>Kích thước: {psus.find(element => element.id_product === Product.id_product).type_size_psu}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thương hiệu: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Công xuất: {psus.find(element => element.id_product === Product.id_product).wattage} W</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Chuẩn hiệu suất : {psus.find(element => element.id_product === Product.id_product).energy_efficiency}</Typography>
                    </>
                )
            case 'harddisk':
                return (
                    <>
                        <Link to={"/product/" + Product.id_product} target="_blank"><Typography variant='h6'>{Product.name_product}</Typography></Link>
                        <Typography variant='body2' style={{ color: "#303030" }}>Loại ổ cứng: {harddisks.find(element => element.id_product === Product.id_product).type_harddisk}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thương hiệu: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Dung lượng: {harddisks.find(element => element.id_product === Product.id_product).capacity_harddisk} W</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Kích thước : {harddisks.find(element => element.id_product === Product.id_product).size_harddisk}</Typography>
                    </>
                )
            case 'casepc':
                return (
                    <>
                        <Link to={"/product/" + Product.id_product} target="_blank"><Typography variant='h6'>{Product.name_product}</Typography></Link>
                        <Typography variant='body2' style={{ color: "#303030" }}>Kích thước: {casepcs.find(element => element.id_product === Product.id_product).type_case}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Thương hiệu: {Product.brand_product}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Chất liệu {casepcs.find(element => element.id_product === Product.id_product).material_case}</Typography>
                        <Typography variant='body2' style={{ color: "#303030" }}>Hỗ trợ bo mạch chủ : {casepcs.find(element => element.id_product === Product.id_product).mainboard_support}</Typography>
                    </>
                )
            default:
                break;
        }
    }

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Cart"
    });

    const [posts, setPosts] = React.useState([]);

    function handleClickAdd(chosenPC) {
        if (cookies.Account !== undefined) {
            if (
                chosenPC.cpu.id !== 0 &&
                chosenPC.cpu.quantity !== 0 &&
                chosenPC.mainboard.id !== 0 &&
                chosenPC.mainboard.quantity !== 0 &&
                chosenPC.ram.id !== 0 &&
                chosenPC.ram.quantity !== 0 &&
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
                )
            ) {
                addPosts(cookies.Account, chosenPC.cpu.id_product, chosenPC.cpu.quantity);
                addPosts(cookies.Account, chosenPC.mainboard.id_product, chosenPC.mainboard.quantity);
                addPosts(cookies.Account, chosenPC.ram.id_product, chosenPC.ram.quantity);
                addPosts(cookies.Account, chosenPC.psu.id_product, chosenPC.psu.quantity);
                addPosts(cookies.Account, chosenPC.casepc.id_product, chosenPC.casepc.quantity);
                if (
                    chosenPC.harddisk1.id !== 0 &&
                    chosenPC.harddisk1.quantity !== 0
                ) {
                    addPosts(cookies.Account, chosenPC.harddisk1.id_product, chosenPC.harddisk1.quantity);
                }
                if (
                    chosenPC.harddisk2.id !== 0 &&
                    chosenPC.harddisk2.quantity !== 0
                ) {
                    addPosts(cookies.Account, chosenPC.harddisk2.id_product, chosenPC.harddisk2.quantity);
                }
                if (chosenPC.gpu.id !== 0 &&
                    chosenPC.gpu.quantity !== 0) {
                    addPosts(cookies.Account, chosenPC.gpu.id_product, chosenPC.gpu.quantity);
                }
            } else {
                dispatch(setOpenSnackBar());
                dispatch(setMessage("Lỗi: Cần nhập đủ sản phẩm yêu cầu"));
                dispatch(setSeverity("error"));
            }
        } else {
            dispatch(setOpenSnackBar());
            dispatch(setMessage("Lỗi: Cần đăng nhập trước khi sử dụng chức năng này"));
            dispatch(setSeverity("error"));
            navigate('/cart')
        }
    }

    function handleClickBuyNow(chosenPC) {
        handleClickAdd(chosenPC)
        navigate('/cart')
    }
    const addPosts = (idAccount, idProduct, quantityProduct) => {
        client
            .post('', {
                "idAccount": idAccount,
                "idProduct": idProduct,
                "quantity": quantityProduct
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

    return (
        <Container maxWidth="xl" style={{ backgroundColor: 'var(--background1)', marginTop: 50, borderRadius: '10px' }}>
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
                    <Typography color="text.primary">Tự Động Xây Dựng Cấu Hình</Typography>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={2} minHeight={600}>
                <Grid item xs={3}>
                    <Box
                        style={{
                            display: 'flex',
                            height: 300,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 10
                        }}
                    >
                        <>
                            <Typography color="text.primary">Hãy nhập số tiền:</Typography>
                            <TextField type={'number'} variant='outlined' size='small' onChange={(e) => setW(e.target.value)}></TextField>
                        </>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại máy tính</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typePC}
                                label="Loại máy tính"
                                onChange={handleChangeTypePC}
                            >
                                <MenuItem value={1}>Chơi game</MenuItem>
                                <MenuItem value={2}>Làm việc văn phòng</MenuItem>
                            </Select>
                        </FormControl>
                        {typePC === 2 &&
                            <FormControlLabel control={<Checkbox inputRef={checkGPURef} value="1" checked={checkGPU} onChange={handleCheckGPU} />} label="Card đồ hoạ" />
                        }
                        <Typography color="text.primary">
                            Số tiền: &nbsp;
                            {parseInt(W).toLocaleString('vi-VI',
                                {
                                    style: 'currency',
                                    currency: 'VND'
                                })}
                        </Typography>
                        <Box
                            style={{
                                display: 'flex',
                                marginTop: 10
                            }}
                        >
                            <ColorButtonContained onClick={HandleClickBuild} variant={'contained'}> Phân tích </ColorButtonContained>
                        </Box>
                    </Box>

                </Grid>
                <Grid item xs={6}>
                    {(selectedProducts.length !== 0) &&
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                padding: '10px 20px 20px 20px',
                                borderRadius: 10
                            }}
                        >
                            <Typography variant="h6">Kết quả phân tích</Typography>
                            {selectedProducts.map(function (Product, index) {
                                return (
                                    <Box
                                        key={index}
                                    >
                                        {(typePC !== 2 || checkGPU !== false || Product.type_product !== 'gpu') &&
                                            <Box
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
                                                        {
                                                            handleShowInfoProduct(Product)
                                                        }
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
                                                </Box>
                                            </Box>
                                        }
                                    </Box>
                                )
                            })}
                        </Box>
                    }
                </Grid>
                <Grid item xs={3}>
                    {totalPrice !== undefined &&
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                padding: 20,
                                borderRadius: 10,
                                height: 150,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography>
                                Chi phí dự tính:
                            </Typography>
                            <Typography variant="h6">
                                {parseInt(totalPrice).toLocaleString('vi-VI',
                                    {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                            </Typography>
                            <ColorButtonOutline variant="outlined"
                                style={{
                                    width: "200px",

                                }}
                                onClick={() => handleClickAdd(handleAnalyzeSelectedProduct(selectedProducts))}
                            >
                                Thêm vào giỏ hàng
                            </ColorButtonOutline>
                            <ColorButtonContained variant="contained" style={{
                                width: "200px",
                            }}
                                onClick={() => handleClickBuyNow(handleAnalyzeSelectedProduct(selectedProducts))}>
                                Mua ngay
                            </ColorButtonContained>
                        </Box>
                    }
                </Grid>
                <Grid item xs={12}>
                    {(selectedProducts.length === 7 && checkGPU === true) &&
                        <>
                            <AnalyzeBuildPc chosenPC={handleAnalyzeSelectedProduct(selectedProducts)} Products={products} showHint={false} />
                        </>
                    }
                </Grid>
            </Grid>
        </Container >
    )
}

export default AutoBuildPC