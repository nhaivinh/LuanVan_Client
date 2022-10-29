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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Stack } from '@mui/system';
import { useCookies } from "react-cookie";
import Divider from '@mui/material/Divider';
import { Container } from '@mui/material';
import OrderManagementFormView from './OrderManagementFormView';
import OrderManagementFormChangeStatus from './OrderManagementFormChangeStatus';
import OrderManagementFormExport from './OrderManagementFormExport';
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

function OrderManagementHome() {

    const [orders, setOrders] = React.useState([])

    const [resetPage, setResetPage] = React.useState(false);

    const [account, setAccount] = React.useState({})

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    function handleResetPage() {
        setResetPage(!resetPage);
    }
    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/OrderCustomer`)
            .then(res => {
                const Orders = res.data;
                setOrders(Orders);
            })
        axios.get(`https://localhost:7253/api/Login/getinfobyid/` + cookies.Account)
            .then(res => {
                const Account = res.data;
                setAccount(Account[0]);
            })
    }, [resetPage])


    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/OrderCustomer`)
            .then(res => {
                const Orders = res.data;
                setChosenOrders(Orders);
            })
    }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return day + '/' + month + '/' + year;
    }

    function showStatusOrder(status) {
        switch (status) {
            case 0:
                return (
                    "Đang chờ duyệt"
                )
            case 1:
                return (
                    "Đã duyệt"
                )
            case 2:
                return (
                    "Đang vận chuyển"
                )
            case 3:
                return (
                    "Đã giao"
                )
            case 4:
                return (
                    "Đã hủy"
                )
            default:
                break;
        }
    }

    function showStatusTypePaymentOrder(status) {
        switch (status) {
            case "cod":
                return (
                    "Giao hàng nhận tiền"
                )
            case "card":
                return (
                    "Thanh toán trực tuyến"
                )
            default:
                break;
        }
    }

    const [chosenOrders, setChosenOrders] = React.useState([])

    const [chosenStatusOrder, setChosenStatusOrder] = React.useState(-1);

    const [searchField, setSearchField] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState('');

    // React.useEffect(() => {
    //     handleChosenOrder(orders)
    // }, [searchField, searchInput, chosenStatusOrder, resetPage])

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        setPage(0)
    }

    const handleChangeSearchField = (event) => {
        setSearchField(event.target.value);
    };

    const handleChangeChosenStatusOrder = (event) => {
        setChosenStatusOrder(event.target.value);
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

    const handleChosenOrder = function (Orders) {
        var SearchInput = removeAccents(searchInput.toLowerCase())
        var exportOrders = Orders

        if (chosenStatusOrder !== -1) {
            exportOrders = exportOrders.filter(function (Order) {
                return (Order.delivery_status === chosenStatusOrder)
            })
        }

        if (SearchInput !== "") {
            switch (searchField) {
                case 1:
                    exportOrders = exportOrders.filter(function (Order) {
                        return (('' + Order.id_order).includes(SearchInput))
                    })
                    break;
                case 2:
                    exportOrders = exportOrders.filter(function (Order) {
                        return (('' + Order.id_customer).includes(SearchInput))
                    })
                    break;
                case 3:
                    exportOrders = exportOrders.filter(function (Order) {
                        return (removeAccents(Order.delivery_name.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 4:
                    exportOrders = exportOrders.filter(function (Order) {
                        return (removeAccents(Order.delivery_address.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 5:
                    exportOrders = exportOrders.filter(function (Order) {
                        return (removeAccents(Order.delivery_phone.toLowerCase()).includes(SearchInput))
                    })
                    break;
                default:
                    break;
            }
        }
        return(exportOrders)
    }

    const showOrders = function (items) {
        if (items.length > 0) {
            if (rowsPerPage > 0) {
                return (
                    items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(function (row) {
                            return (
                                <StyledTableRow key={row.id_order}>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.id_order}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.id_customer}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.id_staff === null ?
                                            "Chưa có"
                                            :
                                            row.id_staff
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.delivery_name}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {showStatusTypePaymentOrder(row.payment_type)}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.total_payment.toLocaleString('vi-VI',
                                            {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {getFormattedDate(new Date(row.order_date))}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Stack direction="row" spacing={2} justifyContent={'left'}>
                                            <OrderManagementFormView idOrder={row.id_order} Order={row} />
                                            <OrderManagementFormExport idOrder={row.id_order} Order={row} />
                                            <OrderManagementFormChangeStatus idOrder={row.id_order} Order={row} idStaff={account.id_staff} handleResetPage={handleResetPage} />
                                        </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {showStatusOrder(row.delivery_status)}
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
                        <InputLabel htmlFor="outlined-adornment-search">Trạng Thái Đơn Hàng</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={chosenStatusOrder}
                            label="Trạng Thái Đơn Hàng"
                            onChange={handleChangeChosenStatusOrder}
                        >
                            <MenuItem value={-1}>Tất cả</MenuItem>
                            <MenuItem value={0}>Đang chờ duyệt</MenuItem>
                            <MenuItem value={1}>Đã duyệt</MenuItem>
                            <MenuItem value={2}>Đang vận chuyển</MenuItem>
                            <MenuItem value={3}>Đã giao</MenuItem>
                            <MenuItem value={4}>Đã huỷ</MenuItem>
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
                            <MenuItem value={1}>Mã đơn hàng</MenuItem>
                            <MenuItem value={2}>Mã khách hàng</MenuItem>
                            <MenuItem value={3}>Tên khách hàng</MenuItem>
                            <MenuItem value={4}>Địa chỉ giao hàng</MenuItem>
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
                <Typography variant="p"
                    sx={
                        {
                            fontSize: 30,
                            color: "var(--color4)",
                            fontWeight: "bold",
                        }
                    }
                >
                    Quản lý đơn hàng
                </Typography>
                <Divider sx={{ marginBottom: 3 }}></Divider>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#474747', color: 'white' }}>
                                <TableCell style={{ width: '5%', color: 'white' }} align="left">Mã đơn hàng</TableCell>
                                <TableCell style={{ width: '5%', color: 'white' }} align="left">Mã khách hàng</TableCell>
                                <TableCell style={{ width: '8%', color: 'white' }} align="left">Mã nhân viên</TableCell>
                                <TableCell style={{ width: '15%', color: 'white' }} align="left">Tên người nhận</TableCell>
                                <TableCell style={{ width: '12%', color: 'white' }} align="left">Phương thức</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Tổng tiền</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Ngày đặt hàng</TableCell>
                                <TableCell style={{ width: '25%', color: 'white', paddingLeft: 100 }} align="left">Thao Tác</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="center">Trạng thái đơn hàng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showOrders(handleChosenOrder(orders))}
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
                                    count={handleChosenOrder(orders).length}
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

export default OrderManagementHome