
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

// Table Style
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

function ShowTechInfo({ ImportProduct }) {
    if (ImportProduct[0] !== undefined) {
        switch (ImportProduct[0].type_product) {
            case 'cpu':
                return (
                    <TableBody>
                        {ImportProduct[0].core_cpu !== '' ?
                            <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Số nhân xử lý</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].core_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].thread_cpu !== '' ?
                            <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Số luồng xử lý</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].thread_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].socket_cpu !== '' ?
                            <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Socket</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].socket_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].architecture_cpu !== '' ?
                            <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Kiến Trúc</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].architecture_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].generation_cpu !== '' ?
                            <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Thế hệ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].generation_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].tdp_cpu !== '' ?
                            <StyledTableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>TDP</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].tdp_cpu} W</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].clock_speed_cpu !== '' ?
                            <StyledTableRow key={7} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Tốc độ xử lý</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].clock_speed_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].cache_cpu !== '' ?
                            <StyledTableRow key={8} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Cache</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].cache_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].onboard_graphic_cpu !== '' ?
                            <StyledTableRow key={9} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chip đồ hoạ tích hợp</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].onboard_graphic_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                    </TableBody>
                )

            case 'mainboard':
                return (
                    <TableBody>
                        {ImportProduct[0].chipset_mainboard !== '' ?
                            <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chipset</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].chipset_mainboard}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].socket_mainboard !== '' ?
                            <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Socket</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].socket_mainboard}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].size_mainboard !== '' ?
                            <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Kích thước</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].size_mainboard}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].type_ram_support !== '' ?
                            <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Kiểu RAM hỗ trợ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_ram_support}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].type_ram_support !== '' ?
                            <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Bus RAM hỗ trợ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_ram_support}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].max_slot_ram !== '' ?
                            <StyledTableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Số khe Ram hỗ trợ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].max_slot_ram}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].max_capacity_ram !== '' ?
                            <StyledTableRow key={7} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ bộ nhớ tối đa</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].max_capacity_ram}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].bus_ram_support !== '' ?
                            <StyledTableRow key={8} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Bus RAM hỗ trợ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].bus_ram_support}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].amount_slot_pci_mainboard !== '' ?
                            <StyledTableRow key={9} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Các kết nối PCI</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].amount_slot_pci_mainboard}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].multi_gpu_support !== '' ?
                            <StyledTableRow key={10} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ đa card đồ hoạ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].multi_gpu_support}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].led_mainboard !== '' ?
                            <StyledTableRow key={11} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Đèn led</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].led_mainboard}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].audio_chipset !== '' ?
                            <StyledTableRow key={12} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chip xử lý âm thanh</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].audio_chipset}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].wireless_connection !== '' ?
                            <StyledTableRow key={13} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ kết nối không dây</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].wireless_connection}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].harddisk_support !== '' ?
                            <StyledTableRow key={14} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Các kết nối lưu trữ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].harddisk_support}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].display_output_mainboard !== '' ?
                            <StyledTableRow key={15} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Các cổng xuất hình ảnh</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].display_output_mainboard}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].other_connect_port !== '' ?
                            <StyledTableRow key={16} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Các kết nối khác</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].other_connect_port}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                    </TableBody>
                )
            case 'ram':
                return (
                    <TableBody>
                        {ImportProduct[0].generation_ram !== '' ?
                            <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Thế hệ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].generation_ram}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].capacity_ram !== '' ?
                            <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Dung lượng</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].capacity_ram}GB</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].speed_bus !== '' ?
                            <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Bus</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].speed_bus}Mhz</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].voltage !== '' ?
                            <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Voltage</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].voltage} V</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].delay_time !== '' ?
                            <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Timing</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].delay_time}ms</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].led_ram !== '' ?
                            <StyledTableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ led</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].led_ram}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                    </TableBody>
                )
            case 'gpu':
                return (
                    <TableBody>
                        {ImportProduct[0].chipset_gpu !== '' ?
                            <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chipset</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].chipset_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].producer_chipset !== '' ?
                            <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Nhà sản xuất chipset</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].producer_chipset}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].generation_gpu !== '' ?
                            <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Thế hệ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].generation_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].capacity_memory_gpu !== '' ?
                            <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Dung lượng bộ nhớ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].capacity_memory_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].type_memory_gpu !== '' ?
                            <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại bộ nhớ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_memory_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].amount_core !== '' ?
                            <StyledTableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Số nhân xử lý</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].amount_core}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].clock_speed_gpu !== '' ?
                            <StyledTableRow key={7} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Tốc độ xử lý</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].clock_speed_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].display_output_gpu !== '' ?
                            <StyledTableRow key={8} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Cổng xuất hình ảnh</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].display_output_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].tdp_gpu !== '' ?
                            <StyledTableRow key={9} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>TDP</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].tdp_gpu} W</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].sub_power_port !== '' ?
                            <StyledTableRow key={10} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Yêu cầu nguồn phụ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].sub_power_port}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].type_cooling_cpu !== '' ?
                            <StyledTableRow key={11} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại tản nhiệt</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_cooling_cpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].multi_gpu !== '' ?
                            <StyledTableRow key={12} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ đa card đồ hoạ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].multi_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].led_gpu !== '' ?
                            <StyledTableRow key={13} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ led</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].led_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].size_gpu !== '' ?
                            <StyledTableRow key={14} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Kích thước</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].size_gpu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                    </TableBody>
                )
            case 'psu':
                return (
                    <TableBody>
                        {ImportProduct[0].type_size_psu !== '' ?
                            <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chuẩn kích thước</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_size_psu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].wattage !== '' ?
                            <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Công suất</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].wattage} W</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].energy_efficiency !== '' ?
                            <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chuẩn hiệu suất</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].energy_efficiency}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].modular_support !== '' ?
                            <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ kết nối module</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].modular_support}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].protection_certificate !== '' ?
                            <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chứng nhận bảo vệ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].protection_certificate}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].slot_power !== '' ?
                            <StyledTableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Số cổng cắm</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].slot_power}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].led_psu !== '' ?
                            <StyledTableRow key={7} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ led</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].led_psu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].type_cooling_psu !== '' ?
                            <StyledTableRow key={8} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại tản nhiệt</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_cooling_psu}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                    </TableBody>
                )
            case 'casepc':
                return (
                    <TableBody>
                        {ImportProduct[0].type_case !== '' ?
                            <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chuẩn kích thước</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_case}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].mainboard_support !== '' ?
                            <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ chuẩn bo mạch chủ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].mainboard_support}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].color_case !== '' ?
                            <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Màu sắc</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].color_case}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].material_case !== '' ?
                            <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chất liệu</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].material_case}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].material_side_case !== '' ?
                            <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Chất liệu nắp hong</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].material_side_case}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].size_case !== '' ?
                            <StyledTableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Kích thước</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].size_case}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].amount_harddisk_support !== '' ?
                            <StyledTableRow key={7} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ ổ cứng</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].amount_harddisk_support}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].amount_port_connect !== '' ?
                            <StyledTableRow key={8} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ các kết nối</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].amount_port_connect}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].height_cpu_fan !== '' ?
                            <StyledTableRow key={9} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Độ cao quạt vi xử lý</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].height_cpu_fan}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].height_radiator !== '' ?
                            <StyledTableRow key={10} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Độ cao radiator</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].height_radiator}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].type_fan_front !== '' ?
                            <StyledTableRow key={11} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại quạt mặt trước</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_fan_front}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].type_fan_top !== '' ?
                            <StyledTableRow key={12} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại quạt mặt trên</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_fan_top}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].type_fan_behind !== '' ?
                            <StyledTableRow key={13} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại quạt mặt sau</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_fan_behind}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].bonus_fan !== '' ?
                            <StyledTableRow key={14} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Quạt tặng kèm</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].bonus_fan}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].amount_slot_pci_case !== '' ?
                            <StyledTableRow key={15} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Số khe pci</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].amount_slot_pci_case}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                    </TableBody>
                )
            case 'harddisk':
                switch (ImportProduct[0].type_harddisk) {
                    case 'HDD':
                        return (
                            <TableBody>
                                {ImportProduct[0].type_harddisk !== '' ?
                                    <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại ổ cứng</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_harddisk}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].capacity_harddisk !== '' ?
                                    <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Dung lượng</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].capacity_harddisk}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].type_connection_harddisk !== '' ?
                                    <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại kết nối</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_connection_harddisk}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].size_harddisk !== '' ?
                                    <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Kích thước</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].size_harddisk}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].rotational_speed_hdd !== '' ?
                                    <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Tốc độ vòng quay</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].rotational_speed_hdd}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                            </TableBody>
                        )
                    case 'SSD':
                        return (
                            <TableBody>
                                {ImportProduct[0].type_harddisk !== '' ?
                                    <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại ổ cứng</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_harddisk}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].capacity_harddisk !== '' ?
                                    <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Dung lượng</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].capacity_harddisk}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].type_connection_harddisk !== '' ?
                                    <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại kết nối</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_connection_harddisk}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].size_harddisk !== '' ?
                                    <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Kích thước</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].size_harddisk}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].nand_memory !== '' ?
                                    <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Bộ nhớ NAND</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].nand_memory}</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].read_speed !== '' ?
                                    <StyledTableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Tốc độ đọc</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].read_speed}mb/s</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                                {ImportProduct[0].write_speed !== '' ?
                                    <StyledTableRow key={7} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Tốc độ ghi</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].write_speed}mb/s</StyledTableCell>
                                    </StyledTableRow>
                                    :
                                    <StyledTableRow />
                                }
                            </TableBody>
                        )
                    default:
                        break;
                }
            case 'cooling_system':
                return (
                    <TableBody>
                        {ImportProduct[0].type_cooling_system !== '' ?
                            <StyledTableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Loại tản nhiệt</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].type_cooling_system}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].size_cooling_system !== '' ?
                            <StyledTableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Kích thước</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].size_cooling_system}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].support_cpu_socket !== '' ?
                            <StyledTableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Socket hỗ trợ</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].support_cpu_socket}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].led_cooling_system !== '' ?
                            <StyledTableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Hỗ trợ led</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].led_cooling_system}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].rotational_speed_cooling_system !== '' ?
                            <StyledTableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Tốc độ quay</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].rotational_speed_cooling_system}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].air_flow !== '' ?
                            <StyledTableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Lưu lượng gió</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].air_flow}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                        {ImportProduct[0].noise_level !== '' ?
                            <StyledTableRow key={7} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" style={{ width: '40%' }}>Độ ồn</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '60%' }}>{ImportProduct[0].noise_level}</StyledTableCell>
                            </StyledTableRow>
                            :
                            <StyledTableRow />
                        }
                    </TableBody>
                )
            default:
                break;
        }
    }

}

export default ShowTechInfo