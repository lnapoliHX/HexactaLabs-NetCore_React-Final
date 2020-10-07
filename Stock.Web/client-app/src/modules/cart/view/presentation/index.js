import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";

const ProductView = props => {
  console.log("VIEW------------------------->",props);
  let acum = 0;
    props.cart.byId.forEach(element => {
        acum += (element.purchaseQuantity*element.salePrice)
    });
    
  return (
    <Container fluid>
        <div className="block-header">
            <h1>Detalle de compra</h1>
        </div>
        <div className="info-box"> 
        <Row>
                <Col lg="2"><h5>NOMBRE</h5></Col>
                <Col><h5>CANTIDAD</h5></Col>
            </Row>           
            {
                props.cart.byId.map(el => <Row><Col lg="2">{el.name}</Col> <Col>{el.purchaseQuantity}</Col></Row>) 
            }
            
            <Row>
                <Col lg="2">Total</Col>
        <Col>{acum}</Col>
            </Row>
        </div>
    </Container>
  );
};

// ProductView.propTypes = {
//   product: PropTypes.object.isRequired,
//   provider: PropTypes.object.isRequired,
//   push: PropTypes.func.isRequired,
//   match: PropTypes.object.isRequired
// };

export default ProductView;
