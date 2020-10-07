import React from "react";
import {FaShoppingCart } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import columns from "./ColumnsConfig";
import ReactTable from "react-table";
import {checkout,getLoading} from "../../list";
import { connect } from "react-redux";


import PropTypes from "prop-types";

const Presentation = props => {

  let acum = 0;


  function acumulador() {
    props.data.filter(
      prod => (Object.entries(localStorage).filter(lsk => lsk[0] === prod.id).length > 0 )).filter(producto => (
        acum += JSON.parse((Object.entries(localStorage).find(lsk => lsk[0] === producto.id))[1]).valor * producto.salePrice
      ))
    return acum;
  }

  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Productos en carrito</h1>
        </Col>
      </Row>
      
      <Row className="my-3">
        <Col>
          <ReactTable
            {...props}
            data={props.data.filter(
            prod => (Object.entries(localStorage).filter(lsk => lsk[0] === prod.id).length > 0))}    
            pages={props.pages}
            loading={props.dataLoading}
            columns={columns}
            defaultPageSize={props.defaultPageSize}
            className="-striped -highlight"
          /></Col></Row>
<br/>
      <Row className="my-1">
        <Col md="9">
          <Button className="product__button"  color="primary"  aria-label="Finalizar"  onClick={() => comprar(props)}> <FaShoppingCart className="product__button-icon" />
            Finalizar
          </Button>
        </Col>
        <Col>
          <h2>Precio Total: ${(acumulador())}</h2>
        </Col>
      </Row>
      
    </Container>
  );
};

export function crearCarrito(props) {
  
     let cart = [];
    props.data.filter(
      prod => (Object.entries(localStorage).filter(lsk => lsk[0] === prod.id).length > 0)).filter(producto => {
        let item = {
          id: String,
          cantidad: Number,
          name : String,
          salePrice : Number
        };
        item.id = producto.id;
        item.cantidad = JSON.parse((Object.entries(localStorage).find(lsk => lsk[0] === producto.id))[1]).valor;
        cart.push(item);
      }
      )
    return cart
  }


export function comprar(props){
  props.checkout(crearCarrito(props));
}

Presentation.propTypes = {
  data: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  pages: PropTypes.number,
  dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
  handleFilter: PropTypes.func.isRequired,
  submitFilter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  urls: PropTypes.shape({ create: PropTypes.string }),
  push: PropTypes.func.isRequired
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
