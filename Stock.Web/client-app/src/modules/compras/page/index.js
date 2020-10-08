import "./product-type.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Spinner from "../../../components/loading/spinner";
import List from "../list/container";
import View from "../view/container";

import { getLoading, fetchAll } from "../list";

export class ComprasPage extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const urls = {
      view: `${this.props.match.url}/view/:id`,
    };

    return (
      <Spinner loading={this.props.loading}>
        <Switch>
          <Route path={urls.view} component={View} />
          <Route
            render={() => <List urls={urls} loading={this.props.loading} />}
          />
        </Switch>
        {/*   <Route path={urls.remove} component={Remove} />*/}
      </Spinner>
    );
  }
}

ComprasPage.propTypes = {
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchAll: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { loading: getLoading(state) };
};

const mapDispatchToProps = {
  fetchAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComprasPage);
