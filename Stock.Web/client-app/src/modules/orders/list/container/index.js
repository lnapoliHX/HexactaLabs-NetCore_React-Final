import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { getOrders, getAll, fetchByFilters } from "../index";
import Presentation from "../presentation";

const initialState = {
  name: "",
  condition: "AND"
};

class OrdersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ...initialState,
      orders: this.props.orders,
      skipPageReset: false
    };
  }
  
  onFilterChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFilterSubmit = () => {
    this.props.fetchByFilters(this.state);
  };

  onFilterReset = () => {
    this.setState({ ...initialState });
    this.props.getAll();
  };

  render() {
    const { orders, loading, ...rest } = this.props;
  
    return (
      <Presentation
        data={orders}
        dataLoading={loading}
        defaultPageSize={5}
        filters={this.state}
        /*
        onFilterChange={this.onFilterChange}
        onFilterSubmit={this.onFilterSubmit}
        clearFilter={this.onFilterReset}
        */
        {...rest}
      />
    );
  }
}

OrdersPage.propTypes = {
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAll: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  fetchByFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const localOrders = getOrders(state);
  return {
    orders: localOrders.map(order => {
      let orderTotal = 0;
      const items = order.items.map(item => {
        const itemTotal = item.salePrice * item.quantity;
        orderTotal += itemTotal;
        return {
          ...item,
          total: itemTotal
        }
      });
      return {
        ...order,
        items: items,
        total: orderTotal
      }
    })
  }
};

const mapDispatchToProps = {
  getAll,
  push,
  fetchByFilters
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersPage);
