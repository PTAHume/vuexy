import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Layout from '@layouts/VerticalLayout';
import navigation from '@src/navigation/vertical';
import navigationUser from '@src/navigation/frontend-vertical';
import { useSelector } from 'react-redux';
import { isAdminUserLoggedIn } from '../utility/Utils';

const VerticalLayout = (props) => {
  const location = useLocation();

  // const state = useSelector((state) => state);
  // const isAdminLoggedIn = isAdminUserLoggedIn(state);
  const isAdminRoute = (path) => {
    // Replace '/admin' with the appropriate path prefix for your admin panel routes
    return path.startsWith('/admin');
  };

  const getMenuData = () => {
    if ( isAdminRoute(location.pathname)) {
      return navigation; // Show admin menu
    } else {
      return navigationUser; // Show user menu
    }
  };

  return (
    <Layout menuData={getMenuData()} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
