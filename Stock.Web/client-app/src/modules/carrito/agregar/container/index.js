import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, Col, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { goBack } from "connected-react-router";
import Form from "../../form/presentation";
import { agregar } from "../index";
import { getProducts } from "../../../products/list";

const Create = ({
  agregar: onSubmit,
  goBack: onCancel,
  getProductOptions,
  initialValues,
}) => {
  return (
    <Container fluid>
      <Row>
        <h2>Agregar Producto al carrito </h2>
      </Row>
      {!getProductOptions.length ? (
        <Row>
          <Col>
            <Alert color="warning">
              No existen productos. Click&nbsp;
              <Link to="../products/create">aquí</Link> para cargar nuevos
              productos.
            </Alert>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col>
          <Form
            initialValues={initialValues}
            getProductOptions={getProductOptions}
            onSubmit={onSubmit}
            handleCancel={onCancel}
          />
        </Col>
      </Row>
    </Container>
  );
};

Create.propTypes = {
  getProductOptions: PropTypes.array.isRequired,
  agregar: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const products = getProducts(state);
  // console.log(products);
  return {
    getProductOptions: products
      .filter(function (datos) {
        return datos.stock > 0; //solo los que tienen stock mayor a cero
      })
      .map((pt) => ({
        label: pt.name,
        value: pt.id,
        stock: pt.stock,
      })),
    initialValues: {
      productPrimero: products.length ? products[0].id : "default",
      // providerId: providers.length ? providers[0].id : "default"
    },
  };
};

const mapDispatchToProps = {
  agregar,
  goBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
