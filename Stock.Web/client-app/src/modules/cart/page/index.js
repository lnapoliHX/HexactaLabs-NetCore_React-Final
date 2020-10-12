import "./cart.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import List from "../list/container";
import { getLoading, fetchLocal } from "../list";
import Spinner from "../../../components/loading/spinner";

export class CartPage extends Component {
  componentDidMount() {
    this.props.fetchLocal();
  }

  render() {

    return (
      <Spinner loading={this.props.loading}>
        <Route
            render={() => <List loading={this.props.loading} />}
        />
      </Spinner>
    );
  }
}

CartPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchLocal: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { loading: getLoading(state) };
};

const mapDispatchToProps = {
  fetchLocal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
