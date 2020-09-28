//import "./productTypes.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Switch, Route } from "react-router-dom";
import ProductTypesDropDown from "../container";
// import View from "../view/container";
// import Create from "../create/container";
// import Update from "../update/container";
// import Remove from "../remove/container";
import { getLoading, getAll } from "../../list";
import Spinner from "../../../../components/loading/spinner";

export class Page extends Component {
  
  componentDidMount() {
    this.props.getAll();
    //console.log('///productTypes/dropdown/page');
    //console.log(this.props);
  }

  render() {
    /*
    const urls = {
      view: `${this.props.match.url}/view/:id`,
      create: `${this.props.match.url}/create`,
      edit: `${this.props.match.url}/update/:id`,
      remove: `${this.props.match.url}/remove/:id`
    };
*/
    return (
      <Spinner loading={this.props.loading}>
        <ProductTypesDropDown
          label={this.props.label}
          loading={this.props.loading}
          defaultValue={this.props.defaultValue}
          onChangeFunction={this.props.onChangeFunction}
          initProductType={this.props.initProductType}
        />
      </Spinner>
      
    );
  }
}

Page.propTypes = {
  //match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getAll: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { loading: getLoading(state) };
};

const mapDispatchToProps = {
  getAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
