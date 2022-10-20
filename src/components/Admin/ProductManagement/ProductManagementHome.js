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
import Container from '@mui/material/Container';
import ProductManagementFormView from './ProductManagementFormView';
import ProductManagementFormAdd from './ProductManagementFormAdd';
import ProductManagementFormEdit from './ProductManagementFormEdit';
import ProductManagementStatus from './ProductManagementStatus';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Stack } from '@mui/system';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ProductManagementFormUpdateImage from './ProductManagementFormUpdateImage';

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

    const [chosenProducts, setChosenProducts] = React.useState([])

    const [resetPage, setResetPage] = React.useState(false);

    function handleResetPage() {
        setResetPage(!resetPage);
    }

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product`)
            .then(res => {
                const Products = res.data;
                setChosenProducts(Products)
            })
    }, [])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Product`)
            .then(res => {
                const Products = res.data;
                setProducts(Products)
            })
    }, [resetPage])

    const [searchField, setSearchField] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState('');

    const [chosenTypeProduct, setChosenTypeProduct] = React.useState('all');

    const [chosenStatusProduct, setChosenStatusProduct] = React.useState(-1);

    React.useEffect(() => {
        handleChosenProduct(products)
    }, [searchField, searchInput, chosenTypeProduct, resetPage])

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        setPage(0)
    }

    const handleChangeSearchField = (event) => {
        setSearchField(event.target.value);
    };

    const handleChangeChosenTypeProduct = (event) => {
        setChosenTypeProduct(event.target.value);
    };

    const handleChangeChosenStatusProduct = (event) => {
        setChosenStatusProduct(event.target.value);
    };

    function removeAccents(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    const handleChosenProduct = function (Products) {
        var SearchInput = removeAccents(searchInput.toLowerCase())
        var exportProducts = Products

        if (chosenTypeProduct !== 'all') {
            exportProducts = exportProducts.filter(function (product) {
                return (product.type_product === chosenTypeProduct)
            })
        }

        if (SearchInput !== "") {
            switch (searchField) {
                case 1:
                    exportProducts = exportProducts.filter(function (product) {
                        return (('' + product.id_product).includes(SearchInput))
                    })
                    break;
                case 2:
                    exportProducts = exportProducts.filter(function (product) {
                        return (removeAccents(product.name_product.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 3:
                    exportProducts = exportProducts.filter(function (product) {
                        return (removeAccents(product.brand_product.toLowerCase()).includes(SearchInput))
                    })
                    break;
                default:
                    break;
            }
        }
        handleResetPage()
        setChosenProducts(exportProducts)
    }

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

    const showCustomer = function (items) {
        if (items.length > 0) {
            if (rowsPerPage > 0) {
                return (
                    items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(function (row) {
                            return (
                                <StyledTableRow key={row.id_product}>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.id_product}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.picture_product === null ?
                                            <img src={"data:image/png;base64, " + row.picture_link_product} alt="product images" width={'100%'} height={'100%'} />
                                            :
                                            <img src={row.picture_product} alt="product images" width={'100%'} height={'100%'} />
                                        }
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
                                    <StyledTableCell align="center">
                                        <Stack direction="row" spacing={2} justifyContent={'center'}>
                                            <ProductManagementFormView IDProduct={row.id_product} />
                                            <ProductManagementFormEdit IDProduct={row.id_product} />
                                            <ProductManagementFormUpdateImage IDProduct={row.id_product} handleResetPage={handleResetPage} resetPage={resetPage} />
                                            <ProductManagementStatus product={row} handleResetPage={handleResetPage} />
                                        </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.status_product === 1 ?
                                            <Typography variant='body2' sx={{ color: "var(--color3)" }}>kinh doanh</Typography>
                                            :
                                            <Typography variant='body2' sx={{ color: "var(--color9)" }}>Tạm dừng</Typography>
                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        }
                        )
                )
            }
        } else {
            return (
                <StyledTableRow>
                    <StyledTableCell colSpan={11} component="th" scope="row" align="left">
                        Không tìm thấy kết quả tương ứng
                    </StyledTableCell>
                </StyledTableRow>
            )
        }
    }

    return (
        <Box>
            <Container maxWidth="xl">
                <Box>
                    <FormControl sx={{ m: 1, minWidth: 170 }}>
                        <InputLabel htmlFor="outlined-adornment-search">Loại sản phẩm</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={chosenTypeProduct}
                            label="Loại sản phẩm"
                            onChange={handleChangeChosenTypeProduct}
                        >
                            <MenuItem value={'all'}>Tất cả</MenuItem>
                            <MenuItem value={'cpu'}>Vi xử lý</MenuItem>
                            <MenuItem value={'mainboard'}>Bo mạch chủ</MenuItem>
                            <MenuItem value={'gpu'}>Card đồ hoạ</MenuItem>
                            <MenuItem value={'ram'}>Ram</MenuItem>
                            <MenuItem value={'psu'}>Nguồn</MenuItem>
                            <MenuItem value={'harddisk'}>Ổ cứng</MenuItem>
                            <MenuItem value={'cooling_system'}>Tản nhiệt</MenuItem>
                            <MenuItem value={'casepc'}>Vỏ máy tính</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 170 }}>
                        <InputLabel htmlFor="outlined-adornment-search">Danh Mục</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={searchField}
                            label="Danh Mục"
                            onChange={handleChangeSearchField}
                        >
                            <MenuItem value={1}>Mã sản phẩm</MenuItem>
                            <MenuItem value={2}>Tên sản phẩm</MenuItem>
                            <MenuItem value={3}>Thương hiệu</MenuItem>
                        </Select>
                    </FormControl>
                    {/* TextField tim kiem */}
                    <FormControl sx={{ m: 1, width: '60ch' }}>
                        <InputLabel htmlFor="outlined-adornment-search">Tìm Kiếm</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-search"
                            type="text"
                            label="Tìm Kiếm"
                            onChange={handleChangeSearchInput}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="button search"
                                        edge="end"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 170 }}>
                        <InputLabel htmlFor="outlined-adornment-search">Trạng thái sản phẩm</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={chosenStatusProduct}
                            label="Trạng thái sản phẩm"
                            onChange={handleChangeChosenStatusProduct}
                        >
                            <MenuItem value={-1}>Tất cả</MenuItem>
                            <MenuItem value={1}>Còn kinh doanh</MenuItem>
                            <MenuItem value={0}>Tạm dừng kinh doanh</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="p"
                        sx={
                            {
                                fontSize: 30,
                                color: "var(--color4)",
                                fontWeight: "bold",
                            }
                        }
                    >
                        Quản lý sản phẩm
                    </Typography>
                    <ProductManagementFormAdd />
                </Stack>
                <Divider sx={{ marginBottom: 3 }}></Divider>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#474747', color: 'white' }}>
                                <TableCell style={{ width: '5%', color: 'white' }} align="left">Mã </TableCell>
                                <TableCell style={{ width: '7%', color: 'white' }} align="left">Ảnh </TableCell>
                                <TableCell style={{ width: '15%', color: 'white' }} align="left">Tên</TableCell>
                                <TableCell style={{ width: '8%', color: 'white' }} align="left">Thương hiệu</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Loại</TableCell>
                                <TableCell style={{ width: '5%', color: 'white' }} align="left">Số lượng</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Đơn giá</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Giảm giá</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Bảo hành</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="center">Thao Tác</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                showCustomer(chosenProducts)
                            }
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
                                    colSpan={11}
                                    count={chosenProducts.length}
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
            </Container>
        </Box>
    )
}

export default ProductManagementHome