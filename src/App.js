import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/home/Home'
import './CSS/App.css'
import Header from './components/home/Header';
import Body from './components/home/Body';
import Footer from './components/home/Footer';
import ProductDetails from './components/Customers/Products/ProductDetails';
import PageNotFound from './components/PageNotFound';
import ProductByType from './components/Customers/Products/ProductByType';
import AdminHomePage from './components/Admin/AdminHomePage';
import Cart from './components/Customers/Cart/Cart';
import ScrollButton from './components/Customers/ScrollToTopButton/ScrollButton';

class App extends React.Component {
  componentDidMount() {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "6135e6af-b972-4c0a-a7c6-7c2cd288a746";

    (function () {
      var d = document;
      var s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  };


  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Routes>
            <Route exact path='/*' element={<Home />} />
            <Route exact path='/admin/*' element={<AdminHomePage />} />
            <Route exact path='*' element={<PageNotFound />} />
          </Routes>
        </React.Fragment>
        <ScrollButton />
      </div>
    );
  }
}
export default App

