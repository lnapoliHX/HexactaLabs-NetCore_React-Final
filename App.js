import React, { useState } from "react";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";

import Layout from "../../components/Layout";
import HomePage from "../home/container/HomePage";
import LoginPage from "../auth/containers/LoginPage";
import ProviderPage from "../providers/page";
import LogoutPage from "../auth/containers/LogoutPage";
import StorePage from "../stores/page";
import ProductTypePage from "../productTypes/page";
import ProductPage from "../products/page";
import OrderPage from "../orders/page";

import PropTypes from "prop-types";

import { connect } from "react-redux";

const Private = props => {
  if (localStorage.getItem("JWT_LOGIN")) {
    return props.children;
  }
  return <LoginPage />;
};

const initialState = {
  order: {
    id: 'Nueva Orden',
    customerId: 'admin',
    date: "",
    total: 0,
    items: []
  },
  orderedItems: {}
};

const App = props => {
  const [order, setOrder] = useState(initialState.order);

  const handleAddItemToCart = (productId, productName, salePrice, stock, quantity) => {
    salePrice = Number.parseInt(salePrice);
    stock = Number.parseInt(stock);
    quantity = Number.parseInt(quantity);
    /*
    console.log('Agregando Item al Carrito');
    console.log('Product id***:', productId);
    console.log('Product Quantity: ', quantity);
    console.log('Ordered Items: ', props.orderedItems);
    console.log('Order: ', props.order);
    */
    let localOrder = order;

    let verifiedQuantity = stock >= quantity ? quantity : stock;
    let localItem = {
      productId: productId,
      productName: productName,
      salePrice: salePrice,
      quantity: verifiedQuantity,
      total: salePrice * verifiedQuantity
    };
    let idx = localOrder.items.findIndex(item => item.productId === productId);
    if (idx >= 0) 
      localOrder.items[idx] = localItem;
    else
      localOrder.items.push(localItem);

    const totalOrder = localOrder.items.map(item => item.total).reduce((a, b) => a + b);

     setOrder({
      ...localOrder, 
      items: localOrder.items,
      total: totalOrder
    });   
  }

  const handleResetCart = () => {
    setOrder({
      id: 'Nueva Orden',
      customerId: 'admin',
      date: "",
      total: 0,
      items: []
    });
  }

  const productQuantity = () => {
    const itemQuantityArray = order.items.map(item => item.quantity);
    return itemQuantityArray.length > 0 ? itemQuantityArray.reduce((a, b) => a + b) : 0;

  }
  
  return (
    <Private>
      <Layout {...props} productQuantity={productQuantity}>
        <Route exact path="/" component={HomePage} />
        <Route path="/provider" component={ProviderPage} />
        <Route path="/store" component={StorePage} />
        <Route path="/productType" component={ProductTypePage} />
        <Route path="/product" 
          render={(props) => <ProductPage {...props} onAddItemToCart={handleAddItemToCart} 
                                order={order} resetCart={handleResetCart}/>}/>
        <Route path="/order" component={OrderPage}/>
        <Route path="/logout" component={LogoutPage} />
      </Layout>
      <ToastContainer autoClose={2000} />
    </Private>
  );
}


Private.propTypes = {
  children: PropTypes.array
};

const mapStateToProps = () => {
  return initialState;
}

App.displayName = "App";
//export default App;

export default connect(
  mapStateToProps,
  null
)(App);
