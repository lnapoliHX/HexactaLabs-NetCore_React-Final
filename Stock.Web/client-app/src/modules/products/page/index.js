import "./products.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import List from "../list/container";
import View from "../view/container";
import Create from "../create/container";
import Update from "../update/container";
import RestarStock from "../restarstock/container";
import SumarStock from "../sumarstock/container";
import Remove from "../remove/container";
import { getLoading, fetchAll } from "../list";
import Spinner from "../../../components/loading/spinner";
import StockView from "../viewStock/container";

export class ProductsPage extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const urls = {
      view: `${this.props.match.url}/view/:id`,
      create: `${this.props.match.url}/create`,
      edit: `${this.props.match.url}/update/:id`,
      remove: `${this.props.match.url}/remove/:id`,
      sumarstock: `${this.props.match.url}/sumarstock/:id`,
      restarstock: `${this.props.match.url}/restarstock/:id`,
      viewStock: `${this.props.match.url}/viewStock/:id`,
    };

    return (
      <Spinner loading={this.props.loading}>
        <Switch>
          <Route path={urls.view} component={View} />
          <Route path={urls.create} component={Create} />
          <Route path={urls.edit} component={Update} />
          <Route path={urls.restarstock} component={RestarStock} />
          <Route path={urls.sumarstock} component={SumarStock} />
          <Route path={urls.viewStock} component={StockView} />
          <Route
            render={() => <List urls={urls} loading={this.props.loading} />}
          />
        </Switch>
        <Route path={urls.remove} component={Remove} />
      </Spinner>
    );
  }
}

ProductsPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
