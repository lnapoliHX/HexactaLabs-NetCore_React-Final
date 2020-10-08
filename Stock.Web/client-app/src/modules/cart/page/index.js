import "./products.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import List from "../list/container";
import Remove from "../remove/container";
import { getLoading, fetchAll } from "../list";
import Spinner from "../../../components/loading/spinner";
import View from "../view/container";


export class CartPage extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const urls = {
      view: `${this.props.match.url}/view`,
      edit: `${this.props.match.url}/update/:id`,
      remove: `${this.props.match.url}/remove/:id`
    };

    return (
      <Spinner loading={this.props.loading}>
        <Switch>
        <Route path={urls.view} component={View} />
          <Route
            render={() => <List urls={urls} loading={this.props.loading} />}
          />
        </Switch>
        <Route path={urls.remove} component={Remove} />
      </Spinner>
    );
  }
}

CartPage.propTypes = {
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchAll: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { loading: getLoading(state) };
};

const mapDispatchToProps = {
  fetchAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
