import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Presentation from "../presentation";
import { getcarts, fetchLocal, checkoutProducts, totalPrice } from "../index";

export class CartPage extends Component {

  render() {

    return (
      <Presentation
        data={this.props.cart}
        checkoutProducts={checkoutProducts}
        totalPrice={totalPrice(this.props.cart)}
        defaultPageSize={5}
        dataLoading={this.props.loading}
        {...this.props}
      />
    );
  }
}

CartPage.propTypes = {
  cart: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return { cart: getcarts(state) };
};

const mapDispatchToProps = {
  fetchLocal,
  checkoutProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
