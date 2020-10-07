import React from "react";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import PropTypes from "prop-types";
import Order from "../presentation";
import { order } from "../index";

class OrderCart extends React.Component {
  render() {
    return (
      <Order
        order={() => this.props.order()}
        goBack={this.props.goBack}
      />
    );
  }
}

OrderCart.propTypes = {
  order: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapDispatchToProps = { order, goBack };

export default connect(
  null,
  mapDispatchToProps
)(OrderCart);
