import { Container } from "@material-ui/core"
import { Box, Button, Grid, makeStyles, Typography, IconButton } from "@mui/material"
import { borderRadius, display, height, padding, width } from "@mui/system"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

function BuildPC() {

    function incCPU() {
        let number = document.querySelector('[id="quantityCPU"]');
        number.value = parseInt(number.value) + 1;
    }

    function decCPU() {
        let number = document.querySelector('[id="quantityCPU"]');
        if (parseInt(number.value) > 0) {
            number.value = parseInt(number.value) - 1;
        }
    }

    function incMain() {
        let number = document.querySelector('[id="quantityMain"]');
        number.value = parseInt(number.value) + 1;
    }

    function decMain() {
        let number = document.querySelector('[id="quantityMain"]');
        if (parseInt(number.value) > 0) {
            number.value = parseInt(number.value) - 1;
        }
    }
    return (
        <Container maxWidth="lg" style={{ backgroundColor: 'rgb(248, 248, 252)', borderRadius: '10px' }}>
            <Box
                style={{
                    display: 'flex',
                    height: 50,
                    alignItems: 'center'
                }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/">
                        <Typography color="text.primary">Trang Chủ</Typography>
                    </Link>
                    <Typography color="text.primary">Xây Dựng Cấu Hình</Typography>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={2} minHeight={600}>
                <Grid item xs={8}>
                    <Box>
                        <Box style={{
                            width: '95%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Vi xử lý</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                            }}>
                                {/* <img src={require('../../../images/Icon/cpu.svg').default} width={'100%'} /> */}
                                <img src={require('../../../images/Products/CPU/AMD Ryzen 5 3500_1.webp')} width={'100%'} />
                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {/* <Typography>Vui lòng chọn linh kiện</Typography> */}
                                <Box style={{
                                    display: 'flex'
                                }}>
                                    <Box style={{
                                        flexBasis: '60%'
                                    }}>
                                        <Typography variant="body2">CPU Intel Core I5-7500 (3.4GHz - 3.8GHz)</Typography>
                                    </Box>
                                    <Box style={{
                                        flexBasis: '20%',
                                        display: 'flex'
                                    }}>
                                        {/* <input type='number' id="quantityCPU" /> */}
                                        <Box className="quantity" style={{
                                            border: '2px solid orange',
                                            borderRadius: 5,
                                        }}>
                                            <IconButton onClick={decCPU} size="small">-</IconButton>
                                            <input name="number" className="quantityInputNumber" type="text" id="quantityCPU" readOnly value="0" />
                                            <IconButton onClick={incCPU} size="small">+</IconButton>
                                        </Box>
                                    </Box>
                                    <Box style={{
                                        flexBasis: '20%'
                                    }}>
                                        <Typography>5.970.000đ</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={{
                                width: '5%',
                            }}>
                                <Button variant="contained">
                                    Chọn
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Box style={{
                            width: '95%',
                            height: 150,
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingRight: 20,

                        }}>
                            <Box style={{
                                width: '10%',
                                padding: 20
                            }}>
                                <Typography>Bo mạch chủ</Typography>
                            </Box>
                            <Box style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                width: 100,
                            }}>
                                <img src={require('../../../images/Icon/main.svg').default} width={'100%'} />
                            </Box>
                            <Box style={{
                                width: '60%',
                                paddingLeft: 20
                            }}>
                                {/* <Typography>Vui lòng chọn linh kiện</Typography> */}
                                <Box style={{
                                    display: 'flex'
                                }}>
                                    <Box style={{
                                        flexBasis: '60%'
                                    }}>
                                        <Typography variant="body2">CPU Intel Core I5-7500 (3.4GHz - 3.8GHz)</Typography>
                                    </Box>
                                    <Box style={{
                                        flexBasis: '20%',
                                        display: 'flex'
                                    }}>
                                        {/* <input type='number' id="quantityCPU" /> */}
                                        <Box style={{
                                            border: '1px solid'
                                        }}>
                                            <button onClick={decMain}>-</button>
                                            <input name="number" className="quantityInputNumber" type="text" id="quantityMain" readOnly value="0" />
                                            <button onClick={incMain}>+</button>
                                        </Box>
                                    </Box>
                                    <Box style={{
                                        flexBasis: '20%'
                                    }}>
                                        <Typography>5.970.000đ</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box style={{
                                width: '5%',
                            }}>
                                <Button variant="contained">
                                    Chọn
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box style={{
                        position: 'fixed',
                        height: 200,
                        backgroundColor: 'white',
                        marginTop: 20,
                        width: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                        <Typography>Chi phí dự tính: </Typography>
                        <Typography> 2.000.000đ</Typography>
                        <Button variant="outlined" style={{
                            width: "200px",
                        }}>
                            Thêm vào giỏ hàng
                        </Button>
                        <Button variant="contained" style={{
                            width: "200px",
                        }}>
                            Mua ngay
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default BuildPC