
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

function ProductDetails() {

    let params = useParams();

    return (
        <Box style={{ marginTop: 150 }}>
            <Container maxWidth="lg" style={{ backgroundColor : 'white' , borderRadius: '10px'}}>
                <Box style={{ border: '1px solid', height: 400 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={5}>
                            <Box style={{}}>
                                image product {params.productId}
                            </Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box style={{}}>
                                <Typography variant="h4"> Tên Sản Phẩm: </Typography>
                                <Typography variant="h5"> Thương Hiệu: </Typography>
                                <Typography variant="h5"> Bảo Hành: </Typography>
                                <Typography variant="h5"> Giá:</Typography>
                                <Button>Mua Ngay</Button>
                                <Button>Thêm Vào Giỏ Hàng</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ border: '1px solid' , marginTop: 20}}>
                    <Typography variant="h5">Thông Số Kỹ Thuật</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ width: '50%' , backgroundColor : 'lightgrey'}}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left" style={{ width: '50%'}}>{row.calories}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </Box>

    )
}

export default ProductDetails