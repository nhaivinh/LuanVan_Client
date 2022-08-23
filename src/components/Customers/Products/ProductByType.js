
import { useParams } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


//Test 
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ProductByType() {

    let params = useParams();

    return (
        <Box style={{}}>
            <Container maxWidth="lg" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                <Box style={{}}>
                    Bộ Lọc {params.productType}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ width: '20%' }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left" style={{ width: '80%' }}>
                                            <Button variant="outlined" style={{ marginLeft: 10 }}>
                                                {row.calories}
                                            </Button>
                                            <Button variant="outlined" style={{ marginLeft: 10 }}>
                                                {row.calories}
                                            </Button>
                                            <Button variant="outlined" style={{ marginLeft: 10 }}>
                                                {row.calories}
                                            </Button>
                                            <Button variant="outlined" style={{ marginLeft: 10 }}>
                                                {row.calories}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                    <Typography>Sắp xếp Theo: </Typography>
                    <Button variant="outlined" style={{ marginLeft: 10 }}>
                        Giá giảm dần
                    </Button>
                    <Button variant="outlined" style={{ marginLeft: 10 }}>
                        Giá Tăng dần
                    </Button>
                    <Button variant="outlined" style={{ marginLeft: 10 }}>
                        Khuyến mãi tốt nhất
                    </Button>
                </Box>
                <Box style={{ display: 'flex', flexWrap: 'wrap'}}>
                    <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', paddingTop: 20, alignItems: 'center' }}>
                        <img
                            src="https://lh3.googleusercontent.com/Omba4ZoTRs4tR_2u3eD7455PuuwCyoHXLF5rfn0vi9v6H2k_ji_RrYzyVWw9g2P8JmbKDQ16Q17q31IiFgC1=w500-rw"
                            width={'80%'}
                        />
                        <Typography>Tên sản phẩm</Typography>   
                        <Typography>1.200.000đ</Typography>  
                    </Box>
                    <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', paddingTop: 20, alignItems: 'center' }}>
                        <img
                            src="https://lh3.googleusercontent.com/Omba4ZoTRs4tR_2u3eD7455PuuwCyoHXLF5rfn0vi9v6H2k_ji_RrYzyVWw9g2P8JmbKDQ16Q17q31IiFgC1=w500-rw"
                            width={'80%'}
                        />
                        <Typography>Tên sản phẩm</Typography>   
                        <Typography>1.200.000đ</Typography>  
                    </Box>
                    <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', paddingTop: 20, alignItems: 'center' }}>
                        <img
                            src="https://lh3.googleusercontent.com/Omba4ZoTRs4tR_2u3eD7455PuuwCyoHXLF5rfn0vi9v6H2k_ji_RrYzyVWw9g2P8JmbKDQ16Q17q31IiFgC1=w500-rw"
                            width={'80%'}
                        />
                        <Typography>Tên sản phẩm</Typography>
                        <Typography>1.200.000đ</Typography>
                    </Box>
                    <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', paddingTop: 20, alignItems: 'center' }}>
                        <img
                            src="https://lh3.googleusercontent.com/Omba4ZoTRs4tR_2u3eD7455PuuwCyoHXLF5rfn0vi9v6H2k_ji_RrYzyVWw9g2P8JmbKDQ16Q17q31IiFgC1=w500-rw"
                            width={'80%'}
                        />
                        <Typography>Tên sản phẩm</Typography>
                        <Typography>1.200.000đ</Typography>
                    </Box>
                    <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', paddingTop: 20, alignItems: 'center' }}>
                        <img
                            src="https://lh3.googleusercontent.com/Omba4ZoTRs4tR_2u3eD7455PuuwCyoHXLF5rfn0vi9v6H2k_ji_RrYzyVWw9g2P8JmbKDQ16Q17q31IiFgC1=w500-rw"
                            width={'80%'}
                        />
                        <Typography>Tên sản phẩm</Typography>   
                        <Typography>1.200.000đ</Typography>  
                    </Box>
                    <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', paddingTop: 20, alignItems: 'center' }}>
                        <img
                            src="https://lh3.googleusercontent.com/Omba4ZoTRs4tR_2u3eD7455PuuwCyoHXLF5rfn0vi9v6H2k_ji_RrYzyVWw9g2P8JmbKDQ16Q17q31IiFgC1=w500-rw"
                            width={'80%'}
                        />
                        <Typography>Tên sản phẩm</Typography>   
                        <Typography>1.200.000đ</Typography>  
                    </Box>
                </Box>
            </Container>
        </Box>

    )
}

export default ProductByType