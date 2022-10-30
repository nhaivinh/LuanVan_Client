import React, { useState } from "react";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Footer = () => {

    return (
        <Box style={{ backgroundColor: '#2d2d2d', height: 200, marginTop: 20 }}>
            <Container maxWidth="xl" >
                <Grid container style={{ paddingTop: 20 }}>
                    <Grid item xs={3}>
                        <Box
                            style={{
                                display: 'flex',
                                paddingTop: 2,
                                paddingTop: 5,
                                marginRight: 20,
                                paddingBottom: 15
                            }}>
                            <img src={require('../../images/Logo/logoPCOrange.png')} width='70%' />
                        </Box>
                        <Box
                            style={{ display: 'flex', justifyContent: 'space-around', marginRight: 120, marginTop: 20 }}
                        >
                            <YouTubeIcon sx={{ color: 'orange' }} />
                            <FacebookIcon sx={{ color: 'orange' }} />
                            <TwitterIcon sx={{ color: 'orange' }} />
                            <InstagramIcon sx={{ color: 'orange' }} />
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant={'h6'} sx={{ color: 'orange', marginBottom: 2 }}><b>Danh mục</b></Typography>

                        <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>Sản phẩm</Typography>
                        <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>Xây dựng cấu hình</Typography>
                        <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>Tư vấn cấu hình</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant={'h6'} sx={{ color: 'orange', marginBottom: 2 }}><b>Thông tin</b></Typography>

                        <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>Chính sách bảo hành</Typography>
                        <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>Chính sách bảo mật</Typography>
                        <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>About Us</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant={'h6'} sx={{ color: 'orange', marginBottom: 2 }}><b>Liên hệ</b></Typography>
                        <Box style={{ display: 'flex'}}>
                            <LocationOnIcon sx={{ color: 'orange'}}/>
                            <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>&nbsp; Địa chỉ: Hưng Phú, Cái Răng, Cần Thơ</Typography>
                        </Box>
                        <Box style={{ display: 'flex' }}>
                            <LocalPhoneIcon sx={{ color: 'orange'}}/>
                            <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>&nbsp; Hotline: 0939450413</Typography>
                        </Box>
                        <Box style={{ display: 'flex' }}>
                            <EmailIcon sx={{ color: 'orange'}}/>
                            <Typography variant={'body1'} sx={{ color: 'orange', marginBottom: 1 }}>&nbsp; Email: VinhB1805938@student.ctu.edu.vn</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
