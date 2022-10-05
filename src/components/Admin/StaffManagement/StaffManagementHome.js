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
import StaffFormView from './StaffFormView';
import StaffFormEdit from './StaffFormEdit';
import StaffFormAdd from './StaffFormAdd';

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

function StaffManagementHome() {

    const [staffs, setStaffs] = React.useState([])

    const [resetPage, setResetPage] = React.useState(false);

    function handleResetPage() {
        setResetPage(!resetPage);
    }

    React.useEffect(() => {
        axios.get(`https://localhost:7253/api/Staff`)
            .then(res => {
                const Staffs = res.data;
                setStaffs(Staffs);
            })
    }, [resetPage])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffs.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
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
                    Quản lý nhân viên
                </Typography>
                <StaffFormAdd handleResetPage={handleResetPage}/>
            </Stack>
            <Divider sx={{ marginBottom: 3 }}></Divider>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#474747', color: 'white' }}>
                            <TableCell style={{ width: '5%', color: 'white' }} align="left">Mã</TableCell>
                            <TableCell style={{ width: '15%', color: 'white' }} align="left">Tên nhân viên</TableCell>
                            <TableCell style={{ width: '10%', color: 'white' }} align="left">Email</TableCell>
                            <TableCell style={{ width: '10%', color: 'white' }} align="left">Chức vụ</TableCell>
                            <TableCell style={{ width: '10%', color: 'white' }} align="left">CCCD</TableCell>
                            <TableCell style={{ width: '10%', color: 'white' }} align="left">Số điện thoại</TableCell>
                            <TableCell style={{ width: '20%', color: 'white' }} align="left">Địa chỉ</TableCell>
                            <TableCell style={{ width: '10%', color: 'white' }} align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? staffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : staffs
                        ).map((row) => (
                            <StyledTableRow key={row.id_staff}>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.id_staff}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.name_staff}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.email_staff}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.position}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.identity_card_staff}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.phone_number_staff}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.address_staff}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Stack direction="row" spacing={2} justifyContent={'center'}>
                                        <StaffFormView Staff={row} />
                                        <StaffFormEdit Staff={row} handleResetPage={handleResetPage} />
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
                                count={staffs.length}
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

export default StaffManagementHome