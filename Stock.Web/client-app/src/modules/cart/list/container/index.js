import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import Carrito from "../presentation/Cart";
import { getProducts } from "../index";
import { getProvidersById } from "../../../providers/list";
import { getById } from "../../../productType/list";

export class CartsPage extends Component {
  constructor() {
    super();
    this.state = {
      filters: {
        Name: "",
        Brand: "",
        Condition: "AND"
      }
    };
  }

  render() {
    return (
      <Carrito
        data={this.props.products}
        defaultPageSize={5}     
        dataLoading={this.props.loading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  const providersById = getProvidersById(state);
  return {
    products: getProducts(state).map(product => ({
      ...product,
      providerName: product.providerId
        ? providersById[product.providerId].name
        : "",
      category: getById(state, product.productTypeId).description
    })),
    providers: providersById
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartsPage);
