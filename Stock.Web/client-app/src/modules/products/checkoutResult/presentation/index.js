import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";
import OrderItems from "../../../orders/items/container/index";
import { connect } from "react-redux";
import { push } from "connected-react-router";

const OrderView = props => {
  return (
    <Container fluid>
      <h1>Resultado del Checkout de la Orden</h1>
      <h3>Id: {props.okOrder.id}</h3>
      <Row>
        <Col lg="2">Fecha</Col>
        <Col>{props.okOrder.dateTime}</Col>
      </Row>
      <Row>
        <Col lg="4">Total Orden Solicitada</Col>
        <Col>{props.requestedOrder.total}</Col>
      </Row>
      <Row>
        <Col lg="10">Items Solicitados</Col>
      </Row>
      <Row>
        <OrderItems items={props.requestedOrder.items}/>
      </Row>
      <Row>
        <Col lg="4">Total Orden Aceptada</Col>
        <Col>{props.okOrder.total}</Col>
      </Row>
      <Row>
        <Col lg="10">Items aceptados</Col>
      </Row>
      <Row>
        <OrderItems items={props.okOrder.items}/>
      </Row>

      <div className="order-view__button-row">
        <Button
          className="order-form__button"
          color="default"
          onClick={() => props.push(`/product`) }
        >
          Volver
        </Button>      
    </div>
    </Container>
  );
};


OrderView.propTypes = {
  requestedOrder: PropTypes.object.isRequired,
  okOrder: PropTypes.object.isRequired,
  //push: PropTypes.func.isRequired,
  //match: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  push
};

export default connect(
  null,
  mapDispatchToProps
)(OrderView);
