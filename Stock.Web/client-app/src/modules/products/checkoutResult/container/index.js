import React, { Component } from "react";
import PropTypes from "prop-types";
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
export class OrderCheckoutResultPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Presentation okOrder={this.props.okOrder} 
                      requestedOrder={this.props.requestedOrder} {...this.props} />
      </React.Fragment>
    );
  }
}

OrderCheckoutResultPage.propTypes = {
  requestedOrder: PropTypes.object.isRequired,
  okOrder: PropTypes.object.isRequired,
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
)(OrderCheckoutResultPage);

//export default OrderCheckoutPage;
