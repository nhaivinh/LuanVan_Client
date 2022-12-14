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

import ImportProductFormView from './ImportProductFormView';
import ImportProductFormAdd from './ImportProductFormAdd';
import ImportProductFormEdit from './ImportProductFormEdit';
import ImportProductFormDelete from './ImportProductFormDelete';

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

    const [chosenImportNotes, setChosenImportNotes] = React.useState([])

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
        if (result.length > 200) {
            return (
                result.slice(0, 200) + "..."
            )
        } else {
            return (
                result
            )
        }

    }

    function showFullNameProducts(IDImportNote) {
        var filteredImportNotes = detailImportNotes
        filteredImportNotes = detailImportNotes.filter(function (ImportNote) {
            return (ImportNote.id_import_note === IDImportNote)
        })
        var result = filteredImportNotes.reduce((total, currentValue) =>
            total + currentValue.name_product + " |\n", ""
        );
        return (
            result
        )
    }

    const [searchField, setSearchField] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState('');


    React.useEffect(() => {
        handleChosenImportNote(importNotes)
    }, [searchField, searchInput, resetPage])

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        setPage(0)
    }

    const handleChangeSearchField = (event) => {
        setSearchField(event.target.value);
    };

    function removeAccents(str) {
        var AccentsMap = [
            "a??????????????????????????????????????????????",
            "A??????????????????????????????????????????????",
            "d??", "D??",
            "e??????????????????????????????",
            "E??????????????????????????????",
            "i????????????",
            "I????????????",
            "o??????????????????????????????????????????????",
            "O??????????????????????????????????????????????",
            "u?????????????????????????????",
            "U?????????????????????????????",
            "y??????????????",
            "Y??????????????"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    const handleChosenImportNote = function (ImportNotes) {
        var SearchInput = removeAccents(searchInput.toLowerCase())
        var exportImportNotes = ImportNotes

        if (SearchInput !== "") {
            switch (searchField) {
                case 1:
                    exportImportNotes = exportImportNotes.filter(function (importnote) {
                        return (('' + importnote.id_import_note).includes(SearchInput))
                    })
                    break;
                case 2:
                    exportImportNotes = exportImportNotes.filter(function (importnote) {
                        return (removeAccents(importnote.name_supplier.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 3:
                    exportImportNotes = exportImportNotes.filter(function (importnote) {
                        return (removeAccents(importnote.name_staff.toLowerCase()).includes(SearchInput))
                    })
                    break;
                case 4:
                    exportImportNotes = exportImportNotes.filter(function (importnote) {
                        return (removeAccents(showFullNameProducts(importnote.id_import_note).toLowerCase()).includes(SearchInput))
                    })
                    break;
                default:
                    break;
            }
        }

        return(exportImportNotes)
    }

    const showImportNote = function (items) {
        if (items.length > 0) {
            if (rowsPerPage > 0) {
                return (
                    items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <StyledTableRow key={row.id_import_note}>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.id_import_note}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.name_supplier}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.name_staff}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {showNameProducts(row.id_import_note)}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.total_price_import.toLocaleString('vi-VI',
                                        {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {getFormattedDate(new Date(row.import_date))}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Stack direction="row" spacing={2} justifyContent={'center'}>
                                        <ImportProductFormView ImportNotes={row} />
                                        <ImportProductFormEdit ImportNote={row} handleResetPage={handleResetPage} />
                                        <ImportProductFormDelete idImportNote={row.id_import_note} handleResetPage={handleResetPage} />
                                    </Stack>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                        )
                )
            }
        } else {
            return (
                <StyledTableRow>
                    <StyledTableCell colSpan={11} component="th" scope="row" align="left">
                        Kh??ng t??m th???y k???t qu??? t????ng ???ng
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
                        <InputLabel htmlFor="outlined-adornment-search">Danh M???c</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={searchField}
                            label="Danh M???c"
                            onChange={handleChangeSearchField}
                        >
                            <MenuItem value={1}>M?? nh???p h??ng</MenuItem>
                            <MenuItem value={2}>T??n nh?? cung c???p</MenuItem>
                            <MenuItem value={3}>T??n nh??n vi??n</MenuItem>
                            <MenuItem value={4}>T??n s???n ph???m</MenuItem>
                        </Select>
                    </FormControl>
                    {/* TextField tim kiem */}
                    <FormControl sx={{ m: 1, width: '60ch' }}>
                        <InputLabel htmlFor="outlined-adornment-search">T??m Ki???m</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-search"
                            type="text"
                            label="T??m Ki???m"
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
                        Qu???n l?? nh???p h??ng
                    </Typography>
                    <ImportProductFormAdd handleResetPage={handleResetPage} />
                </Stack>
                <Divider sx={{ marginBottom: 3 }}></Divider>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#474747', color: 'white' }}>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">M?? nh???p h??ng</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">T??n nh?? cung c???p</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">T??n nh??n vi??n</TableCell>
                                <TableCell style={{ width: '30%', color: 'white' }} align="left">T??n c??c s???n ph???m </TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Ti???n nh???p h??ng</TableCell>
                                <TableCell style={{ width: '10%', color: 'white' }} align="left">Ng??y nh???p h??ng</TableCell>
                                <TableCell style={{ width: '20%', color: 'white' }} align="center">Thao t??c</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showImportNote(handleChosenImportNote(importNotes))}
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
                                    count={handleChosenImportNote(importNotes).length}
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

export default ImportProductHome