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
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import ProductFormEditTechInfo from './ProductFormEditTechInfo';
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

export default function ProductManagementFormEdit({ IDProduct }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const clientInfoProduct = axios.create({
        baseURL: "https://localhost:7253/api/Product"
    });

    let clientTechInfoProduct

    const [, dispatch] = React.useContext(SnackBarContext);

    const [postsInfoProduct, setPostsInfoProduct] = React.useState([]);

    const [postsTechInfoProduct, setPostsTechInfoProduct] = React.useState([]);

    const [product, setProduct] = React.useState({});

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product/getproductbyid/` + IDProduct)
            .then(res => {
                const Product = res.data;
                setProduct(Product[0]);
            })
    }, [IDProduct])

    const Checkproduct = () => {
        let thongbao = "Hãy thêm thông tin đúng dạng cho :";
        let validNameProduct = false;
        let validBrandProduct = false;
        let validTypeProduct = false;
        let validUnitPriceProduct = false;
        let validInsuranceProduct = false;
        let validDiscountProduct = false;

        if (product.name_product === "") {
            thongbao = thongbao + "\nTên sản phẩm"
        } else validNameProduct = true

        if (product.brand_product === "") {
            thongbao = thongbao + "\nThương hiệu"
        } else validBrandProduct = true

        if (product.type_product === "") {
            thongbao = thongbao + "\nLoại sản phẩm"
        } else validTypeProduct = true

        if (product.unit_price_product === 0) {
            thongbao = thongbao + "\nĐơn giá"
        } else validUnitPriceProduct = true

        if (product.insurance_product === 0) {
            thongbao = thongbao + "\nBảo hành"
        } else validInsuranceProduct = true

        if (product.discount_product === "") {
            thongbao = thongbao + "\nGiảm giá"
        } else validDiscountProduct = true

        if (validNameProduct && validBrandProduct && validTypeProduct && validUnitPriceProduct && validInsuranceProduct && validDiscountProduct) {
            switch (product.type_product) {
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

            addPosts(product);
        } else {
            alert(thongbao);
        }
    }

    const addPosts = (infoProduct) => {
        clientInfoProduct
            .put('', {
                "idProduct": infoProduct.id_product,
                "nameProduct": infoProduct.name_product,
                "brandProduct": infoProduct.brand_product,
                "typeProduct": infoProduct.type_product,
                "unitPriceProduct": infoProduct.unit_price_product,
                "insuranceProduct": infoProduct.insurance_product,
                "discountProduct": infoProduct.discount_product
            })
            .then((response) => {
                setPostsInfoProduct([response.data, ...postsInfoProduct]);
                // if (response.data.severity == "warning") {
                //     dispatch(setOpenSnackBar());
                //     dispatch(setMessage(response.data.message));
                //     dispatch(setSeverity(response.data.severity));
                // }
            })
            .then(() => {
                addPostsTechInfo(infoProduct.type_product, infoProduct)
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
                    .put('', {
                        "idProduct": infoTechProduct.id_product,
                        "coreCpu": infoTechProduct.core_cpu,
                        "threadCpu": infoTechProduct.thread_cpu,
                        "socketCpu": infoTechProduct.socket_cpu,
                        "architectureCpu": infoTechProduct.architecture_cpu,
                        "generationCpu": infoTechProduct.generation_cpu,
                        "tdpCpu": infoTechProduct.tdp_cpu,
                        "clockSpeedCpu": infoTechProduct.clock_speed_cpu,
                        "cacheCpu": infoTechProduct.cache_cpu,
                        "onboardGraphicCpu": infoTechProduct.onboard_graphic_cpu,
                        "scopeCpu": infoTechProduct.scope_cpu
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
                    .put('', {
                        "idProduct": infoTechProduct.id_product,
                        "chipsetMainboard": infoTechProduct.chipset_mainboard,
                        "socketMainboard": infoTechProduct.socket_mainboard,
                        "sizeMainboard": infoTechProduct.size_mainboard,
                        "typeRamSupport": infoTechProduct.type_ram_support,
                        "maxSlotRam": infoTechProduct.max_slot_ram,
                        "maxCapacityRam": infoTechProduct.max_capacity_ram,
                        "busRamSupport": infoTechProduct.bus_ram_support,
                        "amountSlotPciMainboard": infoTechProduct.amount_slot_pci_mainboard,
                        "multiGpuSupport": infoTechProduct.multi_gpu_support,
                        "ledMainboard": infoTechProduct.led_mainboard,
                        "audioChipset": infoTechProduct.audio_chipset,
                        "wirelessConnection": infoTechProduct.wireless_connection,
                        "harddiskSupport": infoTechProduct.harddisk_support,
                        "displayOutputMainboard": infoTechProduct.display_output_mainboard,
                        "otherConnectPort": infoTechProduct.other_connect_port
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
                    .put('', {
                        "idProduct": infoTechProduct.id_product,
                        "chipsetGpu": infoTechProduct.chipset_gpu,
                        "producerChipset": infoTechProduct.producer_chipset,
                        "generationGpu": infoTechProduct.generation_gpu,
                        "capacityMemoryGpu": infoTechProduct.capacity_memory_gpu,
                        "typeMemoryGpu": infoTechProduct.type_memory_gpu,
                        "amountCore": infoTechProduct.amount_core,
                        "clockSpeedGpu": infoTechProduct.clock_speed_gpu,
                        "displayOutputGpu": infoTechProduct.display_output_gpu,
                        "tdpGpu": infoTechProduct.tdp_gpu,
                        "subPowerPort": infoTechProduct.sub_power_port,
                        "typeCoolingGpu": infoTechProduct.type_cooling_gpu,
                        "multiGpu": infoTechProduct.multi_gpu,
                        "ledGpu": infoTechProduct.led_gpu,
                        "sizeGpu": infoTechProduct.size_gpu,
                        "scopeGpu": infoTechProduct.scope_gpu
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
                            .put('', {
                                "idProduct": infoTechProduct.id_product,
                                "typeHarddisk": infoTechProduct.type_harddisk,
                                "capacityHarddisk": infoTechProduct.capacity_harddisk,
                                "typeConnectionHarddisk": infoTechProduct.type_connection_harddisk,
                                "sizeHarddisk": infoTechProduct.size_harddisk,
                                "rotationalSpeed": infoTechProduct.rotational_speed_hdd,
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
                            .put('', {
                                "idProduct": infoTechProduct.id_product,
                                "typeHarddisk": infoTechProduct.type_harddisk,
                                "capacityHarddisk": infoTechProduct.capacity_harddisk,
                                "typeConnectionHarddisk": infoTechProduct.type_connection_harddisk,
                                "sizeHarddisk": infoTechProduct.size_harddisk,
                                "rotationalSpeed": "",
                                "nandMemory": infoTechProduct.nand_memory,
                                "readSpeed": infoTechProduct.read_speed,
                                "writeSpeed": infoTechProduct.write_speed
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
                    .put('', {
                        "idProduct": infoTechProduct.id_product,
                        "generationRam": infoTechProduct.generation_ram,
                        "speedBus": infoTechProduct.speed_bus,
                        "voltage": infoTechProduct.voltage,
                        "delayTime": infoTechProduct.delay_time,
                        "capacityRam": infoTechProduct.capacity_ram,
                        "ledRam": infoTechProduct.led_ram
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
                    .put('', {
                        "idProduct": infoTechProduct.id_product,
                        "typeCase": infoTechProduct.type_case,
                        "mainboardSupport": infoTechProduct.mainboard_support,
                        "colorCase": infoTechProduct.color_case,
                        "materialCase": infoTechProduct.material_case,
                        "materialSideCase": infoTechProduct.material_side_case,
                        "sizeCase": infoTechProduct.size_case,
                        "amountHarddiskSupport": infoTechProduct.amount_harddisk_support,
                        "amountPortConnect": infoTechProduct.amount_port_connect,
                        "heightCpuFan": infoTechProduct.height_cpu_fan,
                        "heightRadiator": infoTechProduct.height_radiator,
                        "typeFanFront": infoTechProduct.type_fan_front,
                        "typeFanTop": infoTechProduct.type_fan_top,
                        "typeFanBehind": infoTechProduct.type_fan_behind,
                        "bonusFan": infoTechProduct.bonus_fan,
                        "amountSlotPciCase": infoTechProduct.amount_slot_pci_case
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
                    .put('', {
                        "idProduct": infoTechProduct.id_product,
                        "energyEfficiency": infoTechProduct.energy_efficiency,
                        "wattage": infoTechProduct.wattage,
                        "typeSizePsu": infoTechProduct.type_size_psu,
                        "modularSupport": infoTechProduct.modular_support,
                        "protectionCertificate": infoTechProduct.protection_certificate,
                        "slotPower": infoTechProduct.slot_power,
                        "ledPsu": infoTechProduct.led_psu,
                        "typeCoolingPsu": infoTechProduct.type_cooling_psu
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
                    .put('', {
                        "idProduct": infoTechProduct.id_product,
                        "typeCoolingSystem": infoTechProduct.type_cooling_system,
                        "sizeCoolingSystem": infoTechProduct.size_cooling_system,
                        "supportCpuSocket": infoTechProduct.support_cpu_socket,
                        "ledCoolingSystem": infoTechProduct.led_cooling_system,
                        "rotationalSpeedCoolingSystem": infoTechProduct.rotational_speed_cooling_system,
                        "airFlow": infoTechProduct.air_flow,
                        "noiseLevel": infoTechProduct.noise_level
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
            <IconButton onClick={handleOpen} variant="text" color="warning">
                <Tooltip title="Xem Chi Tiết">
                    <EditIcon
                        sx={{ color: 'var(--color8)' }}
                    />
                </Tooltip>
            </IconButton>
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
                                    defaultValue={product.name_product}
                                    onChange={(e) => { setProduct({ ...product, name_product: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Tên Thương hiệu"
                                    size="small"
                                    defaultValue={product.brand_product}
                                    onChange={(e) => { setProduct({ ...product, brand_product: e.target.value }) }}
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
                                        value={product.type_product}
                                        label="Loại sản phẩm"
                                        disabled
                                        onChange={(e) => { setProduct({ ...product, type_product: e.target.value }) }}
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
                                    defaultValue={product.unit_price_product}
                                    onChange={(e) => { setProduct({ ...product, unit_price_product: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Thời gian bảo hành"
                                    size="small"
                                    defaultValue={product.insurance_product}
                                    onChange={(e) => { setProduct({ ...product, insurance_product: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Giảm giá"
                                    size="small"
                                    defaultValue={product.discount_product}
                                    onChange={(e) => { setProduct({ ...product, discount_product: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                            </Stack>
                        </Grid>
                        <Grid item xs={8} >
                            <Typography variant="h6" paddingTop={2}>
                                Thông số kỹ thuật:
                            </Typography>
                            <ProductFormEditTechInfo product={product} setProduct={setProduct} typeProduct={product.type_product} />
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={Checkproduct}>Lưu chỉnh sửa</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}