import React, { Component } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
/*
import { push } from "connected-react-router";
import { Route } from "react-router-dom";

import { getOrderById } from "../../list/index";
*/
import Presentation from "../presentation";
/*
import Remove from "../../remove/container";
*/
export class OrderCheckoutPage extends Component {
  render() {
    console.log('Checkout.container.index');
    return (
      <React.Fragment>
        <Presentation order={this.props.order} {...this.props} />
      </React.Fragment>
    );
  }
}

OrderCheckoutPage.propTypes = {
  order: PropType.object.isRequired
};
/*
const mapStateToProps = (state, ownProps) => {
  const order = getOrderById(state, ownProps.match.params.id);
  return {
    order: order,
  };
};

const mapDispatchToProps = {
  push
};
*/
export default connect(
  null,
  null
)(OrderCheckoutPage);

//export default OrderCheckoutPage;
