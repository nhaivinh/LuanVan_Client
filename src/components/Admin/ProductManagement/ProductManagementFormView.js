import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';

import ProductManagementTechInfo from './ProductManagementTechInfo';

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
const Info__style = {
    display: 'flex',
    width: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10
};

export default function ProductManagementFormView({ IDProduct }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [product, setProduct] = React.useState({})

    function showTypeProduct(type) {
        switch (type) {
            case 'cpu':
                return (
                    "Vi xử lý"
                )
            case 'gpu':
                return (
                    "Card đồ họa"
                )
            case 'mainboard':
                return (
                    "Bo mạch chủ"
                )
            case 'ram':
                return (
                    "Ram"
                )
            case 'psu':
                return (
                    "Nguồn"
                )
            case 'casepc':
                return (
                    "Case máy tính"
                )
            case 'harddisk':
                return (
                    "Ổ cứng"
                )
            case 'cooling_system':
                return (
                    "Tản nhiệt"
                )

            default:
                break;
        }
    }

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product/getproductbyid/` + IDProduct)
            .then(res => {
                const Product = res.data;
                setProduct(Product[0]);
            })
    }, [])

    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="primary">
                <Tooltip title="Xem Chi Tiết">
                    <VisibilityIcon
                        sx={{ color: 'var(--color7)' }}
                    />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {product !== {} &&
                    <Box sx={style}>
                        <Stack direction="row" spacing={1} alignItems="flex-end" justifyContent="space-between" marginBottom={5}>
                            <Typography variant="h4">
                                Chi Tiết Sản Phẩm
                            </Typography>
                            <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                        </Stack>
                        <Box sx={Info__style}>
                            <Grid container spacing={2}>
                                <Grid item xs={3} >
                                    <Typography variant="h6" paddingBottom={2}>
                                        Thông số sản phẩm:
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Mã sản phẩm: {product.id_product}
                                    </Typography>
                                    <Typography variant="body1">
                                        Tên sản phẩm:
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        {product.name_product}
                                    </Typography>
                                    <Typography variant="body1">
                                        Trạng thái sản phẩm:
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        {product.status_product === 1 ?
                                            ' Còn kinh doanh'
                                            :
                                            ' Tạm dừng kinh doanh'
                                        }
                                    </Typography>
                                    
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant="h6" paddingBottom={6}>

                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Loại sản phẩm: {showTypeProduct(product.type_product)}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Thương hiệu: {product.brand_product}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Số lượng: {product.quantity_product}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Đơn giá: &nbsp;
                                        {product.unit_price_product !== undefined &&
                                            product.unit_price_product.toLocaleString('vi-VI',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Giảm giá: &nbsp;
                                        {product.discount_product === 0 ?
                                            "không có"
                                            :
                                            <>
                                                {product.discount_product + "%"}
                                            </>
                                        }
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Bảo hành: {product.insurance_product} Tháng
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant="h6" paddingBottom={2}>
                                        Thông số kỹ thuật:
                                    </Typography>
                                    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                                        <Table sx={{ maxWidth: 500 }} aria-label="custom pagination table">
                                            <ProductManagementTechInfo product={product} />
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            {/* <Grid container spacing={2}>
                                <Grid item xs={6} >
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Mã sản phẩm: {product.id_product}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Tên sản phẩm: {product.name_product}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Trạng thái sản phẩm:
                                        {product.status_product === 1 ?
                                            ' Còn kinh doanh'
                                            :
                                            ' Tạm dừng kinh doanh'
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Loại sản phẩm: {showTypeProduct(product.type_product)}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Thương hiệu: {product.brand_product}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Số lượng: {product.quantity_product}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Đơn giá: &nbsp;
                                        {product.unit_price_product !== undefined &&
                                            product.unit_price_product.toLocaleString('vi-VI',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Giảm giá: &nbsp;
                                        {product.discount_product === 0 ?
                                            "không có"
                                            :
                                            <>
                                                {product.discount_product + "%"}
                                            </>
                                        }
                                    </Typography>
                                    <Typography variant="body1" style={{ paddingBottom: 20 }}>
                                        Bảo hành: {product.insurance_product} Tháng
                                    </Typography>
                                </Grid>
                            </Grid> */}
                        </Box>
                    </Box>
                }
            </Modal>
        </div >
    );
}