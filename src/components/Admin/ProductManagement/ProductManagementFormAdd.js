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
                    thongbao = thongbao + "\nS??? L??i"
                }
                if (infoTech.ThreadCPU === "" || infoTech.ThreadCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nS??? Lu???ng"
                }
                if (infoTech.TDPCPU === "" || infoTech.TDPCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTDP"
                }
                if (infoTech.ScopeCPU === "" || infoTech.ScopeCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nS??? ??i???m"
                }
                if (infoTech.ClockSpeedCPU === "" || infoTech.ClockSpeedCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nT???c ????? x??? l??"
                }
                if (infoTech.CacheCPU === "" || infoTech.CacheCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCache"
                }
                if (infoTech.OnboardGraphicCPU === "" || infoTech.OnboardGraphicCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCard ????? ho??? t??ch h???p"
                }
                if (infoTech.SocketCPU === "" || infoTech.SocketCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSocket"
                }
                if (infoTech.ArchitectureCPU === "" || infoTech.ArchitectureCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nKi???n tr??c"
                }
                if (infoTech.GenerationCPU === "" || infoTech.GenerationCPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTh??? h???"
                }
            case 'mainboard':
                if (infoTech.ChipsetMainboard === "" || infoTech.ChipsetMainboard === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChipset"
                }
                if (infoTech.SocketMain === "" || infoTech.SocketMain === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSocket H??? tr???"
                }
                if (infoTech.SizeMainboard === "" || infoTech.SizeMainboard === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChu???n k??ch th?????c"
                }
                if (infoTech.TypeRamSupport === "" || infoTech.TypeRamSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i Ram h??? tr???"
                }
                if (infoTech.MaxSlotRam === "" || infoTech.MaxSlotRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nS??? slot Ram h??? tr???"
                }
                if (infoTech.MaxCapacityRam === "" || infoTech.MaxCapacityRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung l?????ng Ram h??? tr???"
                }
                if (infoTech.BusRamSupport === "" || infoTech.BusRamSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nT???c ????? Ram h??? tr???"
                }
                if (infoTech.AmountSlotPCI === "" || infoTech.AmountSlotPCI === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nS??? c???ng PCI"
                }
                if (infoTech.MultiGPUSupport === "" || infoTech.MultiGPUSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nH??? tr??? ??a card ????? ho???"
                }
                if (infoTech.LedMainboard === "" || infoTech.LedMainboard === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nH??? tr??? LED"
                }
                if (infoTech.AudioChipset === "" || infoTech.AudioChipset === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChipset ??m thanh"
                }
                if (infoTech.WirelessConnection === "" || infoTech.WirelessConnection === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nK???t n???i kh??ng d??y"
                }
                if (infoTech.HarddiskSupport === "" || infoTech.HarddiskSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\n??? c???ng h??? tr???"
                }
                if (infoTech.DisplayOutputMainboard === "" || infoTech.DisplayOutputMainboard === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nC???ng xu???t ???nh"
                }
                if (infoTech.otherConnectPort === "" || infoTech.otherConnectPort === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nC??c c???ng kh??c"
                }
            case 'gpu':
                if (infoTech.ChipsetGPU === "" || infoTech.ChipsetGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChipset"
                }
                if (infoTech.ProducerChipset === "" || infoTech.ProducerChipset === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nNh?? s???n xu???t chipset"
                }
                if (infoTech.GenerationGPU === "" || infoTech.GenerationGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTh??? h??? GPU"
                }
                if (infoTech.CapacityMemoryGPU === "" || infoTech.CapacityMemoryGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung l?????ng b??? nh???"
                }
                if (infoTech.TypeMemoryGPU === "" || infoTech.TypeMemoryGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i b??? nh???"
                }
                if (infoTech.AmountCore === "" || infoTech.AmountCore === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung l?????ng b??? nh???"
                }
                if (infoTech.ClockSpeedGPU === "" || infoTech.ClockSpeedGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nT???c ????? x??? l??"
                }
                if (infoTech.DisplayOutputGPU === "" || infoTech.DisplayOutputGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nC???ng xu???t ???nh"
                }
                if (infoTech.TDPGPU === "" || infoTech.TDPGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTDP"
                }
                if (infoTech.SubPowerPort === "" || infoTech.SubPowerPort === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nNgu???n ph???"
                }
                if (infoTech.TypeCoolingGPU === "" || infoTech.TypeCoolingGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i t???n nhi???t"
                }
                if (infoTech.MultiGPU === "" || infoTech.MultiGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\n??a card ????? ho???"
                }
                if (infoTech.LedGPU === "" || infoTech.LedGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nH??? tr??? LED"
                }
                if (infoTech.SizeGPU === "" || infoTech.SizeGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChu???n k??ch th?????c"
                }
                if (infoTech.ScopeGPU === "" || infoTech.ScopeGPU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\n??i???m s??? GPU"
                }
            case 'harddisk':
                if (infoTech.CapacityHarddisk === "" || infoTech.CapacityHarddisk === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung l?????ng"
                }
                if (infoTech.SizeHarddisk === "" || infoTech.SizeHarddisk === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChu???n k??ch th?????c"
                }
                if (infoTech.TypeConnectionHarddisk === "" || infoTech.TypeConnectionHarddisk === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i k???t n???i"
                }
                switch (infoTech.TypeHarddisk) {
                    case 'ssd':
                        if (infoTech.NandMemory === "" || infoTech.NandMemory === undefined) {
                            valid = false;
                            thongbao = thongbao + "\nB??? nh??? NAND"
                        }
                        if (infoTech.ReadSpeed === "" || infoTech.ReadSpeed === undefined) {
                            valid = false;
                            thongbao = thongbao + "\nT???c ????? ?????c"
                        }
                        if (infoTech.WriteSpeed === "" || infoTech.WriteSpeed === undefined) {
                            valid = false;
                            thongbao = thongbao + "\nT???c ????? ghi"
                        }
                        break;
                    case 'hdd':
                        if (infoTech.RotationalSpeed === "" || infoTech.RotationalSpeed === undefined) {
                            valid = false;
                            thongbao = thongbao + "\nT???c ????? v??ng quay"
                        }
                        break;
                    default:
                        break;
                }
            case 'ram':
                if (infoTech.GenerationRam === "" || infoTech.GenerationRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nTh??? h???"
                }
                if (infoTech.SpeedBus === "" || infoTech.SpeedBus === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nT???c ?????"
                }
                if (infoTech.Voltage === "" || infoTech.Voltage === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nHi???u ??i???n th???"
                }
                if (infoTech.DelayTime === "" || infoTech.DelayTime === undefined) {
                    valid = false;
                    thongbao = thongbao + "\n????? tr???"
                }
                if (infoTech.CapacityRam === "" || infoTech.CapacityRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nDung l?????ng"
                }
                if (infoTech.LedRam === "" || infoTech.LedRam === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nH??? tr??? LED"
                }
                break;
            case 'casepc':
                if (infoTech.TypeCase === "" || infoTech.TypeCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i case"
                }
                if (infoTech.MainboardSupport === "" || infoTech.MainboardSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nMainboard h??? tr???"
                }
                if (infoTech.ColorCase === "" || infoTech.ColorCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nM??u s???c"
                }
                if (infoTech.MaterialCase === "" || infoTech.MaterialCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCh???t li???u"
                }
                if (infoTech.MaterialSideCase === "" || infoTech.MaterialSideCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCh???t li???u n???p h??ng"
                }
                if (infoTech.sizeCase === "" || infoTech.sizeCase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChu???n k??ch th?????c"
                }
                if (infoTech.AmountHarddiskSupport === "" || infoTech.AmountHarddiskSupport === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nS??? ??? c???ng h??? tr???"
                }
                if (infoTech.AmountPortConnect === "" || infoTech.AmountPortConnect === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nS??? c???ng h??? tr???"
                }
                if (infoTech.HeightCPUFan === "" || infoTech.HeightCPUFan === undefined) {
                    valid = false;
                    thongbao = thongbao + "\n????? cao qu???t t???n CPU"
                }
                if (infoTech.HeightRadiator === "" || infoTech.HeightRadiator === undefined) {
                    valid = false;
                    thongbao = thongbao + "\n????? cao Radiatior"
                }
                if (infoTech.TypeFanFront === "" || infoTech.TypeFanFront === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i qu???t tr?????c"
                }
                if (infoTech.TypeFanTop === "" || infoTech.TypeFanTop === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i qu???t tr??n"
                }
                if (infoTech.TypeFanBehind === "" || infoTech.TypeFanBehind === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i qu???t sau"
                }
                if (infoTech.BonusFan === "" || infoTech.BonusFan === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nQu???t t??ng k??m"
                }
                if (infoTech.AmountSlotPCICase === "" || infoTech.AmountSlotPCICase === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nS??? slot PCI"
                }
                break;
            case 'psu':
                if (infoTech.EnergyEfficiency === "" || infoTech.EnergyEfficiency === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChu???n hi???u su???t"
                }
                if (infoTech.Wattage === "" || infoTech.Wattage === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nC??ng su???t"
                }
                if (infoTech.TypeSizePSU === "" || infoTech.TypeSizePSU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChu???n k??ch th?????c"
                }
                if (infoTech.Modular_support === "" || infoTech.Modular_support === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nh??? tr??? m?? ??un"
                }
                if (infoTech.ProtectionCertificate === "" || infoTech.ProtectionCertificate === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nCh???ng nh???n b???o v???"
                }
                if (infoTech.SlotPower === "" || infoTech.SlotPower === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nS??? c???ng"
                }
                if (infoTech.LedPSU === "" || infoTech.LedPSU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nH??? tr??? LED"
                }
                if (infoTech.TypeCoolingPSU === "" || infoTech.TypeCoolingPSU === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i t???n nhi???t"
                }
                break;
            case 'cooling_system':
                if (infoTech.TypeCoolingSystem === "" || infoTech.TypeCoolingSystem === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nLo???i t???n nhi???t"
                }
                if (infoTech.SizeCoolingSystem === "" || infoTech.SizeCoolingSystem === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nChu???n k??ch th?????c"
                }
                if (infoTech.SupportCPUSocket === "" || infoTech.SupportCPUSocket === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nSocket CPU h??? tr???"
                }
                if (infoTech.LedCoolingSystem === "" || infoTech.LedCoolingSystem === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nH??? tr??? LED"
                }
                if (infoTech.RotationalSpeedCoolingSystem === "" || infoTech.RotationalSpeedCoolingSystem === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nT???c ????? v??ng quay"
                }
                if (infoTech.AirFlow === "" || infoTech.AirFlow === undefined) {
                    valid = false;
                    thongbao = thongbao + "\nL??u l????ng kh??"
                }
                if (infoTech.NoiseLevel === "" || infoTech.NoiseLevel === undefined) {
                    valid = false;
                    thongbao = thongbao + "\n????? ???n"
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
        let thongbao = "H??y th??m th??ng tin ????ng d???ng cho :";
        let validNameProduct = false;
        let validBrandProduct = false;
        let validTypeProduct = false;
        let validUnitPriceProduct = false;
        let validInsuranceProduct = false;
        let validDiscountProduct = false;

        if (product.NameProduct === "") {
            thongbao = thongbao + "\nT??n s???n ph???m"
        } else validNameProduct = true

        if (product.BrandProduct === "") {
            thongbao = thongbao + "\nTh????ng hi???u"
        } else validBrandProduct = true

        if (product.TypeProduct === "") {
            thongbao = thongbao + "\nLo???i s???n ph???m"
        } else validTypeProduct = true

        if (product.UnitPriceProduct === 0) {
            thongbao = thongbao + "\n????n gi??"
        } else validUnitPriceProduct = true

        if (product.InsuranceProduct === 0) {
            thongbao = thongbao + "\nB???o h??nh"
        } else validInsuranceProduct = true

        if (product.DiscountProduct === 0) {
            thongbao = thongbao + "\nGi???m gi??"
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
                <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color4)' }}>Th??m S???n Ph???m M???i</Button>
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
                        Th??m S???n Ph???m M???i
                    </Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={4} >
                            <Typography variant="h6" paddingTop={2}>
                                Th??ng s??? s???n ph???m:
                            </Typography>
                            <Stack direction="column" spacing={2} alignItems="center" marginBottom={2} marginTop={2}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="T??n s???n ph???m"
                                    size="small"
                                    onChange={(e) => { setProduct({ ...product, NameProduct: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="T??n Th????ng hi???u"
                                    size="small"
                                    onChange={(e) => { setProduct({ ...product, BrandProduct: e.target.value }) }}
                                    style={{ paddingBottom: 5 }}
                                >
                                </TextField>
                                <FormControl fullWidth
                                >
                                    <InputLabel id="demo-simple-select-label">Lo???i s???n ph???m</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        size="small"
                                        id="demo-simple-select"
                                        value={product.TypeProduct}
                                        label="Lo???i s???n ph???m"
                                        onChange={(e) => { setProduct({ ...product, TypeProduct: e.target.value }) }}
                                        style={{ paddingBottom: 5 }}
                                    >
                                        <MenuItem value={'cpu'}>Vi x??? l??</MenuItem>
                                        <MenuItem value={'mainboard'}>Bo m???ch ch???</MenuItem>
                                        <MenuItem value={'gpu'}>Card ????? ho???</MenuItem>
                                        <MenuItem value={'harddisk'}>??? c???ng</MenuItem>
                                        <MenuItem value={'ram'}>Ram</MenuItem>
                                        <MenuItem value={'casepc'}>Case m??y t??nh</MenuItem>
                                        <MenuItem value={'psu'}>Ngu???n</MenuItem>
                                        <MenuItem value={'cooling_system'}>T???n nhi???t</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="????n gi??"
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
                                    label="Th???i gian b???o h??nh"
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
                                    label="Gi???m gi??"
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
                                Th??ng s??? k??? thu???t:
                            </Typography>
                            <ProductFormAddTechInfo infoTech={infoTech} setInfoTech={setInfoTech} typeProduct={product.TypeProduct} />
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={Checkproduct}>Th??m s???n ph???m</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}