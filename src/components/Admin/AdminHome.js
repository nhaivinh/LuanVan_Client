import { Routes, Route } from 'react-router-dom';
import React from 'react';
import '../../CSS/AdminHome.css'
import AdminHomePage from './AdminHomePage'
import ProductManagementHome from './ProductManagement/ProductManagementHome';
import StaffManagementHome from './StaffManagement/StaffManagementHome';
import OrderManagementHome from './OrderManagement/OrderManagementHome';
import ImportProductHome from './ImportProduct/ImportProductHome';
import CustomerManagementHome from './CustomerManagement/CustomerManagementHome';
import DashboardHome from './Dashboard/DashboardHome';
import StatisticHome from './Statistic/StatisticHome';


function AdminHome() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<AdminHomePage />}>
            <Route path='/dashboard' element={<DashboardHome />} />
            <Route path='/product' element={<ProductManagementHome />} />
            <Route path='/customer' element={<CustomerManagementHome />} />
            <Route path='/import' element={<ImportProductHome />} />
            <Route path='/order' element={<OrderManagementHome />} />
            <Route path='/staff' element={<StaffManagementHome />} />
            <Route path='/statistic' element={<StatisticHome />} />
          </Route>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default AdminHome;
