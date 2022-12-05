import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel';

export default function ProductFormAddTechInfo({ infoTech, setInfoTech, typeProduct }) {
    function showInfoTechByTypeHarddisk() {
        if (infoTech.TypeHarddisk !== undefined) {
            switch (infoTech.TypeHarddisk) {
                case 'hdd':
                    return (
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Tốc độ vòng quay"
                            size="small"
                            onChange={(e) => { setInfoTech({ ...infoTech, RotationalSpeed: e.target.value }) }}
                            style={{ paddingBottom: 20 }}
                        />
                    )
                case 'ssd':
                    return (
                        <>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Bộ nhớ NAND"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, NandMemory: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ đọc"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, ReadSpeed: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ ghi"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, WriteSpeed: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            />
                        </>
                    )
                default:
                    break;
            }
        }
    }

    switch (typeProduct) {
        case 'cpu':
            return (
                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={2}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số nhân xử lý"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, CoreCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Luồng xử lý"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, ThreadCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Socket"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SocketCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kiến Trúc"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, ArchitectureCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Thế hệ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, GenerationCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Công suất"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, TDPCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ xử lý"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, ClockSpeedCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Card đồ hoạ tích hợp"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, OnboardGraphicCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Bộ nhớ đệm"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, CacheCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Điểm số"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, ScopeCPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Stack>
            )
        case 'mainboard':
            return (
                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={2}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chipset"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, ChipsetMainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Socket Hỗ trợ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SocketMain: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chuẩn kích thước"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SizeMainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại ram hỗ trợ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeRamSupport: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tổng số khe ram"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, MaxSlotRam: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tổng dung lượng Ram hỗ trợ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, MaxCapacityRam: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Bus Ram hỗ trợ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, BusRamSupport: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Cổng kết nối PCI"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, AmountSlotPCI: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ đa card đồ hoạ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, MultiGPUSupport: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ Led"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, LedMainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chipset xử lý âm thanh"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, AudioChipset: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ không dây"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, WirelessConnection: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ ổ cứng"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, HarddiskSupport: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Cổng xuất hình ảnh"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, DisplayOutputMainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Các cổng kết nối khác"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, otherConnectPort: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Stack>
            )
        case 'gpu':
            return (
                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={2}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chipset"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, ChipsetGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Nhà sản xuất chipset"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, ProducerChipset: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Thế hệ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, GenerationGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Dung lương bộ nhớ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, CapacityMemoryGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại bộ nhớ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeMemoryGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số nhân"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, AmountCore: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ xử lý"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, ClockSpeedGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Cổng xuất hình"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, DisplayOutputGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Công suất"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, TDPGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Yêu cầu nguồn phụ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SubPowerPort: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại tản nhiệt"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeCoolingGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ đa card đồ hoạ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, MultiGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ Led"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, LedGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kích thước"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SizeGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Điểm số"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, ScopeGPU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Stack>
            )
        case 'harddisk':
            return (
                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={2}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Loại ổ cứng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    size="small"
                                    id="demo-simple-select"
                                    value={infoTech.TypeHarddisk}
                                    label="Loại ổ cứng"
                                    onChange={(e) => { setInfoTech({ ...infoTech, TypeHarddisk: e.target.value }) }}
                                    style={{ marginBottom: 20 }}
                                >
                                    <MenuItem value={'hdd'}>HDD</MenuItem>
                                    <MenuItem value={'ssd'}>SSD</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Dung lượng"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, CapacityHarddisk: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chuẩn kết nối"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeConnectionHarddisk: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kích thước"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SizeHarddisk: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            {showInfoTechByTypeHarddisk()}
                        </Grid>
                    </Grid>
                </Stack>
            )
        case 'ram':
            return (
                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={2}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Thế hệ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, GenerationRam: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, SpeedBus: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hiệu điện thế"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, Voltage: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Độ trễ"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, DelayTime: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Dung lượng"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, CapacityRam: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ led"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, LedRam: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Stack>
            )
        case 'casepc':
            return (
                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={2}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại Case"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeCase: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ bo mạch chủ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, MainboardSupport: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Màu sắc"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, ColorCase: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chất liệu"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, MaterialCase: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chất liệu mặt bên"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, MaterialSideCase: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kích thước"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SizeCase: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số ổ cứng hỗ trợ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, AmountHarddiskSupport: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số cổng kết nối ngoại vi"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, AmountPortConnect: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Độ cao quạt tản nhiệt CPU"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, HeightCPUFan: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Độ cao Radiator"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, HeightRadiator: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại quạt mặt trước"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeFanFront: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại quạt mặt trên"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeFanTop: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại quạt sau"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeFanBehind: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Quạt tặng kèm"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, BonusFan: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số Khe PCI"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, AmountSlotPCICase: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Stack>
            )
        case 'psu':
            return (
                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={2}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chuẩn hiệu suất"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, EnergyEfficiency: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Công suất"
                                size="small"
                                type="number"
                                onChange={(e) => { setInfoTech({ ...infoTech, Wattage: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chuẩn kích thước"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeSizePSU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ kết nối mô-đun"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, Modular_support: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chứng nhận bảo vệ"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, ProtectionCertificate: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số cổng"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SlotPower: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ Led"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, LedPSU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại tản nhiệt"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeCoolingPSU: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Stack>
            )
        case 'cooling_system':
            return (
                <Stack direction="column" spacing={2} alignItems="center" marginBottom={5} marginTop={2}>
                    <Grid container spacing={2} >
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại tản nhiệt"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, TypeCoolingSystem: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kích thước"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SizeCoolingSystem: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ socket CPU"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, SupportCPUSocket: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ Led"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, LedCoolingSystem: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ vòng quay"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, RotationalSpeedCoolingSystem: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Lưu lượng khí"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, AirFlow: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Độ ồn"
                                size="small"
                                onChange={(e) => { setInfoTech({ ...infoTech, NoiseLevel: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Stack>
            )
        default:
            break;
    }
}