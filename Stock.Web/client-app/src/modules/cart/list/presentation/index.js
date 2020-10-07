import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import columns from "./ColumnsConfig";
import checkoutColumns from "./CheckOutColumns";
import ReactTable from "react-table";

import PropTypes from "prop-types";

const Presentation = props => {

  const checkoutState = localStorage.getItem('checkout');
  
  const keys = Object.keys(props.data);
  let cartTotal = 0;
  keys.forEach(key =>{
    cartTotal += Number.parseInt(props.data[key].stock) * Number.parseFloat(props.data[key].salePrice); 
  });
  
  
  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Detalle de compra</h1>
        </Col>
      </Row>      
      <Row className="my-3">
        <Col>
          <ReactTable
            {...props}
            data={props.data}
            pages={props.pages} 
            loading={props.dataLoading}
            columns={(checkoutState === "ORDER" )? checkoutColumns : columns}
            defaultPageSize={props.defaultPageSize}
            className="-striped -highlight"
          />
        </Col>
      </Row>
      <Row className="float-right">
      {(checkoutState !== "ORDER" ) ? 
        (<Col>
          <Button
            className="cart__button"
            color="primary"
            aria-label="Finalizar"
            onClick={() => props.push(props.urls.order)}
          >
            <FaShoppingCart className="cart__button-icon" />
            Finalizar
          </Button>
        </Col>) : <div></div> }
      </Row>
      <Row className="float-right mt-1 mr-2">
        <Col>
          <h4>TOTAL: $ {cartTotal}</h4>
        </Col>        
      </Row>
    </Container>
  );
};


Presentation.propTypes = {
  data: PropTypes.array.isRequired,
  pages: PropTypes.number,
  dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
  urls: PropTypes.shape({ create: PropTypes.string }),
  push: PropTypes.func.isRequired
};

export default Presentation;
