import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductById } from "../../list/index";
import Product from "../presentation";
import Remove from "../../remove/container";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PropType from "prop-types";
//import { getProviderById } from "../../../providers/list";
import { getById } from "../../../productType/list";

export class StockViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Product {...this.props} />
        <Route path="/product/viewStock/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

StockViewPage.propTypes = {
  product: PropType.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const product = getProductById(state, ownProps.match.params.id);
  return {
    product,
    productType: getById(state, product.productTypeId),
  };
};

const mapDispatchToProps = {
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockViewPage);
