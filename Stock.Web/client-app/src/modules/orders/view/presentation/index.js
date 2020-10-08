import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";
import OrderItems from "../../items/container/index"

const OrderView = props => {
  console.log('orders.view.presentation.order: ', props.order);
  return (
    <Container fluid>
      <h3>Orden: {props.order.id}</h3>
      <Row>
        <Col lg="2">Fecha:</Col>
        <Col>{props.order.dateTime}</Col>
      </Row>
      <Row>
        <Col lg="2">Total Order: </Col>
        <Col>{props.order.total}</Col>
      </Row>
      <Row>
        <Col lg="2">Items</Col>
      </Row>
      <Row>
        <OrderItems items={props.order.items}/>
      </Row>
      <div className="order-view__button-row">
        <Button
          className="order-form__button"
          color="danger"
          onClick={() =>
            props.push(`/order/view/${props.match.params.id}/remove`)
          }
        >
          Eliminar
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
