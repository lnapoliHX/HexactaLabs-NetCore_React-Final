import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { goBack, push } from "connected-react-router";
import { create } from "../../../orders/checkout";
/*
import { push } from "connected-react-router";
import { Route } from "react-router-dom";

import { getOrderById } from "../../list/index";
*/
import Presentation from "../presentation";
/*
import Remove from "../../remove/container";
*/
import { getAllData } from "../../list/index";

export class ProductsCheckoutPage extends Component {
  createOrder = () => {
    this.props.create(this.props.order)
      .then(response => {
        let requestedOrder = response.data.requestedOrder;
        let orderTotal = 0;
        let items = requestedOrder.items.map(item => {
          const itemTotal = item.salePrice * item.quantity;
          orderTotal += itemTotal;
          return {
            ...item,
            total: itemTotal
          }});
        requestedOrder = {
          ...requestedOrder,
          items: items,
          total: orderTotal
        };
        
        
        let okOrder = response.data.resultOrder;
        orderTotal = 0;
        items = okOrder.items.map(item => {
          const itemTotal = item.salePrice * item.quantity;
          orderTotal += itemTotal;
          return {
            ...item,
            total: itemTotal
          }});
        okOrder = {
          ...okOrder,
          items: items,
          total: orderTotal
        };

        this.props.resetCart();
        this.props.getAllData();
        this.props.handleResponse(requestedOrder, okOrder);
        this.props.push('/product/checkoutResult');
      });
    
  }

  render() {
    return (
      <React.Fragment>
        <Presentation order={this.props.order} {...this.props} 
                      onSubmit={() => this.createOrder()} 
                      handleCancel={() => this.props.goBack()}/>
      </React.Fragment>
    );
  }
}

ProductsCheckoutPage.propTypes = {
  order: PropType.object.isRequired
};
/*
const mapStateToProps = (state, ownProps) => {
  const order = getOrderById(state, ownProps.match.params.id);
  return {
    order: order,
  };
};
*/
const mapDispatchToProps = {
  create,
  goBack,
  push,
  getAllData
};

export default connect(
  null,
  mapDispatchToProps
)(ProductsCheckoutPage);


