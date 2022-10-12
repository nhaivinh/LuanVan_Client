import React from "react";
import axios from "axios";
import { Container, TextField } from "@material-ui/core"
import { Box, Button, Grid, makeStyles, Typography, IconButton } from "@mui/material"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AutoBuildPC() {


    //get form api
    const [products, setProducts] = React.useState([])
    const [cpus, setCpus] = React.useState([])
    const [mainboards, setMainboards] = React.useState([])
    const [rams, setRams] = React.useState([])
    const [gpus, setGpu] = React.useState([])
    const [psus, setPsus] = React.useState([])
    const [harddisks, setHarddisks] = React.useState([])
    const [casepcs, setCasepcs] = React.useState([])


    //Đồ vật
    /*
    {
        id, ten, gia, pa, giatri
    }
    */
    const [listChosenProduct, setListChosenProduct] = React.useState([]);

    const [selectedProducts, setSelectedProducts] = React.useState([]);

    const [sLLK, setSLLK] = React.useState(7);

    const [typeProducts, setTypeProducts] = React.useState([
        //CPU, GPU , Main, Ram, PSU, ssd, hdd , casepc
        {
            type: 'cpu',
            quantity: 0,
            priority: 7,
            isChosen: false,
        },
        {
            type: 'gpu',
            quantity: 0,
            priority: 14,
            isChosen: false,
        },
        {
            type: 'mainboard',
            quantity: 0,
            priority: 5,
            isChosen: false
        },
        {
            type: 'ram',
            quantity: 0,
            priority: 4,
            isChosen: false,
        },
        {
            type: 'psu',
            quantity: 0,
            priority: 3,
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
            priority: 1,
            isChosen: false,
        },
    ])

    const [W, setW] = React.useState(0)
    const [TGT, setTGT] = React.useState(0)
    const [CT, setCT] = React.useState(0)
    const [GLNTT, setGLNTT] = React.useState(0)

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/product`)
            .then(res => {
                const Products = res.data;
                setProducts(Products);
            })
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
                setCasepcs(CasePCs);
            })
    }, [])

    React.useEffect(() => {
        var filteredProducts = products.filter(function (product) {
            switch (product.type_product) {
                case 'cpu':
                    return (product.unit_price_product < (W * 40 / 100) && product.unit_price_product > (W * 20 / 100))
                case 'gpu':
                    return (product.unit_price_product < (W * 40 / 100) && product.unit_price_product > (W * 20 / 100))
                case 'mainboard':
                    return (product.unit_price_product < (W * 25 / 100) && product.unit_price_product > (W * 15 / 100))
                default:
                    return (product.unit_price_product < (W * 10 / 100) && product.unit_price_product > (W * 2 / 100) && product.type_product !== "cooling_system")
            }
            // if (product.type_product === 'cpu')

            // else
            //     if (product.type_product == 'gpu')
            //         return (product.unit_price_product < (W * 30 / 100))
            //     else
            //         if (product.type_product == 'mainboard')
            //             return (product.unit_price_product < (W * 30 / 100) )
            //         else
            //             return (product.unit_price_product < (W * 20 / 100) && product.type_product !== "cooling_system")
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
        handleListChosenProduct(filteredProducts)
        HandleQuantityProductByType(filterCpus.length, filterGpus.length, filterMainboards.length, filterRams.length, filterPsus.length, filterHarddisks.length, filterCasePCs.length)

    }, [W])

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

    function handleGetChosenProduct(Products) {
        var exportProducts = products
        var filteredProducts = Products.filter(function (product) {
            return (product.PA !== 0)
        })

        if (filteredProducts !== undefined) {
            exportProducts = handleGetIDProduct(filteredProducts).map(function (id) {
                return (
                    products.find(element => element.id_product === id)
                )
            })
        }
        setSelectedProducts(exportProducts)
    }

    let product = listChosenProduct
    let testPA = []
    let aW = W
    let aCT = 0
    let aGLNTT = 0
    let aTGT = 0
    let aBool = [false, false, false, false, false, false, false]
    let achosen = []
    let aX = []

    function capNhatDaLayTT() {
        // console.log("capNhatDaLayTT")
        for (let i = 0; i < aBool.length; i++) {
            achosen[i] = aBool[i]
        }
    }

    function capNhatGLNTT() {
        // console.log("capNhatGLNTT")
        if (aGLNTT < aTGT) {
            aGLNTT = aTGT
            for (let i = 0; i < listChosenProduct.length; i++) {
                product[i].PA = aX[i]
            }
        }
    }

    function HandleClickBuild() {

        nhanhCan(0)
        console.log("ok")
        // console.log(product)
        handleGetChosenProduct(product)
    }

    function nhanhCan(i) {
        // console.log("chay bat dau")
        // console.log(aW)
        // console.log(aBool)
        // console.log(aX)
        // console.log(achosen)
        // console.log(testPA)
        let yk = 0
        let y
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
            if (aCT > aGLNTT) {
                // console.log("kt cập nhật")
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
                    // console.log("chay nhanh can tiep theo")
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

    // function capNhatDaLayTT() {
    //     for (let i = 0; i < boolType.length; i++) {
    //         HandleSetChosen(i, boolType[i])
    //     }
    // }

    // function capNhatGLNTT() {
    //     if (GLNTT < TGT) {
    //         setGLNTT(TGT)
    //         for (let i = 0; i < listChosenProduct.length; i++) {
    //             listChosenProduct[i].PA = X[i]
    //         }
    //     }
    // }

    // function nhanhCan(i) {
    //     console.log("chay bat dau")
    //     var yk = 0
    //     let y
    //     for (y = 0; y < typeProducts.length; y++) {
    //         if (listChosenProduct[i].type_product === typeProducts[y].type) {            
    //             if (boolType[y] === true) {
    //                 yk = 0
    //             } else {
    //                 yk = Math.min(1, W / listChosenProduct[i].unit_price_product)
    //             }
    //             break;
    //         }
    //     }    
    //     for (let j = yk; j >= 0; j--) {
    //         console.log(boolType)
    //         if (j === 1) {
    //             HandleSetBool(j, true)
    //         } 
    //         console.log(boolType)                 
    //         setTGT(TGT + j * listChosenProduct[i].gia_tri)   
    //         setW(W - j * listChosenProduct[i].unit_price_product)
    //         try {
    //             setCT(TGT + W * typeProducts[y].priority)
    //         } catch (error) {
    //             setCT(TGT)
    //         }
    //         if (CT > GLNTT) {
    //             let count = 0
    //             HandleSetX(i, j)
    //             for (let k = 0; k < boolType.length; k++) {
    //                 if (boolType[k] === true) {
    //                     count++
    //                 }
    //             }
    //             if (i === listChosenProduct.length - 1 || W == 0) {
    //                 if (count >= sLLK) {
    //                     capNhatGLNTT()
    //                     capNhatDaLayTT()
    //                 }
    //             } else {
    //                 console.log("chay nhanh can tiep theo")
    //                 nhanhCan(i + 1)
    //             }
    //         }
    //         if (j === 1) {
    //             HandleSetX(i, 0)
    //             setTGT(TGT - j * listChosenProduct[i].gia_tri)
    //             setW(W + j * listChosenProduct[i].unit_price_product)
    //             setBoolType(y, false)
    //         }
    //     }
    // }
    { console.log(selectedProducts) }
    // { console.log("w: "+ W + " tgt: "+ TGT + " GLNTT: "+ GLNTT + " ct: "+ CT) }
    // { console.log("x: "+ X ) }
    return (
        <Container maxWidth="lg" style={{ backgroundColor: 'rgb(248, 248, 252)', borderRadius: '10px' }}>
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
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField type={'number'} onChange={(e) => setW(e.target.value)}></TextField>
                    <Typography color="text.primary">{W}</Typography>
                    <Button onClick={HandleClickBuild}> Tính </Button>
                </Grid>
                <Grid item xs={8}>
                    {selectedProducts.length !== 0 &&
                        <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {selectedProducts.map(function (Product) {
                            return (
                                <Box
                                    key={Product.id_product}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '2px solid lightgrey',
                                        borderRadius: 10
                                    }}
                                >
                                    <Link to={"/product/" + Product.id_product} target="_blank">
                                        <Box
                                            key={Product.id_product}
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            {
                                                Product.picture_product !== null ?
                                                    <img src={Product.picture_product} width={'80'} />
                                                    :
                                                    <img src={"data:image/png;base64, " + Product.picture_link_product} alt="product images" width={'80'} height={'80'} />
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
                        })}
                    </Box>
                    }
                </Grid>
            </Grid>
        </Container >
    )
}

export default AutoBuildPC