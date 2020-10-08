import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";
import OrderItems from "../../items/container/index"

const OrderView = props => {
  return (
    <Container fluid>
      <h1>Checkout New Order</h1>
      <Row>
        <Col lg="2">Fecha:</Col>
        <Col>{props.order.date}</Col>
      </Row>
      <Row>
        <Col lg="2">Total Order:</Col>
        <Col>{props.order.items}</Col>
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
          onClick={() =>
            props.push(`/order/create`)
          }
        >
          Guardar
        </Button>
        <Button
          className="order-form__button"
          color="default"
          onClick={() => props.push(`/order`)}
        >
          Volver
        </Button>      
    </div>
    </Container>
  );
};

OrderView.propTypes = {
  order: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  //match: PropTypes.object.isRequired
};

export default OrderView;
