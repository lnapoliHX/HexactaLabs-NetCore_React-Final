import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";

const CheckoutView = () => {
  
  return (
    <Container fluid>
      <div className="block-header">
          <h1>Resumen de compra</h1>
      </div>
      <div>
          <Row>
              <Col lg="2">Producto</Col>
          </Row>
          <Row>
              <Col lg="2">Cantidad</Col>
          </Row>
          <Row>
              <Col lg="2">Precio Unitario</Col>
          </Row>
      </div>
    </Container>
  );
};

CheckoutView.propTypes = {
  type: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default CheckoutView;
