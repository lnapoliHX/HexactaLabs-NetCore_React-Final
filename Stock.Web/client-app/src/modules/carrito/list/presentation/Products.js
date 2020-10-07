import React from "react";
import { FaPlus } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import columns from "./ColumnsConfig";
import ReactTable from "react-table";

import PropTypes from "prop-types";

const Presentation = (props) => {
  var totalAPagar = props
    ? props.data
      ? calcularMonto(props.data)
      : null
    : null;

  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Productos cargados para Comprar</h1>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <Row className="my-1">
        <Col>
          <Button
            className="product__button"
            color="primary"
            aria-label="Agregar"
            onClick={() => props.push(props.urls.agregar)}
          >
            <FaPlus className="product__button-icon" />
            AGREGAR
          </Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <h4 className="float-right">Historial </h4>
        </Col>
        <Col>
          <Button
            className="product__button "
            color="primary"
            aria-label="Agregar"
            onClick={() => props.push(props.urls.compras)}
          >
            <FaPlus className="product__button-icon" />
            Ver Compras
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
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <Button
            className="product__button float-right"
            color="primary"
            aria-label="Agregar"
            onClick={() => props.pagarFilter(props.data, totalAPagar)}
          >
            <FaPlus className="product__button-icon" />
            Pagar
          </Button>
        </Col>
        <Col>
          <h4 className="float-right">Total a pagar: ${totalAPagar}</h4>
        </Col>
      </Row>
    </Container>
  );

  function calcularMonto(productos) {
    let total = 0;
    if (productos.length > 0) {
      for (var i = 0; i < productos.length; i++) {
        total = total + productos[i].Cantidad * productos[i].salePrice;
      }
    }
    return total;
  }
};

Presentation.propTypes = {
  data: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  pages: PropTypes.number,
  dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
  handleFilter: PropTypes.func.isRequired,
  submitFilter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  pagarFilter: PropTypes.func.isRequired,
  urls: PropTypes.shape({ create: PropTypes.string }),
  push: PropTypes.func.isRequired,
};

export default Presentation;
