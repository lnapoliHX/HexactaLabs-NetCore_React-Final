import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import columns from "./ColumnsConfig";
import ReactTable from "react-table";

import PropTypes from "prop-types";

const Presentation = props => {
  console.log("Holaaa data:");
  console.log(props.data);
  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Detalle de compra</h1>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <Button
            className="cart__button"
            color="primary"
            aria-label="Finalizar compra"
            onClick={() => props.push(props.urls.order)}
          >
            <FaShoppingCart className="cart__button-icon" />
            Finalizar compra
          </Button>
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
