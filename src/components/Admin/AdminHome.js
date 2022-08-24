import { Routes, Route } from 'react-router-dom';
import React from 'react';
import '../../CSS/AdminHome.css'
import AdminHomePage from './AdminHomePage'
import ProductManagementHome from './ProductManagement/ProductManagementHome';

function AdminHome() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<AdminHomePage />}>
            {/* <Route path='admin' element={<Admin />} /> */}
            <Route path='productmanagement' element={<ProductManagementHome />} />
          </Route>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default AdminHome;
