
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
import TableHead from '@mui/material/TableHead';

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

function Cart() {

    let params = useParams();

    return (
        <Box style={{ marginTop: 150 , minHeight: 700}}>
            <Container maxWidth="lg" >
                <Grid container spacing={3}>
                    <Grid item xs={8} style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                        <Box style={{}}>
                            <Typography variant="h5">Giỏ Hàng</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: '40%' }}>Thông Tin Sản Phẩm</TableCell>
                                            <TableCell style={{ width: '15%' }} align="right">Calories</TableCell>
                                            <TableCell style={{ width: '15%' }} align="right">Đơn giá</TableCell>
                                            <TableCell style={{ width: '15%' }} align="center">Số lượng</TableCell>
                                            <TableCell style={{ width: '15%' }} align="right">Thành tiền</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.calories}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.calories}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.calories}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.calories}
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item xs={4} style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: 3,
                        }}
                        >
                            <Typography variant="h5">Thanh Toán</Typography>
                            <Typography>Tổng tạm tính</Typography>
                            <Typography>Tiền vận chuyển</Typography>
                            <Typography>Thành tiền</Typography>
                            <Button> Mua Ngay</Button>
                        </Box>

                    </Grid>
                </Grid>

            </Container>
        </Box>

    )
}

export default Cart