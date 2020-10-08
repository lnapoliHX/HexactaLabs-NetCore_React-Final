import "./products.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import List from "../list/container";
import View from "../view/container";
import Create from "../create/container";
import Update from "../update/container";
import Remove from "../remove/container";
import OrderCheckout from "../checkout/container";
import CheckoutResult from "../checkoutResult/container";
import { getLoading, getAllData } from "../list";
import Spinner from "../../../components/loading/spinner";

export class Page extends Component {
  componentDidMount() {
    this.props.getAllData();
  }

  state = {
    requestedOrder: {},
    okOrder: {},
  }

  handleCheckoutResponse = (requestedOrder, okOrder) => {
    this.setState({
      requestedOrder: requestedOrder,
      okOrder: okOrder  
    })
  }

  render() {
    const urls = {
      view: `${this.props.match.url}/view/:id`,
      create: `${this.props.match.url}/create`,
      edit: `${this.props.match.url}/update/:id`,
      remove: `${this.props.match.url}/remove/:id`,
      checkout: `/product/checkout`,
      checkoutResult: `/product/checkoutResult`,
    };

    return (
      <Spinner loading={this.props.loading}>
        <Switch>
          <Route path={urls.view} component={View} />
          <Route path={urls.create} component={Create} />
          <Route path={urls.checkout} 
            render={() => <OrderCheckout order={{...this.props.order,
                                         items: this.props.order.items.filter(item => item.quantity !== 0
                                         )}} 
                                          resetCart={this.props.resetCart}
                                          handleResponse={this.handleCheckoutResponse} />} />
          <Route path={urls.checkoutResult} 
            render={() => <CheckoutResult 
                            okOrder={this.state.okOrder} 
                            requestedOrder={this.state.requestedOrder}/>} />
          <Route path={urls.edit} component={Update} />
          <Route
            render={() => <List urls={urls} 
                            loading={this.props.loading} 
                            order={{...this.props.order,
                              items: this.props.order.items.filter(item => item.quantity !== 0
                              )}}
                            onAddItemToCart={this.props.onAddItemToCart}/>}
          />
        </Switch>
        <Route path={urls.remove} component={Remove} />
      </Spinner>
    );
  }
}

Page.propTypes = {
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getAllData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { loading: getLoading(state) };
};

const mapDispatchToProps = {
  getAllData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
