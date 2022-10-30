import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/home/Home'
import './CSS/App.css'
import PageNotFound from './components/PageNotFound';
import AdminHome from './components/Admin/AdminHome';
import ScrollButton from './components/Customers/ScrollToTopButton/ScrollButton';
import { StoreProvider } from './components/Store';
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
          <StoreProvider>
            <Routes>
              <Route exact path='/*' element={<Home />} />
              <Route exact path='/admin/*' element={<AdminHome />} />
            </Routes>
          </StoreProvider>
        </React.Fragment>
        <ScrollButton />
      </div>
    );
  }
}
export default App

