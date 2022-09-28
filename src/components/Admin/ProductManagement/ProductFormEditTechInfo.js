import * as React from 'react';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function ProductFormEditTechInfo({ product, setProduct, typeProduct }) {
    console.log(product)
    function showProductByTypeHarddisk() {
        if (product.type_harddisk !== undefined) {
            switch (product.type_harddisk) {
                case 'hdd':
                    return (
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Tốc độ vòng quay"
                            size="small"
                            defaultValue={product.rotational_speed_hdd}
                            onChange={(e) => { setProduct({ ...product, rotational_speed_hdd: e.target.value }) }}
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
                                defaultValue={product.nand_memory}
                                onChange={(e) => { setProduct({ ...product, nand_memory: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ đọc"
                                size="small"
                                defaultValue={product.read_speed}
                                onChange={(e) => { setProduct({ ...product, read_speed: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ ghi"
                                size="small"
                                defaultValue={product.write_speed}
                                onChange={(e) => { setProduct({ ...product, write_speed: e.target.value }) }}
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
                                defaultValue={product.core_cpu}
                                onChange={(e) => { setProduct({ ...product, core_cpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Luồng xử lý"
                                size="small"
                                defaultValue={product.thread_cpu}
                                onChange={(e) => { setProduct({ ...product, thread_cpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Socket"
                                size="small"
                                defaultValue={product.socket_cpu}
                                onChange={(e) => { setProduct({ ...product, socket_cpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kiến Trúc"
                                size="small"
                                defaultValue={product.architecture_cpu}
                                onChange={(e) => { setProduct({ ...product, architecture_cpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Thế hệ"
                                size="small"
                                defaultValue={product.generation_cpu}
                                onChange={(e) => { setProduct({ ...product, generation_cpu: e.target.value }) }}
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
                                defaultValue={product.tdp_cpu}
                                onChange={(e) => { setProduct({ ...product, tdp_cpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ xử lý"
                                size="small"
                                defaultValue={product.clock_speed_cpu}
                                onChange={(e) => { setProduct({ ...product, clock_speed_cpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Card đồ hoạ tích hợp"
                                size="small"
                                defaultValue={product.onboard_graphic_cpu}
                                onChange={(e) => { setProduct({ ...product, onboard_graphic_cpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Bộ nhớ đệm"
                                size="small"
                                defaultValue={product.cache_cpu}
                                onChange={(e) => { setProduct({ ...product, cache_cpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Điểm số"
                                size="small"
                                defaultValue={product.scope_cpu}
                                onChange={(e) => { setProduct({ ...product, scope_cpu: e.target.value }) }}
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
                                defaultValue={product.chipset_mainboard}
                                onChange={(e) => { setProduct({ ...product, chipset_mainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Socket Hỗ trợ"
                                size="small"
                                defaultValue={product.socket_mainboard}
                                onChange={(e) => { setProduct({ ...product, socket_mainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chuẩn kích thước"
                                size="small"
                                defaultValue={product.size_mainboard}
                                onChange={(e) => { setProduct({ ...product, size_mainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại ram hỗ trợ"
                                size="small"
                                defaultValue={product.type_ram_support}
                                onChange={(e) => { setProduct({ ...product, type_ram_support: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tổng số khe ram"
                                size="small"
                                defaultValue={product.max_slot_ram}
                                onChange={(e) => { setProduct({ ...product, max_slot_ram: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tổng dung lượng Ram hỗ trợ"
                                size="small"
                                defaultValue={product.max_capacity_ram}
                                onChange={(e) => { setProduct({ ...product, max_capacity_ram: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Bus Ram hỗ trợ"
                                size="small"
                                defaultValue={product.bus_ram_support}
                                onChange={(e) => { setProduct({ ...product, bus_ram_support: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Cổng kết nối PCI"
                                size="small"
                                defaultValue={product.amount_slot_pci_mainboard}
                                onChange={(e) => { setProduct({ ...product, amount_slot_pci_mainboard: e.target.value }) }}
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
                                defaultValue={product.multi_gpu_support}
                                onChange={(e) => { setProduct({ ...product, multi_gpu_support: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ Led"
                                size="small"
                                defaultValue={product.led_mainboard}
                                onChange={(e) => { setProduct({ ...product, led_mainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chipset xử lý âm thanh"
                                size="small"
                                defaultValue={product.audio_chipset}
                                onChange={(e) => { setProduct({ ...product, audio_chipset: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ không dây"
                                size="small"
                                defaultValue={product.wireless_connection}
                                onChange={(e) => { setProduct({ ...product, wireless_connection: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ ổ cứng"
                                size="small"
                                defaultValue={product.harddisk_support}
                                onChange={(e) => { setProduct({ ...product, harddisk_support: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Cổng xuất hình ảnh"
                                size="small"
                                defaultValue={product.display_output_mainboard}
                                onChange={(e) => { setProduct({ ...product, display_output_mainboard: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Các cổng kết nối khác"
                                size="small"
                                defaultValue={product.other_connect_port}
                                onChange={(e) => { setProduct({ ...product, other_connect_port: e.target.value }) }}
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
                                defaultValue={product.chipset_gpu}
                                onChange={(e) => { setProduct({ ...product, chipset_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Nhà sản xuất chipset"
                                size="small"
                                defaultValue={product.producer_chipset}
                                onChange={(e) => { setProduct({ ...product, producer_chipset: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Thế hệ"
                                size="small"
                                defaultValue={product.generation_gpu}
                                onChange={(e) => { setProduct({ ...product, generation_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Dung lương bộ nhớ"
                                size="small"
                                defaultValue={product.capacity_memory_gpu}
                                onChange={(e) => { setProduct({ ...product, capacity_memory_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại bộ nhớ"
                                size="small"
                                defaultValue={product.type_memory_gpu}
                                onChange={(e) => { setProduct({ ...product, type_memory_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số nhân"
                                size="small"
                                defaultValue={product.amount_core}
                                onChange={(e) => { setProduct({ ...product, amount_core: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ xử lý"
                                size="small"
                                defaultValue={product.clock_speed_gpu}
                                onChange={(e) => { setProduct({ ...product, clock_speed_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Cổng xuất hình"
                                size="small"
                                defaultValue={product.display_output_gpu}
                                onChange={(e) => { setProduct({ ...product, display_output_gpu: e.target.value }) }}
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
                                defaultValue={product.tdp_gpu}
                                onChange={(e) => { setProduct({ ...product, tdp_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Yêu cầu nguồn phụ"
                                size="small"
                                defaultValue={product.sub_power_port}
                                onChange={(e) => { setProduct({ ...product, sub_power_port: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại tản nhiệt"
                                size="small"
                                defaultValue={product.type_cooling_gpu}
                                onChange={(e) => { setProduct({ ...product, type_cooling_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ đa card đồ hoạ"
                                size="small"
                                defaultValue={product.multi_gpu}
                                onChange={(e) => { setProduct({ ...product, multi_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ Led"
                                size="small"
                                defaultValue={product.led_gpu}
                                onChange={(e) => { setProduct({ ...product, led_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kích thước"
                                size="small"
                                defaultValue={product.size_gpu}
                                onChange={(e) => { setProduct({ ...product, size_gpu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Điểm số"
                                size="small"
                                defaultValue={product.scope_gpu}
                                onChange={(e) => { setProduct({ ...product, scope_gpu: e.target.value }) }}
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
                                    value={product.type_harddisk.toLowerCase()}
                                    label="Loại ổ cứng"
                                    onChange={(e) => { setProduct({ ...product, type_harddisk: e.target.value }) }}
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
                                defaultValue={product.capacity_harddisk}
                                onChange={(e) => { setProduct({ ...product, capacity_harddisk: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chuẩn kết nối"
                                size="small"
                                defaultValue={product.type_connection_harddisk}
                                onChange={(e) => { setProduct({ ...product, type_connection_harddisk: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kích thước"
                                size="small"
                                defaultValue={product.size_harddisk}
                                onChange={(e) => { setProduct({ ...product, size_harddisk: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6} >
                            {showProductByTypeHarddisk()}
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
                                defaultValue={product.generation_ram}
                                onChange={(e) => { setProduct({ ...product, generation_ram: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Tốc độ"
                                size="small"
                                defaultValue={product.speed_bus}
                                onChange={(e) => { setProduct({ ...product, speed_bus: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hiệu điện thế"
                                size="small"
                                defaultValue={product.voltage}
                                onChange={(e) => { setProduct({ ...product, voltage: e.target.value }) }}
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
                                defaultValue={product.delay_time}
                                onChange={(e) => { setProduct({ ...product, delay_time: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Dung lượng"
                                size="small"
                                defaultValue={product.capacity_ram}
                                onChange={(e) => { setProduct({ ...product, capacity_ram: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ led"
                                size="small"
                                defaultValue={product.led_ram}
                                onChange={(e) => { setProduct({ ...product, led_ram: e.target.value }) }}
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
                                defaultValue={product.type_case}
                                onChange={(e) => { setProduct({ ...product, type_case: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ bo mạch chủ"
                                size="small"
                                defaultValue={product.mainboard_support}
                                onChange={(e) => { setProduct({ ...product, mainboard_support: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Màu sắc"
                                size="small"
                                defaultValue={product.color_case}
                                onChange={(e) => { setProduct({ ...product, color_case: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chất liệu"
                                size="small"
                                defaultValue={product.material_case}
                                onChange={(e) => { setProduct({ ...product, material_case: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chất liệu mặt bên"
                                size="small"
                                defaultValue={product.material_side_case}
                                onChange={(e) => { setProduct({ ...product, material_side_case: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kích thước"
                                size="small"
                                defaultValue={product.size_case}
                                onChange={(e) => { setProduct({ ...product, size_case: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số ổ cứng hỗ trợ"
                                size="small"
                                defaultValue={product.amount_harddisk_support}
                                onChange={(e) => { setProduct({ ...product, amount_harddisk_support: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số cổng kết nối ngoại vi"
                                size="small"
                                defaultValue={product.amount_port_connect}
                                onChange={(e) => { setProduct({ ...product, amount_port_connect: e.target.value }) }}
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
                                defaultValue={product.height_cpu_fan}
                                onChange={(e) => { setProduct({ ...product, height_cpu_fan: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Độ cao Radiator"
                                size="small"
                                defaultValue={product.height_radiator}
                                onChange={(e) => { setProduct({ ...product, height_radiator: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại quạt mặt trước"
                                size="small"
                                defaultValue={product.type_fan_front}
                                onChange={(e) => { setProduct({ ...product, type_fan_front: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại quạt mặt trên"
                                size="small"
                                defaultValue={product.type_fan_top}
                                onChange={(e) => { setProduct({ ...product, type_fan_top: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại quạt sau"
                                size="small"
                                defaultValue={product.type_fan_behind}
                                onChange={(e) => { setProduct({ ...product, type_fan_behind: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Quạt tặng kèm"
                                size="small"
                                defaultValue={product.bonus_fan}
                                onChange={(e) => { setProduct({ ...product, bonus_fan: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số Khe PCI"
                                size="small"
                                defaultValue={product.amount_slot_pci_case}
                                onChange={(e) => { setProduct({ ...product, amount_slot_pci_case: e.target.value }) }}
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
                                defaultValue={product.energy_efficiency}
                                onChange={(e) => { setProduct({ ...product, energy_efficiency: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Công suất"
                                size="small"
                                defaultValue={product.wattage}
                                onChange={(e) => { setProduct({ ...product, wattage: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Chuẩn kích thước"
                                size="small"
                                defaultValue={product.type_size_psu}
                                onChange={(e) => { setProduct({ ...product, type_size_psu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ kết nối mô-đun"
                                size="small"
                                defaultValue={product.modular_support}
                                onChange={(e) => { setProduct({ ...product, modular_support: e.target.value }) }}
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
                                defaultValue={product.protection_certificate}
                                onChange={(e) => { setProduct({ ...product, protection_certificate: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Số cổng"
                                size="small"
                                defaultValue={product.slot_power}
                                onChange={(e) => { setProduct({ ...product, slot_power: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ Led"
                                size="small"
                                defaultValue={product.led_psu}
                                onChange={(e) => { setProduct({ ...product, led_psu: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Loại tản nhiệt"
                                size="small"
                                defaultValue={product.type_cooling_psu}
                                onChange={(e) => { setProduct({ ...product, type_cooling_psu: e.target.value }) }}
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
                                defaultValue={product.type_cooling_system}
                                onChange={(e) => { setProduct({ ...product, type_cooling_system: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Kích thước"
                                size="small"
                                defaultValue={product.size_cooling_system}
                                onChange={(e) => { setProduct({ ...product, size_cooling_system: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ socket CPU"
                                size="small"
                                defaultValue={product.support_cpu_socket}
                                onChange={(e) => { setProduct({ ...product, support_cpu_socket: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Hỗ trợ Led"
                                size="small"
                                defaultValue={product.led_cooling_system}
                                onChange={(e) => { setProduct({ ...product, led_cooling_system: e.target.value }) }}
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
                                defaultValue={product.rotational_speed_cooling_system}
                                onChange={(e) => { setProduct({ ...product, rotational_speed_cooling_system: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Lưu lượng khí"
                                size="small"
                                defaultValue={product.air_flow}
                                onChange={(e) => { setProduct({ ...product, air_flow: e.target.value }) }}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Độ ồn"
                                size="small"
                                defaultValue={product.noise_level}
                                onChange={(e) => { setProduct({ ...product, noise_level: e.target.value }) }}
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