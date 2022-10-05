import { Routes, Route } from 'react-router-dom';
import React from 'react';
import '../../CSS/AdminHome.css'
import AdminHomePage from './AdminHomePage'
import ProductManagementHome from './ProductManagement/ProductManagementHome';
import StaffManagementHome from './StaffManagement/StaffManagementHome';
import OrderManagementHome from './OrderManagement/OrderManagementHome';
import ImportProductHome from './ImportProduct/ImportProductHome';
import CustomerManagementHome from './CustomerManagement/CustomerManagementHome';
import AppLayout from './Layout/AppLayout';


function AdminHome() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<AdminHomePage />}>            
            <Route path='/product' element={<ProductManagementHome />} />
            <Route path='/customer' element={<CustomerManagementHome />} />
            <Route path='/import' element={<ImportProductHome />} />
            <Route path='/order' element={<OrderManagementHome />} />
            <Route path='/staff' element={<StaffManagementHome />} />
          </Route>

          {/* <Route path='/' element={<AppLayout />}>
             <Route path='admin' element={<Admin />} />
            <Route path='/product' element={<ProductManagementHome />} />
            <Route path='/customer' element={<CustomerManagementHome />} />
            <Route path='/import' element={<ImportProductHome />} />
            <Route path='/order' element={<OrderManagementHome />} />
            <Route path='/staff' element={<StaffManagementHome />} />
          </Route> */}
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default AdminHome;
