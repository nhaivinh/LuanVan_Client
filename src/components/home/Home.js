import Header from './Header'
import Body from './Body';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ProductByType from '../Customers/Products/ProductByType';
import ProductDetails from '../Customers/Products/ProductDetails';
import Cart from '../Customers/Cart/Cart';
import Footer from './Footer';
function Home() {
    return(
        <div>
          <header><Header /></header>
          <Routes>
            <Route exact path='/' element={<Body />} />
            <Route exact path='/product/:productId' element={<ProductDetails />} />
            <Route exact path='/productByType/:productType' element={<ProductByType />} />
            <Route exact path='/cart' element={<Cart />} />
          </Routes>
          <footer><Footer /></footer>
        </div>
    )
}

export default Home;