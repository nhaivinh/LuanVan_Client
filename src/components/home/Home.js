import Header from './Header'
import Body from './Body';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ProductSearch from '../Customers/Products/ProductSearch';
import ProductDetails from '../Customers/Products/ProductDetails';
import Cart from '../Customers/Cart/Cart';
import Footer from './Footer';
import BuildPC from '../Customers/BuildPC/BuildPC';
import AccountInfo from '../Customers/Account/AccountInfo';
import OrderInfo from '../Customers/Order/OrderInfo';
import Checkout from '../Customers/Checkout/Checkout';
import Login from '../Customers/Account/Login';
import Register from '../Customers/Account/Register'
// import '../../CSS/ClientHome.css'
import './home.scss'
import AutoBuildPC from '../Customers/AutoBuildPC/AutoBuildPC';

function Home() {

  const [resetPage, setResetPage] = React.useState(false);

  function handleResetPage() {
    setResetPage(!resetPage);
  }

  React.useEffect(() => {
    document.body.className = 'clientCustomer';
  }, []);

  return (
    <div>
      <header>
        <Header resetPage={resetPage} handleResetPage={handleResetPage} />
      </header>
      <Routes>
        <Route exact path='/' element={<Body />} />
        <Route exact path='/login' element={<Login resetPage={resetPage} handleResetPage={handleResetPage} />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/product/:productId' element={<ProductDetails resetPage={resetPage} handleResetPage={handleResetPage} />} />
        <Route exact path='/search' element={<ProductSearch />} />
        <Route exact path='/cart' element={<Cart resetPage={resetPage} handleResetPage={handleResetPage}/>} />
        <Route exact path='/account' element={<AccountInfo />} />
        <Route exact path='/order' element={<OrderInfo />} />
        <Route exact path='/checkout' element={<Checkout />} />
        <Route exact path='/buildpc' element={<BuildPC />} />
        <Route exact path='/suggestbuildpc' element={<AutoBuildPC />} />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;