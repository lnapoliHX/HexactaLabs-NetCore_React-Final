import React, { Component } from "react";
import PropType from "prop-types";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getOrderById } from "../../list/index";
import Presentation from "../presentation";
import Remove from "../../remove/container";

export class OrderViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Presentation order={this.props.order} {...this.props} />
        <Route path="/order/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

OrderViewPage.propTypes = {
  order: PropType.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const order = getOrderById(state, ownProps.match.params.id);
  return {
    order: order,
  };
};

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderViewPage);
