import React, { useState } from "react";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {

    return (
        <Box style={{ backgroundColor: '#2d2d2d' , height: 200, marginTop: 20}}>
            <Container maxWidth="lg" >
                <Typography>Here Is Footer</Typography>
            </Container>
        </Box>
    );
};

export default Footer;
