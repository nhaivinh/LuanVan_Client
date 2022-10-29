import axios from 'axios';
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
import { actions, useStore } from '../Store';

function AdminHome() {

  const [, dispatch] = useStore()


  React.useEffect(() => {
    axios.get(`https://localhost:7253/api/Product/`)
      .then(res => {
        const Products = res.data;
        dispatch(actions.loadProduct(Products))
      })
  }, [])

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
