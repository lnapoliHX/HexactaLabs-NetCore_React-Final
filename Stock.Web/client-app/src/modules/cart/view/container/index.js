import React, { Component } from "react";
import { connect } from "react-redux";
import {cartList } from "../../list/index";
import Product from "../presentation";
import { push } from "connected-react-router";


export class ProductsViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Product {...this.props} />
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
return {
    cart : cartList(state),
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsViewPage);
