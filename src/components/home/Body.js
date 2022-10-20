import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CatergoryList from './CategoryList';
import {
  Grid,
  Box,
} from '@material-ui/core'
import Slider from '../Customers/SliderImage/Slider';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Typography } from '@mui/material';
import { borderBottomColor } from '@mui/system';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    paritialVisibilityGutter: 30
  }
};

const Body = () => {

  const [discountProducts, setDiscountProducts] = React.useState([])

  React.useEffect(() => {
    axios.get(`https://localhost:7253/api/Product/discountProduct`)
      .then(res => {
        const Products = res.data;
        setDiscountProducts(Products)
      })
  }, [])
  return (
    <Box>
      <Container maxWidth="xl" style={{ minHeight: 1000}}>
        <Box style={{ position: 'absolute', width: '100%', left: 0, zIndex: '-1' }}>
          <Slider />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <CatergoryList />
          </Grid>
        </Grid>
        <Box style={{
          marginTop: 105,
          borderRadius: 10,
          paddingTop: 20,
          padding: 20,
          backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/175/524/956/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-preview.jpg")'
        }}>
          <Box
            style={{
              display: 'flex',
              paddingBottom: 10,
              width: '100%',
              justifyContent: ' space-between',
            }}>
            <Typography variant='h6' style={{ color: 'white' }}>
              <b>Ưu đãi cực sốc</b>
            </Typography>
            <Link to="/search" >
              <Typography variant='h6' style={{ color: 'white' }}>
                <b>Xem thêm</b>
              </Typography>
            </Link>
          </Box>
          <Carousel
            ssr
            partialVisible
            deviceType={'desktop'}
            itemClass="image-item"
            responsive={responsive}
          >
            {discountProducts.map(Product => {
              return (
                <Box
                  key={Product.id_product}
                  style={{
                    display: 'flex',
                    marginBottom: 2,
                    width: 'calc(100% - 50px)',
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    paddingLeft: 20,
                    paddingRight: 20
                  }}>
                  <Link to={"/product/" + Product.id_product}>
                    <Box
                      key={Product.id_product}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Box
                        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {Product.picture_product !== null ?
                          <img
                            draggable={false}
                            style={{ width: "80%", height: "80%" }}
                            src={Product.picture_product} alt="product" />
                          :
                          <img
                            draggable={false}
                            style={{ width: "80%", height: "80%" }}
                            src={"data:image/png;base64, " + Product.picture_link_product} alt="product" />
                        }
                        {Product.discount_product !== 0 &&
                          <Box
                            style={{
                              position: 'absolute',
                              bottom: '0px',
                              left: '0px',
                            }}
                          >
                            <Box
                              style={{
                                display: 'flex',
                                width: '100px',
                                height: '45px',
                                borderRadius: 5,
                                backgroundColor: 'red',
                                flexDirection: 'column',
                                paddingLeft: 10
                              }}
                            >
                              <Typography variant='body2' style={{ color: 'yellow' }}><b>Tiết kiệm</b></Typography>
                              <Typography variant='body1' style={{ color: 'white' }}>
                                <b>
                                  {(Product.unit_price_product * (Product.discount_product * 0.01)).toLocaleString('vi-VI',
                                    {
                                      style: 'currency',
                                      currency: 'VND'
                                    })}
                                </b>
                              </Typography>
                            </Box>
                          </Box>
                        }
                      </Box>
                      <Box
                        key={Product.id_product}
                        style={{
                          display: 'flex',
                          width: '100%',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          paddingTop: 10,
                        }}
                      >
                        <Typography variant='body2' style={{ color: 'black' }}>{Product.name_product}</Typography>
                        <Typography variant="h6" style={{ color: 'blue' }}>{
                          (Product.unit_price_product * (1 - Product.discount_product * 0.01)).toLocaleString('vi-VI',
                            {
                              style: 'currency',
                              currency: 'VND'
                            })}
                        </Typography>
                        {Product.discount_product !== 0 &&
                          <Typography variant='body2' style={{ color: 'black' }}>
                            <del>
                              {Product.unit_price_product.toLocaleString('vi-VI',
                                {
                                  style: 'currency',
                                  currency: 'VND'
                                })}
                            </del>
                            &nbsp;
                            -{Product.discount_product}%
                          </Typography>
                        }
                      </Box>
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Carousel>
        </Box>
      </Container>
      {/* <Container maxWidth="xl">
        <Box style={{ display: 'flex', flexWrap: 'wrap', marginTop: 50 }}>
          <Box style={{ display: 'flex', flexBasis: '25%', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/productByType/cpu" >
              <img
                src="https://lh3.googleusercontent.com/ALoolTUg2Y5oRNEJNJjbUC3e6joNFwiY9zX9rB0EI1riSVZvlLq7jJ579KG_55RSCS0ObvlHKnaRoF5kmJmNamMEqavd4vRi=rw-w308"
                width={'100%'}
              />
            </Link>
          </Box>
          <Box style={{ display: 'flex', flexBasis: '25%', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/productByType/gpu" >
              <img
                src="https://lh3.googleusercontent.com/ALoolTUg2Y5oRNEJNJjbUC3e6joNFwiY9zX9rB0EI1riSVZvlLq7jJ579KG_55RSCS0ObvlHKnaRoF5kmJmNamMEqavd4vRi=rw-w308"
                width={'100%'}
              />
            </Link>
          </Box>
          <Box style={{ display: 'flex', flexBasis: '25%', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/productByType/ram" >
              <img
                src="https://lh3.googleusercontent.com/ALoolTUg2Y5oRNEJNJjbUC3e6joNFwiY9zX9rB0EI1riSVZvlLq7jJ579KG_55RSCS0ObvlHKnaRoF5kmJmNamMEqavd4vRi=rw-w308"
                width={'100%'}
              />
            </Link>
          </Box>
          <Box style={{ display: 'flex', flexBasis: '25%', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/productByType/main" >
              <img
                src="https://lh3.googleusercontent.com/ALoolTUg2Y5oRNEJNJjbUC3e6joNFwiY9zX9rB0EI1riSVZvlLq7jJ579KG_55RSCS0ObvlHKnaRoF5kmJmNamMEqavd4vRi=rw-w308"
                width={'100%'}
              />
            </Link>
          </Box>
        </Box>
      </Container> */}
      <Container maxWidth="xl">

      </Container>
    </Box>
  );
};

export default Body;

