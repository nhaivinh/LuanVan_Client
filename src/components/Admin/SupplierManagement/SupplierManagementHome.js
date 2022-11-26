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
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Stack } from '@mui/system';
import Divider from '@mui/material/Divider';
import { Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import SupplierFormView from './SupplierFormView';
import SupplierFormEdit from './SupplierFormEdit';
import SupplierFormAdd from './SupplierFormAdd';


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

function SupplierManagementHome() {

    const [suppliers, setSuppliers] = React.useState([])

    const [resetPage, setResetPage] = React.useState(false);

    function handleResetPage() {
        setResetPage(!resetPage);
    }


    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Supplier`)
            .then(res => {
                const Supplier = res.data;
                setSuppliers(Supplier);
            })
    }, [resetPage])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - handleChosenSuppliers(suppliers).length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [searchField, setSearchField] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState('');

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        setPage(0)
    }

    const handleChangeSearchField = (event) => {
        setSearchField(event.target.value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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

    const handleChosenSuppliers = function (Suppliers) {
        var SearchInput = removeAccents(searchInput.toLowerCase())
        var exportSuppliers = Suppliers
        if (SearchInput !== "") {
            switch (searchField) {
                case 1:
                    exportSuppliers = exportSuppliers.filter(function (staff) {
                        return (staff.id_supplier === parseInt(SearchInput))
                    })
                    break;
                case 2:
                    exportSuppliers = exportSuppliers.filter(function (staff) {
                        return (removeAccents(staff.name_supplier.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 3:
                    exportSuppliers = exportSuppliers.filter(function (staff) {
                        return (removeAccents(staff.email_supplier.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 4:
                    exportSuppliers = exportSuppliers.filter(function (staff) {
                        return (removeAccents(staff.address_supplier.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 5:
                    exportSuppliers = exportSuppliers.filter(function (staff) {
                        return (staff.phone_number_supplier.includes(SearchInput))
                    })
                    break;
                default:
                    break;
            }
        }
        return (exportSuppliers)
    }

    const showSuppliers = function (items) {
        if (items.length > 0) {
            if (rowsPerPage > 0) {
                return (
                    items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(function (row, index) {
                            return (
                                <StyledTableRow
                                    key={index}
                                >
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.id_supplier}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.name_supplier}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.phone_number_supplier}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.email_supplier}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.address_supplier}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Stack direction="row" spacing={2} justifyContent={'center'}>
                                            <SupplierFormView Staff={row} />
                                            <SupplierFormEdit Supplier={row} handleResetPage={handleResetPage} />
                                        </Stack>
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
                    <StyledTableCell colSpan={8} component="th" scope="row" align="left">
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
                        <InputLabel htmlFor="outlined-adornment-search">Danh Mục</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={searchField}
                            label="Danh Mục"
                            onChange={handleChangeSearchField}
                        >
                            <MenuItem value={1}>Mã</MenuItem>
                            <MenuItem value={2}>Tên</MenuItem>
                            <MenuItem value={3}>Email</MenuItem>
                            <MenuItem value={4}>Địa chỉ</MenuItem>
                            <MenuItem value={5}>Số điện thoại</MenuItem>
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
                        Quản lý nhà cung cấp
                    </Typography>
                    <SupplierFormAdd handleResetPage={handleResetPage} />
                </Stack>
                <Divider sx={{ marginBottom: 3 }}></Divider>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#474747', color: 'white' }}>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Mã</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Tên</TableCell>
                                <TableCell style={{ width: '15%', color: 'white' }} align="left">Email</TableCell>
                                <TableCell style={{ width: '15%', color: 'white' }} align="left">Số điện thoại</TableCell>
                                <TableCell style={{ width: '30%', color: 'white' }} align="left">Địa chỉ</TableCell>
                                <TableCell style={{ width: '20%', color: 'white' }} align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showSuppliers(handleChosenSuppliers(suppliers))}
                        </TableBody>
                        <TableFooter>
                            <StyledTableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
                                    colSpan={10}
                                    count={handleChosenSuppliers(suppliers).length}
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

export default SupplierManagementHome