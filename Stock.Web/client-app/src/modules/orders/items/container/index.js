import React from "react";
//import { connect } from "react-redux";
//import { push } from "connected-react-router";
import PropTypes from "prop-types";
//import { getProducts, getAllData, fetchByFilters } from "../index";
//import { getProductTypes } from "../../../productTypes/list/index";
//import { getProviders } from "../../../providers/list/index";
import Presentation from "../presentation";

const initialState = {
  name: "",
  condition: "AND"
};

class ItemsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ...initialState,
      items: this.props.items,
      skipPageReset: false
    };
  }
  
  setQuantityToOrderProducts = (item) => {
    //console.log('Id:', productId);
    let i = this.props.products.findIndex((product) => product.id === item.productId);
    //console.log('i:', i);
    if (i >= 0)
        this.props.products[i].quantityToOrder = item.quantity;
    //console.log('Items solicitados: ', this.props.products)
  };

  render() {
    const { items, loading, ...rest } = this.props;

    return (
      <Presentation
        data={items}
        dataLoading={loading}
        defaultPageSize={5}
        {...rest}
      />
    );
  }
}

ItemsPage.propTypes = {
  items: PropTypes.array.isRequired,
  //loading: PropTypes.bool.isRequired,
};
/*
const mapStateToProps = state => {
  return {
    productTypes: getProductTypes(state),
    providers: getProviders(state),
    products: getProducts(state).map(product => ({
      ...product,
      productTypeDesc: getProductTypes(state).length > 0 ? 
                          getProductTypes(state).find(pt => pt.id === product.productTypeId).description : '',
      providerName: getProviders(state).length > 0 ? 
                          getProviders(state).find(prov => prov.id === product.providerId).name : '', 
      quantityToOrder: 0,       
  })),
  }
};

const mapDispatchToProps = {
  getAllData,
  push,
  fetchByFilters
};

export default connect(
  null,
  null
)(ItemsPage);
*/
export default ItemsPage;
