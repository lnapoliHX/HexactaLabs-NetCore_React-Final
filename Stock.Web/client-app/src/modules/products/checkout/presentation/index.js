import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";
import OrderItems from "../../../orders/items/container";
import { connect } from "react-redux";

const CheckoutView = props => { 
  return (
    <Container fluid>
      <h1>Checkout New Order</h1>
      {/*
      <Row>
        <Col lg="2">Fecha:</Col>
        <Col>{props.order.dateTime}</Col>
      </Row>
      */}
      <Row>
        <Col lg="2">Total Order:</Col>
        <Col>{props.order.total}</Col>
      </Row>
      <Row>
        <Col lg="1">Items</Col>
      </Row>
      <Row>
        <OrderItems items={props.order.items}/>
      </Row>

      <div className="order-view__button-row">
        <Button
          className="order-form__button"
          color="primary"
          onClick={() => { return props.onSubmit()} }
        >
          Guardar
        </Button>
        <Button
          className="order-form__button"
          color="default"
          onClick={() => { return props.handleCancel()} }
        >
          Volver
        </Button>      
    </div>
    </Container>
  );
};

CheckoutView.propTypes = {
  order: PropTypes.object.isRequired,
  //push: PropTypes.func.isRequired,
  //match: PropTypes.object.isRequired
};

export default connect(
  null,
  null
)(CheckoutView);


