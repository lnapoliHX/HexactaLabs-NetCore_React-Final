import "./products.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import List from "../list/container";
import View from "../view/container";
import { getLoading } from "../list";
import Spinner from "../../../components/loading/spinner";

export class CartsPage extends Component {


  render() {
    const urls = {
      view: `${this.props.match.url}/view`,
      edit: `${this.props.match.url}/update/:id`,
    };

    return (
      <Spinner loading={this.props.loading}>
        <Switch>
        <Route path={urls.view} component={View} />
          <Route
            render={() => <List urls={urls} loading={this.props.loading} />}
          />
        </Switch>         
      </Spinner>
    );
  }
}

CartsPage.propTypes = {
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return { loading: getLoading(state) };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartsPage);
