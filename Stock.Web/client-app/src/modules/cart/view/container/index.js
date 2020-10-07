import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductById, baseCart } from "../../list/index";
import Product from "../presentation";
import Remove from "../../remove/container";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import PropType from "prop-types";
import { getProviderById } from "../../../providers/list";
import { getById } from "../../../productType/list";

export class ProductsViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Product {...this.props} />
        
      </React.Fragment>
    );
  }
}

// ProductsViewPage.propTypes = {
//   cart: PropType.object.isRequired
// };

const mapStateToProps = (state, ownProps) => {
  console.log("stateeeeeeeeeeeeeeeeeeeeeeeeee", state);


  const product = getProductById(state, ownProps.match.params.id);
  return {
    cart : baseCart(state),
    product,
    provider: getProviderById(state, product.providerId),
    productType: getById(state, product.productTypeId)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsViewPage);
