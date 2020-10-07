import React from "react";
import { Container, Row, Col, Button, Label } from "reactstrap";
import columns from "./ColumnsConfig";
import ReactTable from "react-table";

import PropTypes from "prop-types";

const Presentation = props => {
  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Carrito de compras</h1>
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
          <Label>
            Precio total: {props.totalPrice}
          </Label>
        </Col>
        <Col>
          <Button
            className="checkout"
            color="primary"
            aria-label="Checkout"
            onClick={() => props.checkoutProducts(props.data)}
          >
            CHECKOUT
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

Presentation.propTypes = {
  data: PropTypes.array.isRequired,
  checkoutProducts: PropTypes.func.isRequired,
  totalPrice: PropTypes.number,
  pages: PropTypes.number,
  dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number
};

export default Presentation;
