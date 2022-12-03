import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SnackBarContext from '../../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../../SnackBar/SnackBarAction';
import ProductFormAddTechInfo from './ProductFormAddTechInfo';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

export default function ProductManagementFormAdd() {

    const clientInfoProduct = axios.create({
        baseURL: "https://localhost:7253/api/Product"
    });

    let clientTechInfoProduct

    const [, dispatch] = React.useContext(SnackBarContext);

    const [postsInfoProduct, setPostsInfoProduct] = React.useState([]);

    const [postsTechInfoProduct, setPostsTechInfoProduct] = React.useState([]);

    const [product, setProduct] = React.useState({
        NameProduct: '',
        BrandProduct: '',
        TypeProduct: 'cpu',
        UnitPriceProduct: 0,
        InsuranceProduct: 0,
        DiscountProduct: 0,
    });

    const [infoTech, setInfoTech] = React.useState({
        TypeHarddisk: 'hdd',
    });

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const Checkproduct = () => {
        let thongbao = "Hãy thêm thông tin đúng dạng cho :";
        let validNameProduct = false;
        let validBrandProduct = false;
        let validTypeProduct = false;
        let validUnitPriceProduct = false;
        let validInsuranceProduct = false;
        let validDiscountProduct = false;

        if (product.NameProduct === "") {
            thongbao = thongbao + "\nTên sản phẩm"
        } else validNameProduct = true

        if (product.BrandProduct === "") {
            thongbao = thongbao + "\nThương hiệu"
        } else validBrandProduct = true

        if (product.TypeProduct === "") {
            thongbao = thongbao + "\nLoại sản phẩm"
        } else validTypeProduct = true

        if (product.UnitPriceProduct === 0) {
            thongbao = thongbao + "\nĐơn giá"
        } else validUnitPriceProduct = true

        if (product.InsuranceProduct === 0) {
            thongbao = thongbao + "\nBảo hành"
        } else validInsuranceProduct = true

        if (product.DiscountProduct === 0) {
            thongbao = thongbao + "\nGiảm giá"
        } else validDiscountProduct = true

        if (validNameProduct && validBrandProduct && validTypeProduct && validUnitPriceProduct && validInsuranceProduct && validDiscountProduct) {
            switch (product.TypeProduct) {
                case 'cpu':
                    clientTechInfoProduct = axios.create({
                        baseURL: "https://localhost:7253/api/CPU"
                    });
                    break;
                case 'mainboard':
                    clientTechInfoProduct = axios.create({
                        baseURL: "https://localhost:7253/api/Mainboard"
                    });
                    break;
                case 'gpu':
                    clientTechInfoProduct = axios.create({
                        baseURL: "https://localhost:7253/api/GPU"
                    });
                    break;
                case 'harddisk':
                    clientTechInfoProduct = axios.create({
                        baseURL: "https://localhost:7253/api/Harddisk"
                    });
                    break;
                case 'ram':
                    clientTechInfoProduct = axios.create({
                        baseURL: "https://localhost:7253/api/Ram"
                    });
                    break;
                case 'casepc':
                    clientTechInfoProduct = axios.create({
                        baseURL: "https://localhost:7253/api/CasePC"
                    });
                    break;
                case 'psu':
                    clientTechInfoProduct = axios.create({
                        baseURL: "https://localhost:7253/api/PSU"
                    });
                    break;
                case 'cooling_system':
                    clientTechInfoProduct = axios.create({
                        baseURL: "https://localhost:7253/api/CoolingSystem"
                    });
                    break;
                default:
                    break;
            }
            addPosts(product, infoTech);
            console.log(product);
            console.log(infoTech)
        } else {
            alert(thongbao);
        }
    }

    const addPosts = (infoProduct, infoTechProduct) => {
        clientInfoProduct
            .post('', {
                "nameProduct": infoProduct.NameProduct,
                "brandProduct": infoProduct.BrandProduct,
                "typeProduct": infoProduct.TypeProduct,
                "unitPriceProduct": infoProduct.UnitPriceProduct,
                "insuranceProduct": infoProduct.InsuranceProduct,
                "discountProduct": infoProduct.DiscountProduct
            })
            .then((response) => {
                setPostsInfoProduct([response.data, ...postsInfoProduct]);
            })
            .then(() => {
                addPostsTechInfo(infoProduct.TypeProduct,infoTechProduct)
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

    const addPostsTechInfo = (typeProduct, infoTechProduct) => {
        switch (typeProduct) {
            case 'cpu':
                clientTechInfoProduct
                    .post('', {
                        "coreCpu": infoTechProduct.CoreCPU,
                        "threadCpu": infoTechProduct.ThreadCPU,
                        "socketCpu": infoTechProduct.SocketCPU,
                        "architectureCpu": infoTechProduct.ArchitectureCPU,
                        "generationCpu": infoTechProduct.GenerationCPU,
                        "tdpCpu": infoTechProduct.TDPCPU,
                        "clockSpeedCpu": infoTechProduct.ClockSpeedCPU,
                        "cacheCpu": infoTechProduct.CacheCPU,
                        "onboardGraphicCpu": infoTechProduct.OnboardGraphicCPU,
                        "scopeCpu": infoTechProduct.ScopeCPU
                    })
                    .then((response) => {
                        setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                break;
            case 'mainboard':
                clientTechInfoProduct
                    .post('', {
                        "chipsetMainboard": infoTechProduct.ChipsetMainboard,
                        "socketMainboard": infoTechProduct.SocketMain,
                        "sizeMainboard": infoTechProduct.SizeMainboard,
                        "typeRamSupport": infoTechProduct.TypeRamSupport,
                        "maxSlotRam": infoTechProduct.MaxSlotRam,
                        "maxCapacityRam": infoTechProduct.MaxCapacityRam,
                        "busRamSupport": infoTechProduct.BusRamSupport,
                        "amountSlotPciMainboard": infoTechProduct.AmountSlotPCI,
                        "multiGpuSupport": infoTechProduct.MultiGPUSupport,
                        "ledMainboard": infoTechProduct.LedMainboard,
                        "audioChipset": infoTechProduct.AudioChipset,
                        "wirelessConnection": infoTechProduct.WirelessConnection,
                        "harddiskSupport": infoTechProduct.HarddiskSupport,
                        "displayOutputMainboard": infoTechProduct.DisplayOutputMainboard,
                        "otherConnectPort": infoTechProduct.otherConnectPort
                    })
                    .then((response) => {
                        setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                break;
            case 'gpu':
                clientTechInfoProduct
                    .post('', {
                        "chipsetGpu": infoTechProduct.ChipsetGPU,
                        "producerChipset": infoTechProduct.ProducerChipset,
                        "generationGpu": infoTechProduct.GenerationGPU,
                        "capacityMemoryGpu": infoTechProduct.CapacityMemoryGPU,
                        "typeMemoryGpu": infoTechProduct.TypeMemoryGPU,
                        "amountCore": infoTechProduct.AmountCore,
                        "clockSpeedGpu": infoTechProduct.ClockSpeedGPU,
                        "displayOutputGpu": infoTechProduct.DisplayOutputGPU,
                        "tdpGpu": infoTechProduct.TDPGPU,
                        "subPowerPort": infoTechProduct.SubPowerPort,
                        "typeCoolingGpu": infoTechProduct.TypeCoolingGPU,
                        "multiGpu": infoTechProduct.MultiGPU,
                        "ledGpu": infoTechProduct.LedGPU,
                        "sizeGpu": infoTechProduct.SizeGPU,
                        "scopeGpu": infoTechProduct.ScopeGPU
                    })
                    .then((response) => {
                        setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                break;
            case 'harddisk':
                switch (infoTechProduct.TypeHarddisk) {
                    case 'hdd':
                        clientTechInfoProduct
                            .post('', {
                                "typeHarddisk": infoTechProduct.TypeHarddisk,
                                "capacityHarddisk": infoTechProduct.CapacityHarddisk,
                                "typeConnectionHarddisk": infoTechProduct.TypeConnectionHarddisk,
                                "sizeHarddisk": infoTechProduct.SizeHarddisk,
                                "rotationalSpeed": infoTechProduct.RotationalSpeed,
                                "nandMemory": "",
                                "readSpeed": 0,
                                "writeSpeed": 0
                            })
                            .then((response) => {
                                setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                        break;
                    case 'ssd':
                        clientTechInfoProduct
                            .post('', {
                                "typeHarddisk": infoTechProduct.TypeHarddisk,
                                "capacityHarddisk": infoTechProduct.CapacityHarddisk,
                                "typeConnectionHarddisk": infoTechProduct.TypeConnectionHarddisk,
                                "sizeHarddisk": infoTechProduct.SizeHarddisk,
                                "rotationalSpeed": "",
                                "nandMemory": infoTechProduct.NandMemory,
                                "readSpeed": infoTechProduct.ReadSpeed,
                                "writeSpeed": infoTechProduct.WriteSpeed
                            })
                            .then((response) => {
                                setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                        break;
                    default:
                        break;
                }
                break;
            case 'ram':
                clientTechInfoProduct
                    .post('', {
                        "generationRam": infoTechProduct.GenerationRam,
                        "speedBus": infoTechProduct.SpeedBus,
                        "voltage": infoTechProduct.Voltage,
                        "delayTime": infoTechProduct.DelayTime,
                        "capacityRam": infoTechProduct.CapacityRam,
                        "ledRam": infoTechProduct.LedRam
                    })
                    .then((response) => {
                        setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                break;
            case 'casepc':
                clientTechInfoProduct
                    .post('', {
                        "typeCase": infoTechProduct.TypeCase,
                        "mainboardSupport": infoTechProduct.MainboardSupport,
                        "colorCase": infoTechProduct.ColorCase,
                        "materialCase": infoTechProduct.MaterialCase,
                        "materialSideCase": infoTechProduct.MaterialSideCase,
                        "sizeCase": infoTechProduct.SizeCase,
                        "amountHarddiskSupport": infoTechProduct.AmountHarddiskSupport,
                        "amountPortConnect": infoTechProduct.AmountPortConnect,
                        "heightCpuFan": infoTechProduct.HeightCPUFan,
                        "heightRadiator": infoTechProduct.HeightRadiator,
                        "typeFanFront": infoTechProduct.TypeFanFront,
                        "typeFanTop": infoTechProduct.TypeFanTop,
                        "typeFanBehind": infoTechProduct.TypeFanBehind,
                        "bonusFan": infoTechProduct.BonusFan,
                        "amountSlotPciCase": infoTechProduct.AmountSlotPCICase
                    })
                    .then((response) => {
                        setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                break;
            case 'psu':
                clientTechInfoProduct
                    .post('', {
                        "energyEfficiency": infoTechProduct.EnergyEfficiency,
                        "wattage": infoTechProduct.Wattage,
                        "typeSizePsu": infoTechProduct.TypeSizePSU,
                        "modularSupport": infoTechProduct.Modular_support,
                        "protectionCertificate": infoTechProduct.ProtectionCertificate,
                        "slotPower": infoTechProduct.SlotPower,
                        "ledPsu": infoTechProduct.LedPSU,
                        "typeCoolingPsu": infoTechProduct.TypeCoolingPSU
                    })
                    .then((response) => {
                        setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                break;
            case 'cooling_system':
                clientTechInfoProduct
                    .post('', {
                        "typeCoolingSystem": infoTechProduct.TypeCoolingSystem,
                        "sizeCoolingSystem": infoTechProduct.SizeCoolingSystem,
                        "supportCpuSocket": infoTechProduct.SupportCPUSocket,
                        "ledCoolingSystem": infoTechProduct.LedCoolingSystem,
                        "rotationalSpeedCoolingSystem": infoTechProduct.RotationalSpeedCoolingSystem,
                        "airFlow": infoTechProduct.AirFlow,
                        "noiseLevel": infoTechProduct.NoiseLevel
                    })
                    .then((response) => {
                        setPostsTechInfoProduct([response.data, ...postsTechInfoProduct]);
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
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end" marginBottom={2}>
                <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color4)' }}>Thêm Sản Phẩm Mới</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 5 }}>
                        Thêm Sản Phẩm Mới
                    </Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={4} >
                            <Typography variant="h6" paddingTop={2}>
                                Thông số sản phẩm:
                            </Typography>
                            <Stack direction="column" spacing={2} alignItems="center" marginBottom={2} marginTop={2}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Tên sản phẩm"
                                    size="small"
                                    onChange={(e) => { setProduct({ ...product, NameProduct: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Tên Thương hiệu"
                                    size="small"
                                    onChange={(e) => { setProduct({ ...product, BrandProduct: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <FormControl fullWidth
                                >
                                    <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        size="small"
                                        id="demo-simple-select"
                                        value={product.TypeProduct}
                                        label="Loại sản phẩm"
                                        onChange={(e) => { setProduct({ ...product, TypeProduct: e.target.value }) }}
                                        style={{ paddingBottom: 5 }}
                                    >
                                        <MenuItem value={'cpu'}>Vi xử lý</MenuItem>
                                        <MenuItem value={'mainboard'}>Bo mạch chủ</MenuItem>
                                        <MenuItem value={'gpu'}>Card đồ hoạ</MenuItem>
                                        <MenuItem value={'harddisk'}>Ổ cứng</MenuItem>
                                        <MenuItem value={'ram'}>Ram</MenuItem>
                                        <MenuItem value={'casepc'}>Case máy tính</MenuItem>
                                        <MenuItem value={'psu'}>Nguồn</MenuItem>
                                        <MenuItem value={'cooling_system'}>Tản nhiệt</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Đơn giá"
                                    size="small"
                                    onChange={(e) => { setProduct({ ...product, UnitPriceProduct: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Thời gian bảo hành"
                                    size="small"
                                    onChange={(e) => { setProduct({ ...product, InsuranceProduct: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Giảm giá"
                                    size="small"
                                    onChange={(e) => { setProduct({ ...product, DiscountProduct: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                            </Stack>
                        </Grid>
                        <Grid item xs={8} >
                            <Typography variant="h6" paddingTop={2}>
                                Thông số kỹ thuật:
                            </Typography>
                            <ProductFormAddTechInfo infoTech={infoTech} setInfoTech={setInfoTech} typeProduct={product.TypeProduct} />
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={Checkproduct}>Thêm sản phẩm</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}