import React from "react";
import { FaList } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import columns from "./ColumnsConfig";
import ReactTable from "react-table";
import { getLoading, checkout } from "..";
import { connect } from "react-redux";

import PropTypes from "prop-types";

const Presentation = props => {
  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Carrito</h1>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <Button
            className="product__button"
            color="primary"
            aria-label="Agregar"
            onClick={() => comprar(props)}
          >
            <FaList className="product__button-icon" />
            COMPRAR
          </Button>
        </Col>
        <Col>
          <h4> Precio Total
            {
              " " + (acumulador(props)) + " "
            }
          </h4>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <ReactTable
            {...props}
            data={props.data.filter(
              prod => (Object.entries(localStorage)
                .filter(lsk => lsk[0] === prod.id).length > 0
              ))}
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
  push: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    loading: getLoading(state)
  };
};

const mapDispatchToProps = {
  checkout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentation);

function acumulador(props) {
  let acum = 0;
  props.data.filter(
    prod => (Object.entries(localStorage)
      .filter(lsk => lsk[0] === prod.id).length > 0
    )).filter(producto => (
      acum += JSON.parse((Object.entries(localStorage).find(lsk => lsk[0] === producto.id))[1]).valor * producto.salePrice
    ))
  return acum;
}

export function crearCarrito(props) {
  let cart = [];
  props.data.filter(
    prod => (Object.entries(localStorage)
      .filter(lsk => lsk[0] === prod.id).length > 0
    )).filter(producto => {
      let item = {
        id: String,
        purchaseQuantity: Number,
        isSold: Boolean,
        name: String,
        salePrice: Number
      };
      item.id = producto.id;
      item.purchaseQuantity = JSON.parse((Object.entries(localStorage).find(lsk => lsk[0] === producto.id))[1]).valor;
      item.isSold = true;
      item.name = "";
      item.salePrice = 0;
      cart.push(item);
    }
    )
  return cart
}

export function comprar(props) {
  props.checkout(crearCarrito(props));
}







