import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import ProductManagementFormView from './ProductManagementFormView';
import ProductManagementFormAdd from './ProductManagementFormAdd';
import ProductManagementFormEdit from './ProductManagementFormEdit';
import ProductManagementStatus from './ProductManagementStatus';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Stack } from '@mui/system';

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

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function ProductManagementHome() {

    const [products, setProducts] = React.useState([])

    const [resetPage, setResetPage] = React.useState(false);

    function handleResetPage() {
        setResetPage(!resetPage);
    }

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product/getinfo`)
            .then(res => {
                const Products = res.data;
                setProducts(Products);
            })
    }, [resetPage])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    return (
        <Box>
            <ProductManagementFormAdd />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '5%' }} align="left">Mã sản phẩm</TableCell>
                            <TableCell style={{ width: '20%' }} align="left">Tên sản phẩm</TableCell>
                            <TableCell style={{ width: '10%' }} align="left">Thương hiệu</TableCell>
                            <TableCell style={{ width: '10%' }} align="left">Loại</TableCell>
                            <TableCell style={{ width: '5%' }} align="left">Số lượng</TableCell>
                            <TableCell style={{ width: '10%' }} align="left">Đơn giá</TableCell>
                            <TableCell style={{ width: '10%' }} align="left">Giảm giá</TableCell>
                            <TableCell style={{ width: '10%' }} align="left">Bảo hành</TableCell>
                            <TableCell style={{ width: '10%' }} align="left">Trạng thái</TableCell>
                            <TableCell style={{ width: '10%' }} align="center">Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : products
                        ).map((row) => (
                            <StyledTableRow key={row.id_product}>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.id_product}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.name_product}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.brand_product}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {showTypeProduct(row.type_product)}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.quantity_product}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.unit_price_product.toLocaleString('vi-VI',
                                        {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.discount_product === 0 ?
                                        "không có"
                                        :
                                        <Typography variant='body2'>{row.discount_product} %</Typography>
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.insurance_product} Tháng
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {row.status_product === 1 ?
                                        "kinh doanh"
                                        :
                                        "tạm dừng"
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Stack direction="row" spacing={2} justifyContent={'center'}>
                                        <ProductManagementFormView IDProduct={row.id_product} />
                                        <ProductManagementFormEdit IDProduct={row.id_product} />
                                        <ProductManagementStatus product={row} handleResetPage={handleResetPage}/>
                                    </Stack>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                        {emptyRows > 0 && (
                            <StyledTableRow style={{ height: 53 * emptyRows }}>
                                <StyledTableCell colSpan={10} />
                            </StyledTableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <StyledTableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                colSpan={10}
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </StyledTableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ProductManagementHome