import Header from './Header'
import Body from './Body';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ProductSearch from '../Customers/Products/ProductSearch';
import ProductDetails from '../Customers/Products/ProductDetails';
import Cart from '../Customers/Cart/Cart';
import Footer from './Footer';
import BuildPC from '../Customers/BuildPC/BuildPC';
import SuggestBuildPC from '../Customers/BuildPC/SuggestBuildPC';
import AccountInfo from '../Customers/Account/AccountInfo';
import OrderInfo from '../Customers/Order/OrderInfo';

// import '../../CSS/ClientHome.css'

function Home() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <Routes>
        <Route exact path='/' element={<Body />} />
        <Route exact path='/product/:productId' element={<ProductDetails />} />
        <Route exact path='/search' element={<ProductSearch />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/account' element={<AccountInfo />} />
        <Route exact path='/order' element={<OrderInfo />} />
        <Route exact path='/buildpc' element={<BuildPC />} />
        <Route exact path='/suggestbuildpc' element={<SuggestBuildPC />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;