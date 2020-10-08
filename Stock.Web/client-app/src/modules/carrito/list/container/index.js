import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import Products from "../presentation/Products";
import { getProducts, fetchByFilters, fetchAll, pagarCuenta } from "../index";
import { getById } from "../../../productType/list";

export class ProductsPage extends Component {
  constructor() {
    super();
    this.state = {
      filters: {
        Name: "",
        Brand: "",
        Condition: "AND",
      },
    };
  }

  submitFilter = (event) => {
    event.preventDefault();
    this.props.fetchByFilters(this.state.filters);
  };

  filterChanged = (event) => {
    const newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value,
    };
    this.setState({ filters: newFilters });
  };

  render() {
    return (
      <Products
        data={this.props.products}
        defaultPageSize={5}
        filters={this.state.filters}
        handleFilter={this.filterChanged}
        submitFilter={this.submitFilter}
        clearFilter={this.props.fetchAll}
        pagarFilter={this.props.pagarCuenta}
        dataLoading={this.props.loading}
        {...this.props}
      />
    );
  }
}

function getCantidadEncargada(id) {
  return localStorage.getItem(id);
}

function calcularProductos(state) {
  var productos = getProducts(state)
    .filter(function (state) {
      let cantidad = localStorage.getItem(state.id);
      return cantidad > 0;
    })
    .map((product) => ({
      ...product,
      CompraId: product.CompraId ? product.productTypeId : 0,
      ProductId: product.productTypeId ? product.productTypeId : 0,
      Fecha: product.fecha ? product.fech : new Date(),
      Cantidad: product.id ? getCantidadEncargada(product.id) : 0,
      category: getById(state, product.productTypeId).description,
    }));
  return productos;
}

const mapStateToProps = (state) => {
  return {
    products: calcularProductos(state),
    totalAPagar: 0,
  };
};

const mapDispatchToProps = {
  fetchByFilters,
  fetchAll,
  pagarCuenta,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
