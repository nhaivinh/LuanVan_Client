import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'var(--color3)',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ProductManagementTechInfo({ product }) {
    switch (product.type_product) {
        case 'cpu':
            return (
                <TableBody>
                    <StyledTableRow key={1}  >
                        <StyledTableCell  >Số nhân xử lý</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.core_cpu}</StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow key={2}
                    >
                        <StyledTableCell  >Số luồng xử lý</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.thread_cpu}</StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow key={3}
                    >
                        <StyledTableCell  >Socket</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.socket_cpu}</StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow key={4}
                    >
                        <StyledTableCell  >Kiến Trúc</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.architecture_cpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={5}
                    >
                        <StyledTableCell  >Thế hệ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.generation_cpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={6}
                    >
                        <StyledTableCell  >TDP</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.tdp_cpu} W</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={7}
                    >
                        <StyledTableCell  >Tốc độ xử lý</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.clock_speed_cpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={8}
                    >
                        <StyledTableCell  >Cache</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.cache_cpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={9}
                    >
                        <StyledTableCell  >Chip đồ hoạ tích hợp</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.onboard_graphic_cpu}</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            )

        case 'mainboard':
            return (
                <TableBody>
                    <StyledTableRow key={1}
                    >
                        <StyledTableCell  >Chipset</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.chipset_mainboard}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={2}
                    >
                        <StyledTableCell  >Socket</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.socket_mainboard}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={3}
                    >
                        <StyledTableCell  >Kích thước</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.size_mainboard}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={4}
                    >
                        <StyledTableCell  >Kiểu RAM hỗ trợ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_ram_support}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={5}
                    >
                        <StyledTableCell  >Bus RAM hỗ trợ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_ram_support}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={6}
                    >
                        <StyledTableCell  >Số khe Ram hỗ trợ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.max_slot_ram}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={7}
                    >
                        <StyledTableCell  >Hỗ trợ bộ nhớ tối đa</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.max_capacity_ram}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={8}
                    >
                        <StyledTableCell  >Bus RAM hỗ trợ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.bus_ram_support}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={9}
                    >
                        <StyledTableCell  >Các kết nối PCI</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.amount_slot_pci_mainboard}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={10}
                    >
                        <StyledTableCell  >Hỗ trợ đa card đồ hoạ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.multi_gpu_support}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={11}
                    >
                        <StyledTableCell  >Đèn led</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.led_mainboard}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={12}
                    >
                        <StyledTableCell  >Chip xử lý âm thanh</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.audio_chipset}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={13}
                    >
                        <StyledTableCell  >Hỗ trợ kết nối không dây</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.wireless_connection}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={14}
                    >
                        <StyledTableCell  >Các kết nối lưu trữ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.harddisk_support}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={15}
                    >
                        <StyledTableCell  >Các cổng xuất hình ảnh</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.display_output_mainboard}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={16}
                    >
                        <StyledTableCell  >Các kết nối khác</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.other_connect_port}</StyledTableCell>
                    </StyledTableRow>

                </TableBody>
            )
        case 'ram':
            return (
                <TableBody>
                    <StyledTableRow key={1}
                    >
                        <StyledTableCell  >Thế hệ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.generation_ram}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={2}
                    >
                        <StyledTableCell  >Dung lượng</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.capacity_ram}GB</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={3}
                    >
                        <StyledTableCell  >Bus</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.speed_bus}Mhz</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={4}
                    >
                        <StyledTableCell  >Voltage</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.voltage} V</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={5}
                    >
                        <StyledTableCell  >Timing</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.delay_time}ms</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={6}
                    >
                        <StyledTableCell  >Hỗ trợ led</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.led_ram}</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            )
        case 'gpu':
            return (
                <TableBody>
                    <StyledTableRow key={1}
                    >
                        <StyledTableCell  >Chipset</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.chipset_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={2}
                    >
                        <StyledTableCell  >Nhà sản xuất chipset</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.producer_chipset}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={3}
                    >
                        <StyledTableCell  >Thế hệ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.generation_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={4}
                    >
                        <StyledTableCell  >Dung lượng bộ nhớ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.capacity_memory_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={5}
                    >
                        <StyledTableCell  >Loại bộ nhớ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_memory_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={6}
                    >
                        <StyledTableCell  >Số nhân xử lý</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.amount_core}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={7}
                    >
                        <StyledTableCell  >Tốc độ xử lý</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.clock_speed_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={8}
                    >
                        <StyledTableCell  >Cổng xuất hình ảnh</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.display_output_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={9}
                    >
                        <StyledTableCell  >TDP</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.tdp_gpu} W</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={10}
                    >
                        <StyledTableCell  >Yêu cầu nguồn phụ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.sub_power_port}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={11}
                    >
                        <StyledTableCell  >Loại tản nhiệt</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_cooling_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={12}
                    >
                        <StyledTableCell  >Hỗ trợ đa card đồ hoạ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.multi_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={13}
                    >
                        <StyledTableCell  >Hỗ trợ led</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.led_gpu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={14}
                    >
                        <StyledTableCell  >Kích thước</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.size_gpu}</StyledTableCell>
                    </StyledTableRow>

                </TableBody>
            )
        case 'psu':
            return (
                <TableBody>
                    <StyledTableRow key={1}
                    >
                        <StyledTableCell  >Chuẩn kích thước</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_size_psu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={2}
                    >
                        <StyledTableCell  >Công suất</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.wattage} W</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={3}
                    >
                        <StyledTableCell  >Chuẩn hiệu suất</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.energy_efficiency}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={4}
                    >
                        <StyledTableCell  >Hỗ trợ kết nối module</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.modular_support}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={5}
                    >
                        <StyledTableCell  >Chứng nhận bảo vệ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.protection_certificate}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={6}
                    >
                        <StyledTableCell  >Số cổng cắm</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.slot_power}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={7}
                    >
                        <StyledTableCell  >Hỗ trợ led</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.led_psu}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={8}
                    >
                        <StyledTableCell  >Loại tản nhiệt</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_cooling_psu}</StyledTableCell>
                    </StyledTableRow>

                </TableBody>
            )
        case 'casepc':
            return (
                <TableBody>
                    <StyledTableRow key={1}
                    >
                        <StyledTableCell  >Chuẩn kích thước</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_case}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={2}
                    >
                        <StyledTableCell  >Hỗ trợ chuẩn bo mạch chủ</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.mainboard_support}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={3}
                    >
                        <StyledTableCell  >Màu sắc</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.color_case}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={4}
                    >
                        <StyledTableCell  >Chất liệu</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.material_case}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={5}
                    >
                        <StyledTableCell  >Chất liệu nắp hong</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.material_side_case}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={6}
                    >
                        <StyledTableCell  >Kích thước</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.size_case}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={7}
                    >
                        <StyledTableCell  >Hỗ trợ ổ cứng</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.amount_harddisk_support}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={8}
                    >
                        <StyledTableCell  >Hỗ trợ các kết nối</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.amount_port_connect}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={9}
                    >
                        <StyledTableCell  >Độ cao quạt vi xử lý</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.height_cpu_fan}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={10}
                    >
                        <StyledTableCell  >Độ cao radiator</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.height_radiator}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={11}
                    >
                        <StyledTableCell  >Loại quạt mặt trước</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_fan_front}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={12}
                    >
                        <StyledTableCell  >Loại quạt mặt trên</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_fan_top}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={13}
                    >
                        <StyledTableCell  >Loại quạt mặt sau</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_fan_behind}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={14}
                    >
                        <StyledTableCell  >Quạt tặng kèm</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.bonus_fan}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={15}
                    >
                        <StyledTableCell  >Số khe pci</StyledTableCell>
                        <StyledTableCell align="left" style={{ width: '60%' }}>{product.amount_slot_pci_case}</StyledTableCell>
                    </StyledTableRow>

                </TableBody>
            )
        case 'harddisk':
            switch (product.type_harddisk) {
                case 'HDD':
                    return (
                        <TableBody>
                            <StyledTableRow key={1}
                            >
                                <StyledTableCell  >Loại ổ cứng</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_harddisk}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={2}
                            >
                                <StyledTableCell  >Dung lượng</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{product.capacity_harddisk}</StyledTableCell>
                            </StyledTableRow>
                                <StyledTableRow key={3}
                                >
                                    <StyledTableCell  >Loại kết nối</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_connection_harddisk}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow key={4}
                                >
                                    <StyledTableCell  >Kích thước</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.size_harddisk}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow key={5}
                                >
                                    <StyledTableCell  >Tốc độ vòng quay</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.rotational_speed_hdd}</StyledTableCell>
                                </StyledTableRow>
                                 
                        </TableBody>
                    )
                case 'SSD':
                    return (
                        <TableBody>
                                <StyledTableRow key={1}
                                >
                                    <StyledTableCell  >Loại ổ cứng</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_harddisk}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow key={2}
                                >
                                    <StyledTableCell  >Dung lượng</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.capacity_harddisk}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow key={3}
                                >
                                    <StyledTableCell  >Loại kết nối</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_connection_harddisk}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow key={4}
                                >
                                    <StyledTableCell  >Kích thước</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.size_harddisk}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow key={5}
                                >
                                    <StyledTableCell  >Bộ nhớ NAND</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.nand_memory}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow key={6}
                                >
                                    <StyledTableCell  >Tốc độ đọc</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.read_speed}mb/s</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow key={7}
                                >
                                    <StyledTableCell  >Tốc độ ghi</StyledTableCell>
                                    <StyledTableCell align="left" style={{ width: '60%' }}>{product.write_speed}mb/s</StyledTableCell>
                                </StyledTableRow>
                                 
                        </TableBody>
                    )
                default:
                    break;
            }
        case 'cooling_system':
            return (
                <TableBody>
                        <StyledTableRow key={1}
                        >
                            <StyledTableCell  >Loại tản nhiệt</StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '60%' }}>{product.type_cooling_system}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow key={2}
                        >
                            <StyledTableCell  >Kích thước</StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '60%' }}>{product.size_cooling_system}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow key={3}
                        >
                            <StyledTableCell  >Socket hỗ trợ</StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '60%' }}>{product.support_cpu_socket}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow key={4}
                        >
                            <StyledTableCell  >Hỗ trợ led</StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '60%' }}>{product.led_cooling_system}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow key={5}
                        >
                            <StyledTableCell  >Tốc độ quay</StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '60%' }}>{product.rotational_speed_cooling_system}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow key={6}
                        >
                            <StyledTableCell  >Lưu lượng gió</StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '60%' }}>{product.air_flow}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow key={7}
                        >
                            <StyledTableCell  >Độ ồn</StyledTableCell>
                            <StyledTableCell align="left" style={{ width: '60%' }}>{product.noise_level}</StyledTableCell>
                        </StyledTableRow>
 
                </TableBody>
            )
        default:
            break;
    }
}