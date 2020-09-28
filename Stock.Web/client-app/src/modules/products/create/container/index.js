import React, { useState } from "react";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import { create } from "../index";
import Form from "../../form/presentation";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import { getLoading as getLoadingProductTypes, getAll as getAllProductTypes } from "../../../productTypes/list";

const initialState = {
  loading:  false,
  product: {
    name: '',
    costPrice: 0,
    salePrice: 0,
    stock: 0,
    productType: {
      id: '',
      description: ''
    },
    providers: []
  },
  productTypes: [],
  productTypeOptions: [],
};

const submitProduct = (product) => {
  create(product);
}

const Create = ({ create: onSubmit, goBack: onCancel }, props) => {
  const [state, setState] = useState(initialState);

  const changeSingleFields = (field, value) => {
    setState({
      ...state,
      product: {
        ...state.product,
        [field]: value
      } 
    });    
  }

  const changeCategoria = (id, desc) => {
    setState({
      ...state,
      product: {
        ...state.product,
        productType: {
          id: id,
          description: desc  
        },
      } 
    });    
  }

  const onChangeData = (event) => {
    switch (event.target.name) {
      case 'name':
      case 'costPrice':
      case 'salePrice':
      case 'stock':
        changeSingleFields(event.target.name, event.target.value);
        break;
      case 'productTypeDesc':
        const selectedIndex = event.target.options.selectedIndex;
        const id = event.target.options[selectedIndex].id;
        changeCategoria(id, event.target.value);
        break;
      default:
        return state;
    }
  }



  //const productTypes = getAllProductTypes;
  //console.log('productTypes: ', productTypes());

  return (
    <Container fluid>
      <Row>
        <h2>Nuevo Producto</h2>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={onSubmit} handleCancel={onCancel} handleChange={onChangeData}
                product={state.product} initProductType={changeCategoria}
                />
        </Col>
      </Row>
    </Container>
  );
};

Create.propTypes = {
  create: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: getLoadingProductTypes(state),
  product: state.product
});

const mapDispatchToProps = {
  create,
  submitProduct,
  goBack,
  getAllProductTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);


