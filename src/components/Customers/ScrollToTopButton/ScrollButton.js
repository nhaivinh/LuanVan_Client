import React, { useState } from 'react';

import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import Box from '@mui/material/Box';

import { Button } from './Styles';


const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
                in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button>
            <Box style={{
                display: visible ? 'inline' : 'none',
                backgroundColor: 'white',
                borderRadius: '50%'
            }}>
                <ArrowUpwardTwoToneIcon
                    onClick={scrollToTop}
                    fontSize="large"
                />
            </Box>
        </Button >
    );
}

export default ScrollButton;
