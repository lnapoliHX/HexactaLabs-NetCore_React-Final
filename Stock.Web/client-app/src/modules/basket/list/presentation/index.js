import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { Container, Row, Col, Button, Label } from "reactstrap";
import { FaCashRegister } from "react-icons/fa";
import columns from "./ColumnsConfig";
import { checkout } from "..";

const Presentation = props => {
  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Carrito</h1>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <ReactTable
            {...props}
            data={props.data}
            pages={props.pages}
            loading={props.dataLoading}
            columns={columns}
            defaultPageSize={props.defaultPageSize}
            className="-striped -highlight"
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <Button
            className="product__button"
            color="primary"
            aria-label="Comprar"
            onClick={checkout}
          >
            <FaCashRegister className="product__button-icon" />
            Checkout
          </Button>
        </Col>
        <Col>
        <div className="provider-view__button-row">
        {/* <h2>Precio total a pagar: </h2> */}
        <Label onLoadStart={() => props.push(`/basket/sumartotal`)}>
          Precio total a pagar: 
        </Label>
         
        </div>
        
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
