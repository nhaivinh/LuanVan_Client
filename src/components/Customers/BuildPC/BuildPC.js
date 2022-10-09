import React from "react";
import axios from "axios";
import { Container, TextField } from "@material-ui/core"
import { Box, Button, Grid, makeStyles, Typography, IconButton } from "@mui/material"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BuildPCFormAdd from "./BuildPCFormAdd";
import AnalyzeBuildPc from "./AnalyzeBuildPc";
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function BuildPC() {
    const [chosenPC, setChosenPC] = React.useState({
        cpu: {
            id_product: 0,
            quantity: 0
        },
        mainboard: {
            id_product: 0,
            quantity: 0
        },
        ram: {
            id_product: 0,
            quantity: 0
        },
        gpu: {
            id_product: 0,
            quantity: 0
        },
        psu: {
            id_product: 0,
            quantity: 0
        },
        harddisk1: {
            id_product: 0,
            quantity: 0
        },
        harddisk2: {
            id_product: 0,
            quantity: 0
        },
        casepc: {
            id_product: 0,
            quantity: 0
        },
    })

    const [, dispatch] = React.useContext(SnackBarContext);

    const [showAnalyze, setShowAnalyze] = React.useState(false)

    const [products, setProducts] = React.useState([])

    const [totalPrice, setTotalPrice] = React.useState(0)

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/product`)
            .then(res => {
                const Products = res.data;
                setProducts(Products);
            })
    }, [])

    React.useEffect(() => {
        var result = 0
        var key
        for (key in chosenPC) {
            if (chosenPC[key].id_product !== 0) {
                result += chosenPC[key].quantity * products.find(element => element.id_product === chosenPC[key].id_product).unit_price_product * (1 - products.find(element => element.id_product === chosenPC[key].id_product).discount_product * 0.01)
            }

        }
        setTotalPrice(result)
    }, [chosenPC])

    function handleShowAnalyze() {
        if (
            chosenPC.cpu.id !== 0 &&
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
            )
        ) {
            setShowAnalyze(true)
        } else {
            dispatch(setOpenSnackBar());
            dispatch(setMessage("Lỗi: Hãy chọn đủ linh kiện của cấu hình"));
            dispatch(setSeverity("error"));
        }
    }

    function handleSetChosenProduct(id, type) {
        switch (type) {
            case 'cpu':
                setChosenPC(existingValues => ({
                    ...existingValues,
                    cpu: {
                        id_product: id,
                        quantity: 1
                    },
                }))
                break;
            case 'mainboard':
                setChosenPC(existingValues => ({
                    ...existingValues,
                    mainboard: {
                        id_product: id,
                        quantity: 1
                    },
                }))
                break;
            case 'ram':
                setChosenPC(existingValues => ({
                    ...existingValues,
                    ram: {
                        id_product: id,
                        quantity: 1
                    },
                }))
                break;
            case 'gpu':
                setChosenPC(existingValues => ({
                    ...existingValues,
                    gpu: {
                        id_product: id,
                        quantity: 1
                    },
                }))
                break;
            case 'psu':
                setChosenPC(existingValues => ({
                    ...existingValues,
                    psu: {
                        id_product: id,
                        quantity: 1
                    },
                }))
                break;
            case 'harddisk1':
                setChosenPC(existingValues => ({
                    ...existingValues,
                    harddisk1: {
                        id_product: id,
                        quantity: 1
                    },
                }))
                break;
            case 'harddisk2':
                setChosenPC(existingValues => ({
                    ...existingValues,
                    harddisk2: {
                        id_product: id,
                        quantity: 1
                    },
                }))
                break;
            case 'casepc':
                setChosenPC(existingValues => ({
                    ...existingValues,
                    casepc: {
                        id_product: id,
                        quantity: 1
                    },
                }))
                break;
            default:
                break;
        }
    }

    function handleSelectProductInfo(id) {
        if (id !== 0) {
            return (
                products.find(element => element.id_product === id)
            )
        } else {
            return ({
                id_product: 0,
                name_product: null,
                picture_link_product: null,
                picture_product: null,
                unit_price_product: 0
            })
        }
    }

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const client = axios.create({
        baseURL: "https://localhost:7253/api/Cart"
    });

    const [posts, setPosts] = React.useState([]);

    function handleClickAdd() {
        if (
            chosenPC.cpu.id !== 0 &&
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
            )
        ) {
            addPosts(cookies.Account, chosenPC.cpu.id_product, chosenPC.cpu.quantity);
            addPosts(cookies.Account, chosenPC.mainboard.id_product, chosenPC.mainboard.quantity);
            addPosts(cookies.Account, chosenPC.ram.id_product, chosenPC.ram.quantity);
            addPosts(cookies.Account, chosenPC.gpu.id_product, chosenPC.gpu.quantity);
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
        } else {
            dispatch(setOpenSnackBar());
            dispatch(setMessage("Lỗi: Cần nhập đủ sản phẩm yêu cầu"));
            dispatch(setSeverity("error"));
        }

    }

    function handleClickBuyNow() {
        handleClickAdd()
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
                    <Typography color="text.primary">Xây Dựng Cấu Hình</Typography>
                </Breadcrumbs>
            </Box>
            {showAnalyze &&
                <AnalyzeBuildPc chosenPC={chosenPC} Products={products} />
            }
            <Grid container spacing={2} minHeight={600}>
                <Grid item xs={8}>
                    <Box>
                        <Box style={{
                            width: '98%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Vi xử lý</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                                alignItems: 'center'
                            }}>
                                {chosenPC.cpu.id_product !== 0 ?
                                    <Box style={{
                                        border: '2px solid lightgrey',
                                        borderRadius: '10px',
                                        padding: 2
                                    }}>
                                        {
                                            handleSelectProductInfo(chosenPC.cpu.id_product).picture_product !== null ?
                                                <img src={handleSelectProductInfo(chosenPC.cpu.id_product).picture_product} width={'100%'} />
                                                :
                                                <img src={"data:image/png;base64, " + handleSelectProductInfo(chosenPC.cpu.id_product).picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
                                    </Box>
                                    :
                                    <img src={require('../../../images/Icon/cpu.svg').default} width={'100%'} />
                                }

                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {chosenPC.cpu.id_product !== 0 && products !== [] ?
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography variant="body2">{handleSelectProductInfo(chosenPC.cpu.id_product).name_product}</Typography>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '15%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgrey',
                                            borderRadius: 10,
                                            marginRight: 10
                                        }}>

                                            <Box style={{
                                                display: 'flex',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                {chosenPC.cpu.quantity === 1 ?
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                cpu: {
                                                                    id_product: 0,
                                                                    quantity: 0
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                cpu: {
                                                                    ...existingValues.cpu,
                                                                    quantity: existingValues.cpu.quantity - 1
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                                <Typography>
                                                    {
                                                        chosenPC.cpu.quantity
                                                    }
                                                </Typography>
                                                <IconButton
                                                    onClick={() => {
                                                        setChosenPC(existingValues => ({
                                                            ...existingValues,
                                                            cpu: {
                                                                ...existingValues.cpu,
                                                                quantity: existingValues.cpu.quantity + 1
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '25%'
                                        }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography >
                                                    {(handleSelectProductInfo(chosenPC.cpu.id_product).unit_price_product * (1 - handleSelectProductInfo(chosenPC.cpu.id_product).discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {handleSelectProductInfo(chosenPC.cpu.id_product).discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {handleSelectProductInfo(chosenPC.cpu.id_product).unit_price_product.toLocaleString('vi-VI',
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
                                    :
                                    <Box style={{
                                        display: 'flex'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography>Vui lòng chọn linh kiện</Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>
                            <Box style={{
                                width: '5%',
                            }}>
                                <BuildPCFormAdd Type={'cpu'} handleSetChosenProduct={handleSetChosenProduct} Products={products} chosenProducts={chosenPC} />
                            </Box>
                        </Box>
                    </Box>
                    {/* mainboard */}
                    <Box>
                        <Box style={{
                            width: '98%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Bo mạch</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                                alignItems: 'center'
                            }}>
                                {chosenPC.mainboard.id_product !== 0 ?
                                    <Box style={{
                                        border: '2px solid lightgrey',
                                        borderRadius: '10px',
                                        padding: 2
                                    }}>
                                        {
                                            handleSelectProductInfo(chosenPC.mainboard.id_product).picture_product !== null ?
                                                <img src={handleSelectProductInfo(chosenPC.mainboard.id_product).picture_product} width={'100%'} />
                                                :
                                                <img src={"data:image/png;base64, " + handleSelectProductInfo(chosenPC.mainboard.id_product).picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
                                    </Box>
                                    :
                                    <img src={require('../../../images/Icon/main.svg').default} width={'100%'} />
                                }

                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {chosenPC.mainboard.id_product !== 0 && products !== [] ?
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography variant="body2">{handleSelectProductInfo(chosenPC.mainboard.id_product).name_product}</Typography>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '15%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgrey',
                                            borderRadius: 10,
                                            marginRight: 10
                                        }}>

                                            <Box style={{
                                                display: 'flex',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                {chosenPC.mainboard.quantity === 1 ?
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                mainboard: {
                                                                    id_product: 0,
                                                                    quantity: 0
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                mainboard: {
                                                                    ...existingValues.mainboard,
                                                                    quantity: existingValues.mainboard.quantity - 1
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                                <Typography>
                                                    {
                                                        chosenPC.mainboard.quantity
                                                    }
                                                </Typography>
                                                <IconButton
                                                    onClick={() => {
                                                        setChosenPC(existingValues => ({
                                                            ...existingValues,
                                                            mainboard: {
                                                                ...existingValues.mainboard,
                                                                quantity: existingValues.mainboard.quantity + 1
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '25%'
                                        }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography >
                                                    {(handleSelectProductInfo(chosenPC.mainboard.id_product).unit_price_product * (1 - handleSelectProductInfo(chosenPC.mainboard.id_product).discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {handleSelectProductInfo(chosenPC.mainboard.id_product).discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {handleSelectProductInfo(chosenPC.mainboard.id_product).unit_price_product.toLocaleString('vi-VI',
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
                                    :
                                    <Box style={{
                                        display: 'flex'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography>Vui lòng chọn linh kiện</Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>

                            <Box style={{
                                width: '5%',
                            }}>
                                <BuildPCFormAdd Type={'mainboard'} handleSetChosenProduct={handleSetChosenProduct} Products={products} chosenProducts={chosenPC} />
                            </Box>
                        </Box>
                    </Box>
                    {/* ram */}
                    <Box>
                        <Box style={{
                            width: '98%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Ram</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                                alignItems: 'center'
                            }}>
                                {chosenPC.ram.id_product !== 0 ?
                                    <Box style={{
                                        border: '2px solid lightgrey',
                                        borderRadius: '10px',
                                        padding: 2
                                    }}>
                                        {
                                            handleSelectProductInfo(chosenPC.ram.id_product).picture_product !== null ?
                                                <img src={handleSelectProductInfo(chosenPC.ram.id_product).picture_product} width={'100%'} />
                                                :
                                                <img src={"data:image/png;base64, " + handleSelectProductInfo(chosenPC.ram.id_product).picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
                                    </Box>
                                    :
                                    <img src={require('../../../images/Icon/ram.svg').default} width={'100%'} />
                                }

                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {chosenPC.ram.id_product !== 0 && products !== [] ?
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography variant="body2">{handleSelectProductInfo(chosenPC.ram.id_product).name_product}</Typography>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '15%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgrey',
                                            borderRadius: 10,
                                            marginRight: 10
                                        }}>

                                            <Box style={{
                                                display: 'flex',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                {chosenPC.ram.quantity === 1 ?
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                ram: {
                                                                    id_product: 0,
                                                                    quantity: 0
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                ram: {
                                                                    ...existingValues.ram,
                                                                    quantity: existingValues.ram.quantity - 1
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                                <Typography>
                                                    {
                                                        chosenPC.ram.quantity
                                                    }
                                                </Typography>
                                                <IconButton
                                                    onClick={() => {
                                                        setChosenPC(existingValues => ({
                                                            ...existingValues,
                                                            ram: {
                                                                ...existingValues.ram,
                                                                quantity: existingValues.ram.quantity + 1
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '25%'
                                        }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography >
                                                    {(handleSelectProductInfo(chosenPC.ram.id_product).unit_price_product * (1 - handleSelectProductInfo(chosenPC.ram.id_product).discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {handleSelectProductInfo(chosenPC.ram.id_product).discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {handleSelectProductInfo(chosenPC.ram.id_product).unit_price_product.toLocaleString('vi-VI',
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
                                    :
                                    <Box style={{
                                        display: 'flex'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography>Vui lòng chọn linh kiện</Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>

                            <Box style={{
                                width: '5%',
                            }}>
                                <BuildPCFormAdd Type={'ram'} handleSetChosenProduct={handleSetChosenProduct} Products={products} chosenProducts={chosenPC} />
                            </Box>
                        </Box>
                    </Box>
                    {/* gpu */}
                    <Box>
                        <Box style={{
                            width: '98%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Card đồ hoạ</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                                alignItems: 'center'
                            }}>
                                {chosenPC.gpu.id_product !== 0 ?
                                    <Box style={{
                                        border: '2px solid lightgrey',
                                        borderRadius: '10px',
                                        padding: 2
                                    }}>
                                        {
                                            handleSelectProductInfo(chosenPC.gpu.id_product).picture_product !== null ?
                                                <img src={handleSelectProductInfo(chosenPC.gpu.id_product).picture_product} width={'100%'} />
                                                :
                                                <img src={"data:image/png;base64, " + handleSelectProductInfo(chosenPC.gpu.id_product).picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
                                    </Box>
                                    :
                                    <img src={require('../../../images/Icon/vga.svg').default} width={'100%'} />
                                }

                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {chosenPC.gpu.id_product !== 0 && products !== [] ?
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography variant="body2">{handleSelectProductInfo(chosenPC.gpu.id_product).name_product}</Typography>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '15%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgrey',
                                            borderRadius: 10,
                                            marginRight: 10
                                        }}>

                                            <Box style={{
                                                display: 'flex',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                {chosenPC.gpu.quantity === 1 ?
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                gpu: {
                                                                    id_product: 0,
                                                                    quantity: 0
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                gpu: {
                                                                    ...existingValues.gpu,
                                                                    quantity: existingValues.gpu.quantity - 1
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                                <Typography>
                                                    {
                                                        chosenPC.gpu.quantity
                                                    }
                                                </Typography>
                                                <IconButton
                                                    onClick={() => {
                                                        setChosenPC(existingValues => ({
                                                            ...existingValues,
                                                            gpu: {
                                                                ...existingValues.gpu,
                                                                quantity: existingValues.gpu.quantity + 1
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '25%'
                                        }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography >
                                                    {(handleSelectProductInfo(chosenPC.gpu.id_product).unit_price_product * (1 - handleSelectProductInfo(chosenPC.gpu.id_product).discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {handleSelectProductInfo(chosenPC.gpu.id_product).discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {handleSelectProductInfo(chosenPC.gpu.id_product).unit_price_product.toLocaleString('vi-VI',
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
                                    :
                                    <Box style={{
                                        display: 'flex'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography>Vui lòng chọn linh kiện</Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>

                            <Box style={{
                                width: '5%',
                            }}>
                                <BuildPCFormAdd Type={'gpu'} handleSetChosenProduct={handleSetChosenProduct} Products={products} chosenProducts={chosenPC} />
                            </Box>
                        </Box>
                    </Box>
                    {/* psu */}
                    <Box>
                        <Box style={{
                            width: '98%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Nguồn</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                                alignItems: 'center'
                            }}>
                                {chosenPC.psu.id_product !== 0 ?
                                    <Box style={{
                                        border: '2px solid lightgrey',
                                        borderRadius: '10px',
                                        padding: 2
                                    }}>
                                        {
                                            handleSelectProductInfo(chosenPC.psu.id_product).picture_product !== null ?
                                                <img src={handleSelectProductInfo(chosenPC.psu.id_product).picture_product} width={'100%'} />
                                                :
                                                <img src={"data:image/png;base64, " + handleSelectProductInfo(chosenPC.psu.id_product).picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
                                    </Box>
                                    :
                                    <img src={require('../../../images/Icon/psu.svg').default} width={'100%'} />
                                }

                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {chosenPC.psu.id_product !== 0 && products !== [] ?
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography variant="body2">{handleSelectProductInfo(chosenPC.psu.id_product).name_product}</Typography>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '15%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgrey',
                                            borderRadius: 10,
                                            marginRight: 10
                                        }}>

                                            <Box style={{
                                                display: 'flex',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                {chosenPC.psu.quantity === 1 ?
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                psu: {
                                                                    id_product: 0,
                                                                    quantity: 0
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                psu: {
                                                                    ...existingValues.psu,
                                                                    quantity: existingValues.psu.quantity - 1
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                                <Typography>
                                                    {
                                                        chosenPC.psu.quantity
                                                    }
                                                </Typography>
                                                <IconButton
                                                    onClick={() => {
                                                        setChosenPC(existingValues => ({
                                                            ...existingValues,
                                                            psu: {
                                                                ...existingValues.psu,
                                                                quantity: existingValues.psu.quantity + 1
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '25%'
                                        }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography >
                                                    {(handleSelectProductInfo(chosenPC.psu.id_product).unit_price_product * (1 - handleSelectProductInfo(chosenPC.psu.id_product).discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {handleSelectProductInfo(chosenPC.psu.id_product).discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {handleSelectProductInfo(chosenPC.psu.id_product).unit_price_product.toLocaleString('vi-VI',
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
                                    :
                                    <Box style={{
                                        display: 'flex'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography>Vui lòng chọn linh kiện</Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>

                            <Box style={{
                                width: '5%',
                            }}>
                                <BuildPCFormAdd Type={'psu'} handleSetChosenProduct={handleSetChosenProduct} Products={products} chosenProducts={chosenPC} />
                            </Box>
                        </Box>
                    </Box>
                    {/* harddisk1 */}
                    <Box>
                        <Box style={{
                            width: '98%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Ổ cứng</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                                alignItems: 'center'
                            }}>
                                {chosenPC.harddisk1.id_product !== 0 ?
                                    <Box style={{
                                        border: '2px solid lightgrey',
                                        borderRadius: '10px',
                                        padding: 2
                                    }}>
                                        {
                                            handleSelectProductInfo(chosenPC.harddisk1.id_product).picture_product !== null ?
                                                <img src={handleSelectProductInfo(chosenPC.harddisk1.id_product).picture_product} width={'100%'} />
                                                :
                                                <img src={"data:image/png;base64, " + handleSelectProductInfo(chosenPC.harddisk1.id_product).picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
                                    </Box>
                                    :
                                    <img src={require('../../../images/Icon/hdd.svg').default} width={'100%'} />
                                }

                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {chosenPC.harddisk1.id_product !== 0 && products !== [] ?
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography variant="body2">{handleSelectProductInfo(chosenPC.harddisk1.id_product).name_product}</Typography>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '15%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgrey',
                                            borderRadius: 10,
                                            marginRight: 10
                                        }}>

                                            <Box style={{
                                                display: 'flex',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                {chosenPC.harddisk1.quantity === 1 ?
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                harddisk1: {
                                                                    id_product: 0,
                                                                    quantity: 0
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                harddisk1: {
                                                                    ...existingValues.harddisk1,
                                                                    quantity: existingValues.harddisk1.quantity - 1
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                                <Typography>
                                                    {
                                                        chosenPC.harddisk1.quantity
                                                    }
                                                </Typography>
                                                <IconButton
                                                    onClick={() => {
                                                        setChosenPC(existingValues => ({
                                                            ...existingValues,
                                                            harddisk1: {
                                                                ...existingValues.harddisk1,
                                                                quantity: existingValues.harddisk1.quantity + 1
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '25%'
                                        }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography >
                                                    {(handleSelectProductInfo(chosenPC.harddisk1.id_product).unit_price_product * (1 - handleSelectProductInfo(chosenPC.harddisk1.id_product).discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {handleSelectProductInfo(chosenPC.harddisk1.id_product).discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {handleSelectProductInfo(chosenPC.harddisk1.id_product).unit_price_product.toLocaleString('vi-VI',
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
                                    :
                                    <Box style={{
                                        display: 'flex'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography>Vui lòng chọn linh kiện</Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>

                            <Box style={{
                                width: '5%',
                            }}>
                                <BuildPCFormAdd Type={'harddisk1'} handleSetChosenProduct={handleSetChosenProduct} Products={products} chosenProducts={chosenPC} />
                            </Box>
                        </Box>
                    </Box>
                    {/* harddisk2 */}
                    <Box>
                        <Box style={{
                            width: '98%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Ổ cứng</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                                alignItems: 'center'
                            }}>
                                {chosenPC.harddisk2.id_product !== 0 ?
                                    <Box style={{
                                        border: '2px solid lightgrey',
                                        borderRadius: '10px',
                                        padding: 2
                                    }}>
                                        {
                                            handleSelectProductInfo(chosenPC.harddisk2.id_product).picture_product !== null ?
                                                <img src={handleSelectProductInfo(chosenPC.harddisk2.id_product).picture_product} width={'100%'} />
                                                :
                                                <img src={"data:image/png;base64, " + handleSelectProductInfo(chosenPC.harddisk2.id_product).picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
                                    </Box>
                                    :
                                    <img src={require('../../../images/Icon/ssd.svg').default} width={'100%'} />
                                }

                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {chosenPC.harddisk2.id_product !== 0 && products !== [] ?
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography variant="body2">{handleSelectProductInfo(chosenPC.harddisk2.id_product).name_product}</Typography>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '15%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgrey',
                                            borderRadius: 10,
                                            marginRight: 10
                                        }}>

                                            <Box style={{
                                                display: 'flex',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                {chosenPC.harddisk2.quantity === 1 ?
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                harddisk2: {
                                                                    id_product: 0,
                                                                    quantity: 0
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                harddisk2: {
                                                                    ...existingValues.harddisk2,
                                                                    quantity: existingValues.harddisk2.quantity - 1
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                                <Typography>
                                                    {
                                                        chosenPC.harddisk2.quantity
                                                    }
                                                </Typography>
                                                <IconButton
                                                    onClick={() => {
                                                        setChosenPC(existingValues => ({
                                                            ...existingValues,
                                                            harddisk2: {
                                                                ...existingValues.harddisk2,
                                                                quantity: existingValues.harddisk2.quantity + 1
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '25%'
                                        }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography >
                                                    {(handleSelectProductInfo(chosenPC.harddisk2.id_product).unit_price_product * (1 - handleSelectProductInfo(chosenPC.harddisk2.id_product).discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {handleSelectProductInfo(chosenPC.harddisk2.id_product).discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {handleSelectProductInfo(chosenPC.harddisk2.id_product).unit_price_product.toLocaleString('vi-VI',
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
                                    :
                                    <Box style={{
                                        display: 'flex'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography>Vui lòng chọn linh kiện</Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>

                            <Box style={{
                                width: '5%',
                            }}>
                                <BuildPCFormAdd Type={'harddisk2'} handleSetChosenProduct={handleSetChosenProduct} Products={products} chosenProducts={chosenPC} />
                            </Box>
                        </Box>
                    </Box>
                    {/* Case PC */}
                    <Box>
                        <Box style={{
                            width: '98%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Vỏ Máy Tính</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                                alignItems: 'center'
                            }}>
                                {chosenPC.casepc.id_product !== 0 ?
                                    <Box style={{
                                        border: '2px solid lightgrey',
                                        borderRadius: '10px',
                                        padding: 2
                                    }}>
                                        {
                                            handleSelectProductInfo(chosenPC.casepc.id_product).picture_product !== null ?
                                                <img src={handleSelectProductInfo(chosenPC.casepc.id_product).picture_product} width={'100%'} />
                                                :
                                                <img src={"data:image/png;base64, " + handleSelectProductInfo(chosenPC.casepc.id_product).picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
                                    </Box>
                                    :
                                    <img src={require('../../../images/Icon/case.svg').default} width={'100%'} />
                                }

                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {chosenPC.casepc.id_product !== 0 && products !== [] ?
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography variant="body2">{handleSelectProductInfo(chosenPC.casepc.id_product).name_product}</Typography>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '15%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgrey',
                                            borderRadius: 10,
                                            marginRight: 10
                                        }}>

                                            <Box style={{
                                                display: 'flex',
                                                borderRadius: 5,
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                {chosenPC.casepc.quantity === 1 ?
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                casepc: {
                                                                    id_product: 0,
                                                                    quantity: 0
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    :
                                                    <IconButton
                                                        onClick={() => {
                                                            setChosenPC(existingValues => ({
                                                                ...existingValues,
                                                                casepc: {
                                                                    ...existingValues.casepc,
                                                                    quantity: existingValues.casepc.quantity - 1
                                                                },
                                                            }))
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                }
                                                <Typography>
                                                    {
                                                        chosenPC.casepc.quantity
                                                    }
                                                </Typography>
                                                <IconButton
                                                    onClick={() => {
                                                        setChosenPC(existingValues => ({
                                                            ...existingValues,
                                                            casepc: {
                                                                ...existingValues.casepc,
                                                                quantity: existingValues.casepc.quantity + 1
                                                            },
                                                        }))
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Box style={{
                                            flexBasis: '25%'
                                        }}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography >
                                                    {(handleSelectProductInfo(chosenPC.casepc.id_product).unit_price_product * (1 - handleSelectProductInfo(chosenPC.casepc.id_product).discount_product * 0.01)).toLocaleString('vi-VI',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                                </Typography>
                                                {handleSelectProductInfo(chosenPC.casepc.id_product).discount_product !== 0 &&
                                                    <Typography variant='body2'>
                                                        <del>
                                                            {handleSelectProductInfo(chosenPC.casepc.id_product).unit_price_product.toLocaleString('vi-VI',
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
                                    :
                                    <Box style={{
                                        display: 'flex'
                                    }}>
                                        <Box style={{
                                            flexBasis: '60%'
                                        }}>
                                            <Typography>Vui lòng chọn linh kiện</Typography>
                                        </Box>
                                    </Box>
                                }
                            </Box>

                            <Box style={{
                                width: '5%',
                            }}>
                                <BuildPCFormAdd Type={'casepc'} handleSetChosenProduct={handleSetChosenProduct} Products={products} chosenProducts={chosenPC} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box style={{
                        // position: 'fixed',
                        height: 200,
                        backgroundColor: 'white',
                        marginTop: 20,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '100%',
                            height: 150,
                            flexDirection: 'row'
                        }}>
                            <Box style={{
                                display: 'flex',
                                width: '35%',
                                flexDirection: 'column',
                            }}>
                                <Typography>Chi phí dự tính: </Typography>
                                <Typography variant="h6">
                                    {totalPrice.toLocaleString('vi-VI',
                                        {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                </Typography>
                            </Box>
                            <Box style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <Button
                                    variant="outlined"
                                    style={{
                                        width: "200px",
                                    }}
                                    onClick={handleShowAnalyze}
                                >
                                    Phân tích cấu hình
                                </Button>
                                <Button variant="outlined"
                                    style={{
                                        width: "200px",

                                    }}
                                    onClick={handleClickAdd}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                                <Button variant="contained" style={{
                                    width: "200px",
                                }}
                                    onClick={handleClickBuyNow}>
                                    Mua ngay
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container >
    )
}

export default BuildPC