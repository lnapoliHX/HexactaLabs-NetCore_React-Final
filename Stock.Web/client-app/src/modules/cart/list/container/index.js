import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import Cart from "../presentation/index";
import { getCart, fetchAll } from "../index";

export class CartsPage extends Component {
  render() {
    return (
      <Cart
        {...this.props}
        data={this.props.cart}
        defaultPageSize={5}
        dataLoading={this.props.loading}
      />
    );
  }
}

CartsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  cart: PropTypes.array.isRequired,
  fetchAll: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { 
     cart: getCart(state)
  };
};

const mapDispatchToProps = {
  fetchAll,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartsPage);
