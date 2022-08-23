import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link, Outlet } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import MemoryIcon from '@mui/icons-material/Memory';
import CatergoryList from './CategoryList';

import {
  Grid,
  Box,
  Container,
} from '@material-ui/core'
import Slider from '../Customers/SliderImage/Slider';
import { width } from '@mui/system';
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    margin: theme.spacing(5),
  },
  media: {
    height: 300,
  },
}));


const Body = () => {
  return (
    <Box style={{}}>
      <Container maxWidth="lg">
        <Box style={{ position: 'absolute', width: '100%', left: 0, zIndex: '-1' }}>
          <Slider />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <CatergoryList />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Box style={{ display: 'flex', flexWrap: 'wrap', marginTop: 50 }}>
          <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', alignItems: 'center' }}>
            <Link to="/productByType/cpu" >
              <img
                src="https://lh3.googleusercontent.com/ALoolTUg2Y5oRNEJNJjbUC3e6joNFwiY9zX9rB0EI1riSVZvlLq7jJ579KG_55RSCS0ObvlHKnaRoF5kmJmNamMEqavd4vRi=rw-w308"
                width={'80%'}
              />
            </Link>
          </Box>
          <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', alignItems: 'center' }}>
            <Link to="/productByType/gpu" >
              <img
                src="https://lh3.googleusercontent.com/ALoolTUg2Y5oRNEJNJjbUC3e6joNFwiY9zX9rB0EI1riSVZvlLq7jJ579KG_55RSCS0ObvlHKnaRoF5kmJmNamMEqavd4vRi=rw-w308"
                width={'80%'}
              />
            </Link>
          </Box>
          <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', alignItems: 'center' }}>
            <Link to="/productByType/ram" >
              <img
                src="https://lh3.googleusercontent.com/ALoolTUg2Y5oRNEJNJjbUC3e6joNFwiY9zX9rB0EI1riSVZvlLq7jJ579KG_55RSCS0ObvlHKnaRoF5kmJmNamMEqavd4vRi=rw-w308"
                width={'80%'}
              />
            </Link>
          </Box>
          <Box style={{ display: 'flex', flexBasis: '25%', flexDirection: 'column', alignItems: 'center' }}>
            <Link to="/productByType/main" >
              <img
                src="https://lh3.googleusercontent.com/ALoolTUg2Y5oRNEJNJjbUC3e6joNFwiY9zX9rB0EI1riSVZvlLq7jJ579KG_55RSCS0ObvlHKnaRoF5kmJmNamMEqavd4vRi=rw-w308"
                width={'80%'}
              />
            </Link>
          </Box>
        </Box>
      </Container>
      <Container>
        <Box style={{ height: 500 }}>
          here
        </Box>
      </Container>
    </Box>
  );
};

export default Body;

