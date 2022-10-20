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

import CustomerFormEdit from './CustomerFormEdit';
import CustomerFormView from './CustomerFormView';
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

function CustomerManagementHome() {

    const [customers, setCustomers] = React.useState([])

    const [resetPage, setResetPage] = React.useState(false);

    function handleResetPage() {
        setResetPage(!resetPage);
    }

    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return day + '/' + month + '/' + year;
    }

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Customer`)
            .then(res => {
                const Customers = res.data;
                setCustomers(Customers);
            })
    }, [resetPage])

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Customer`)
            .then(res => {
                const Customers = res.data;
                setChosenCustomer(Customers);
            })
    }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customers.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function showGender(gender) {
        switch (gender) {
            case 'male':
                return (
                    <Typography variant='body2'>Nam</Typography>
                )
            case 'female':
                return (
                    <Typography variant='body2'>Nữ</Typography>
                )
            case 'other':
                return (
                    <Typography variant='body2'>Khác</Typography>
                )
            default:
                break;
        }
    }

    const [chosenCustomer, setChosenCustomer] = React.useState([])

    const [searchField, setSearchField] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState('');

    React.useEffect(() => {
        handleChosenCustomer(customers)
    }, [searchField, searchInput])

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        setPage(0)
    }

    const handleChangeSearchField = (event) => {
        setSearchField(event.target.value);
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

    const handleChosenCustomer = function (Customer) {
        var SearchInput = removeAccents(searchInput.toLowerCase())
        var exportCustomers = Customer

        if (SearchInput !== "") {
            switch (searchField) {
                case 1:
                    exportCustomers = exportCustomers.filter(function (customer) {
                        return (('' + customer.id_customer).includes(SearchInput))
                    })
                    break;
                case 2:
                    exportCustomers = exportCustomers.filter(function (customer) {
                        return (removeAccents(customer.name_customer.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 3:
                    exportCustomers = exportCustomers.filter(function (customer) {
                        return ((customer.phone_number_customer).includes(SearchInput))
                    })
                    break;
                case 4:
                    exportCustomers = exportCustomers.filter(function (customer) {
                        return (removeAccents(customer.email_customer.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 5:
                    exportCustomers = exportCustomers.filter(function (customer) {
                        return (('' + customer.identity_card_customer).includes(SearchInput))
                    })
                    break;
                default:
                    break;
            }
        }
        handleResetPage()
        setChosenCustomer(exportCustomers)
    }

    const showCustomers = function (items) {
        if (items.length > 0) {
            if (rowsPerPage > 0) {
                return (
                    items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(function (row) {
                            return (
                                <StyledTableRow key={row.id_customer}>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.id_customer}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.name_customer}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.phone_number_customer}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.identity_card_customer}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.email_customer}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.date_of_birth_customer !== null ?
                                            getFormattedDate(new Date(row.date_of_birth_customer))
                                            :
                                            "Chưa có thông tin"
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {showGender(row.gender_customer)}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.register_date !== null ?
                                            getFormattedDate(new Date(row.register_date))
                                            :
                                            "Chưa có thông tin"
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Stack direction="row" spacing={2} justifyContent={'center'}>
                                            <CustomerFormView Customer={row} />
                                            <CustomerFormEdit Customer={row} handleResetPage={handleResetPage} />
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
                    <StyledTableCell key={-1} colSpan={11} component="th" scope="row" align="left">
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
                            <MenuItem value={1}>Mã Khách Hàng</MenuItem>
                            <MenuItem value={2}>Tên khách hàng</MenuItem>
                            <MenuItem value={3}>Số điện thoại</MenuItem>
                            <MenuItem value={4}>Email</MenuItem>
                            <MenuItem value={5}>Căn cước công dân</MenuItem>
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
                <Typography variant="p"
                    sx={
                        {
                            fontSize: 30,
                            color: "var(--color4)",
                            fontWeight: "bold",

                        }
                    }
                >
                    Quản lý thông tin khách hàng
                </Typography>
                <Divider sx={{ marginBottom: 3 }}></Divider>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#474747', color: 'white' }}>
                                <TableCell style={{ width: '5%', color: 'white' }} align="left">Mã</TableCell>
                                <TableCell style={{ width: '15%', color: 'white' }} align="left">Tên khách hàng</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Số điện thoại</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Căn cước</TableCell>
                                <TableCell style={{ width: '15%', color: 'white' }} align="left">Email</TableCell>
                                <TableCell style={{ width: '15%', color: 'white' }} align="left">Ngày sinh</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Giới tính</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Ngày đăng ký</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showCustomers(chosenCustomer)}
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
                                    count={customers.length}
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

export default CustomerManagementHome