import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Route } from "react-router-dom";
import Compra from "../presentation";
import Remove from "../../remove/container";

export class ComprasViewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Compra {...this.props} />
        <Route path="/compras/view/:id/remove" component={Remove} />
      </React.Fragment>
    );
  }
}

ComprasViewPage.propTypes = {
  detalles: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const detalles = state; //getByDetalleId(state, ownProps.match.params.id);
  return {
    detalles,
  };
};

const mapDispatchToProps = {
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComprasViewPage);
