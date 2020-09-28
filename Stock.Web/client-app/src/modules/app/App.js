import React from "react";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";

import Layout from "../../components/Layout";
import HomePage from "../home/container/HomePage";
import LoginPage from "../auth/containers/LoginPage";
import ProviderPage from "../providers/page";
import LogoutPage from "../auth/containers/LogoutPage";
<<<<<<< HEAD
import StorePage from "../stores/page";
import ProductTypePage from "../productTypes/page";
import ProductPage from "../products/page";
=======
import ProductTypePage from "../productType/page";
import StorePage from "../stores/page";
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4

import PropTypes from "prop-types";

const Private = props => {
  if (localStorage.getItem("JWT_LOGIN")) {
    return props.children;
  }
  return <LoginPage />;
};

const App = props => (
  <Private>
    <Layout {...props}>
      <Route exact path="/" component={HomePage} />
      <Route path="/provider" component={ProviderPage} />
<<<<<<< HEAD
      <Route path="/store" component={StorePage} />
      <Route path="/productType" component={ProductTypePage} />
      <Route path="/product" component={ProductPage} />
      <Route path="/logout" component={LogoutPage} />
=======
      <Route path="/logout" component={LogoutPage} />
      <Route path="/product-type" component={ProductTypePage} />
      <Route path="/store" component={StorePage} />
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
    </Layout>
    <ToastContainer autoClose={2000} />
  </Private>
);

Private.propTypes = {
  children: PropTypes.array
};

App.displayName = "App";
export default App;
