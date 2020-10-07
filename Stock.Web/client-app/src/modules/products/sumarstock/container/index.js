import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { goBack } from "connected-react-router";
import StockForm from "../../formStock/presentation";
import { stock } from "..";
import { getProductById } from "../../list";
import { getProviders } from "../../../providers/list";
import { getProductTypes } from "../../../productType/list";

const SumarStock = ({
  initialValues,
  stock: onSubmit,
  goBack: onCancel,
  productTypeOptions,
  providerOptions,
}) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="block-header">
            <h1>Sumar cantidad al Stock</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <StockForm
            initialValues={initialValues}
            productTypeOptions={productTypeOptions}
            providerOptions={providerOptions}
            onSubmit={onSubmit}
            handleCancel={onCancel}
          />
        </Col>
      </Row>
    </Container>
  );
};

SumarStock.propTypes = {
  productTypeOptions: PropTypes.array.isRequired,
  providerOptions: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  stock: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  productTypeOptions: getProductTypes(state).map((pt) => ({
    label: pt.initials,
    value: pt.id,
  })),
  providerOptions: getProviders(state).map((provider) => ({
    label: provider.name,
    value: provider.id,
  })),
  initialValues: getProductById(state, ownProps.match.params.id),
});

const mapDispatchToProps = {
  stock,
  goBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(SumarStock);
