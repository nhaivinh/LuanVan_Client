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

function ImportProductHome() {

    const [importNotes, setImportNotes] = React.useState([])

    const [detailImportNotes, setDetailImportNotes] = React.useState([])

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
        axios.get(`https://localhost:7253/api/ImportNote`)
            .then(res => {
                const ImportNotes = res.data;
                setImportNotes(ImportNotes);
            })
        axios.get(`https://localhost:7253/api/DetailImportNote`)
            .then(res => {
                const DetailImportNotes = res.data;
                setDetailImportNotes(DetailImportNotes);
            })
    }, [resetPage])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - importNotes.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function showNameProducts(IDImportNote) {
        var filteredImportNotes = detailImportNotes
        filteredImportNotes = detailImportNotes.filter(function (ImportNote) {
            return (ImportNote.id_import_note === IDImportNote)
        })
        var result = filteredImportNotes.reduce((total, currentValue) =>
            total + currentValue.name_product + " |\n", ""
        );
        return (
            result.slice(0, 200) + "..."
        )
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#474747', color: 'white' }}>
                            <TableCell style={{ width: '10%', color: 'white' }} align="left">Mã nhập hàng</TableCell>
                            <TableCell style={{ width: '10%', color: 'white' }} align="left">Mã nhà cung cấp</TableCell>
                            <TableCell style={{ width: '10%', color: 'white' }} align="left">Mã nhân viên</TableCell>
                            <TableCell style={{ width: '40%', color: 'white' }} align="left">Tên các sản phẩm </TableCell>
                            <TableCell style={{ width: '10%', color: 'white' }} align="left">Ngày nhập hàng</TableCell>
                            <TableCell style={{ width: '20%', color: 'white' }} align="left">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? importNotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : importNotes
                        ).map((row) => (
                            <StyledTableRow key={row.id_import_note}>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.id_import_note}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.id_supplier}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.id_staff}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {showNameProducts(row.id_import_note)}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {getFormattedDate(new Date(row.import_date))}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Stack direction="row" spacing={2} justifyContent={'center'}>

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
                                count={importNotes.length}
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

export default ImportProductHome