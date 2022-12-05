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

    function CheckValidInfoTech(typeProduct) {
        let valid = true;
        let thongbao = "";
        switch (typeProduct) {
            case 'cpu':
                if (infoTech.CoreCPU === "" || infoTech.CoreCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố Lõi"
                }
                if (infoTech.ThreadCPU === "" || infoTech.ThreadCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố Luồng"
                }
                if (infoTech.TDPCPU === "" || infoTech.TDPCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTDP"
                }
                if (infoTech.ScopeCPU === "" || infoTech.ScopeCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố điểm"
                }
                if (infoTech.ClockSpeedCPU === "" || infoTech.ClockSpeedCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTốc độ xử lý"
                }
                if (infoTech.CacheCPU === "" || infoTech.CacheCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCache"
                }
                if (infoTech.OnboardGraphicCPU === "" || infoTech.OnboardGraphicCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCard đồ hoạ tích hợp"
                }
                if (infoTech.SocketCPU === "" || infoTech.SocketCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSocket"
                }
                if (infoTech.ArchitectureCPU === "" || infoTech.ArchitectureCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nKiến trúc"
                }
                if (infoTech.GenerationCPU === "" || infoTech.GenerationCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nThế hệ"
                }
            case 'mainboard':
                if (infoTech.ChipsetMainboard === "" || infoTech.ChipsetMainboard === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChipset"
                }
                if (infoTech.SocketMain === "" || infoTech.SocketMain === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSocket Hỗ trợ"
                }
                if (infoTech.SizeMainboard === "" || infoTech.SizeMainboard === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChuẩn kích thước"
                }
                if (infoTech.TypeRamSupport === "" || infoTech.TypeRamSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại Ram hỗ trợ"
                }
                if (infoTech.MaxSlotRam === "" || infoTech.MaxSlotRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố slot Ram hỗ trợ"
                }
                if (infoTech.MaxCapacityRam === "" || infoTech.MaxCapacityRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung lượng Ram hỗ trợ"
                }
                if (infoTech.BusRamSupport === "" || infoTech.BusRamSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTốc độ Ram hỗ trợ"
                }
                if (infoTech.AmountSlotPCI === "" || infoTech.AmountSlotPCI === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố cổng PCI"
                }
                if (infoTech.MultiGPUSupport === "" || infoTech.MultiGPUSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nHỗ trợ đa card đồ hoạ"
                }
                if (infoTech.LedMainboard === "" || infoTech.LedMainboard === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nHỗ trợ LED"
                }
                if (infoTech.AudioChipset === "" || infoTech.AudioChipset === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChipset Âm thanh"
                }
                if (infoTech.WirelessConnection === "" || infoTech.WirelessConnection === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nKết nối không dây"
                }
                if (infoTech.HarddiskSupport === "" || infoTech.HarddiskSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nỔ cứng hỗ trợ"
                }
                if (infoTech.DisplayOutputMainboard === "" || infoTech.DisplayOutputMainboard === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCổng xuất ảnh"
                }
                if (infoTech.otherConnectPort === "" || infoTech.otherConnectPort === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCác cổng khác"
                }
            case 'gpu':
                if (infoTech.ChipsetGPU === "" || infoTech.ChipsetGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChipset"
                }
                if (infoTech.ProducerChipset === "" || infoTech.ProducerChipset === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nNhà sản xuất chipset"
                }
                if (infoTech.GenerationGPU === "" || infoTech.GenerationGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nThế hệ GPU"
                }
                if (infoTech.CapacityMemoryGPU === "" || infoTech.CapacityMemoryGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung lượng bộ nhớ"
                }
                if (infoTech.TypeMemoryGPU === "" || infoTech.TypeMemoryGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại bộ nhớ"
                }
                if (infoTech.AmountCore === "" || infoTech.AmountCore === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung lượng bộ nhớ"
                }
                if (infoTech.ClockSpeedGPU === "" || infoTech.ClockSpeedGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTốc độ xử lý"
                }
                if (infoTech.DisplayOutputGPU === "" || infoTech.DisplayOutputGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCổng xuất ảnh"
                }
                if (infoTech.TDPGPU === "" || infoTech.TDPGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTDP"
                }
                if (infoTech.SubPowerPort === "" || infoTech.SubPowerPort === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nNguồn phụ"
                }
                if (infoTech.TypeCoolingGPU === "" || infoTech.TypeCoolingGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại tản nhiệt"
                }
                if (infoTech.MultiGPU === "" || infoTech.MultiGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nĐa card đồ hoạ"
                }
                if (infoTech.LedGPU === "" || infoTech.LedGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nHỗ trợ LED"
                }
                if (infoTech.SizeGPU === "" || infoTech.SizeGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChuẩn kích thước"
                }
                if (infoTech.ScopeGPU === "" || infoTech.ScopeGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nĐiểm số GPU"
                }
            case 'harddisk':
                if (infoTech.CapacityHarddisk === "" || infoTech.CapacityHarddisk === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung lượng"
                }
                if (infoTech.SizeHarddisk === "" || infoTech.SizeHarddisk === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChuẩn kích thước"
                }
                if (infoTech.TypeConnectionHarddisk === "" || infoTech.TypeConnectionHarddisk === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại kết nối"
                }
                switch (infoTech.TypeHarddisk) {
                    case 'ssd':
                        if (infoTech.NandMemory === "" || infoTech.NandMemory === undefined) {
                            valid = false;
                            thongbao = thongbao + "\nBộ nhớ NAND"
                        }
                        if (infoTech.ReadSpeed === "" || infoTech.ReadSpeed === undefined) {
                            valid = false;
                            thongbao = thongbao + "\nTốc độ đọc"
                        }
                        if (infoTech.WriteSpeed === "" || infoTech.WriteSpeed === undefined) {
                            valid = false;
                            thongbao = thongbao + "\nTốc độ ghi"
                        }
                        break;
                    case 'hdd':
                        if (infoTech.RotationalSpeed === "" || infoTech.RotationalSpeed === undefined) {
                            valid = false;
                            thongbao = thongbao + "\nTốc độ vòng quay"
                        }
                        break;
                    default:
                        break;
                }
            case 'ram':
                if (infoTech.GenerationRam === "" || infoTech.GenerationRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nThế hệ"
                }
                if (infoTech.SpeedBus === "" || infoTech.SpeedBus === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTốc độ"
                }
                if (infoTech.Voltage === "" || infoTech.Voltage === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nHiệu điện thế"
                }
                if (infoTech.DelayTime === "" || infoTech.DelayTime === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nĐộ trễ"
                }
                if (infoTech.CapacityRam === "" || infoTech.CapacityRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung lượng"
                }
                if (infoTech.LedRam === "" || infoTech.LedRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nHỗ trợ LED"
                }
                break;
            case 'casepc':
                if (infoTech.TypeCase === "" || infoTech.TypeCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại case"
                }
                if (infoTech.MainboardSupport === "" || infoTech.MainboardSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nMainboard hỗ trợ"
                }
                if (infoTech.ColorCase === "" || infoTech.ColorCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nMàu sắc"
                }
                if (infoTech.MaterialCase === "" || infoTech.MaterialCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChất liệu"
                }
                if (infoTech.MaterialSideCase === "" || infoTech.MaterialSideCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChất liệu nắp hông"
                }
                if (infoTech.sizeCase === "" || infoTech.sizeCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChuẩn kích thước"
                }
                if (infoTech.AmountHarddiskSupport === "" || infoTech.AmountHarddiskSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố ổ cứng hỗ trợ"
                }
                if (infoTech.AmountPortConnect === "" || infoTech.AmountPortConnect === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố cổng hỗ trợ"
                }
                if (infoTech.HeightCPUFan === "" || infoTech.HeightCPUFan === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nĐộ cao quạt tản CPU"
                }
                if (infoTech.HeightRadiator === "" || infoTech.HeightRadiator === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nĐộ cao Radiatior"
                }
                if (infoTech.TypeFanFront === "" || infoTech.TypeFanFront === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại quạt trước"
                }
                if (infoTech.TypeFanTop === "" || infoTech.TypeFanTop === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại quạt trên"
                }
                if (infoTech.TypeFanBehind === "" || infoTech.TypeFanBehind === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại quạt sau"
                }
                if (infoTech.BonusFan === "" || infoTech.BonusFan === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nQuạt tăng kèm"
                }
                if (infoTech.AmountSlotPCICase === "" || infoTech.AmountSlotPCICase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố slot PCI"
                }
                break;
            case 'psu':
                if (infoTech.EnergyEfficiency === "" || infoTech.EnergyEfficiency === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChuẩn hiệu suất"
                }
                if (infoTech.Wattage === "" || infoTech.Wattage === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCông suất"
                }
                if (infoTech.TypeSizePSU === "" || infoTech.TypeSizePSU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChuẩn kích thước"
                }
                if (infoTech.Modular_support === "" || infoTech.Modular_support === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nhỗ trợ mô đun"
                }
                if (infoTech.ProtectionCertificate === "" || infoTech.ProtectionCertificate === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChứng nhận bảo vệ"
                }
                if (infoTech.SlotPower === "" || infoTech.SlotPower === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSố cổng"
                }
                if (infoTech.LedPSU === "" || infoTech.LedPSU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nHỗ trợ LED"
                }
                if (infoTech.TypeCoolingPSU === "" || infoTech.TypeCoolingPSU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại tản nhiệt"
                }
                break;
            case 'cooling_system':
                if (infoTech.TypeCoolingSystem === "" || infoTech.TypeCoolingSystem === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLoại tản nhiệt"
                }
                if (infoTech.SizeCoolingSystem === "" || infoTech.SizeCoolingSystem === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChuẩn kích thước"
                }
                if (infoTech.SupportCPUSocket === "" || infoTech.SupportCPUSocket === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSocket CPU hỗ trợ"
                }
                if (infoTech.LedCoolingSystem === "" || infoTech.LedCoolingSystem === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nHỗ trợ LED"
                }
                if (infoTech.RotationalSpeedCoolingSystem === "" || infoTech.RotationalSpeedCoolingSystem === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTốc độ vòng quay"
                }
                if (infoTech.AirFlow === "" || infoTech.AirFlow === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLưu lương khí"
                }
                if (infoTech.NoiseLevel === "" || infoTech.NoiseLevel === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nĐộ ồn"
                }
                break;
            default:
                break;
        }
        if (valid) {
            return valid
        } else {
            return thongbao
        }
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

        if (validNameProduct && validBrandProduct && validTypeProduct && validUnitPriceProduct && validInsuranceProduct && validDiscountProduct && CheckValidInfoTech(product.TypeProduct) === true) {
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
            if (CheckValidInfoTech(product.TypeProduct) === true) {
                alert(thongbao);
            } else {
                alert(thongbao + CheckValidInfoTech(product.TypeProduct));
            }
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
                addPostsTechInfo(infoProduct.TypeProduct, infoTechProduct)
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
                                    type="number"
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
                                    type="number"
                                    onChange={(e) => { setProduct({ ...product, InsuranceProduct: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Giảm giá"
                                    type="number"
                                    InputProps={{ inputProps: { min: 0, max: 99 } }}
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