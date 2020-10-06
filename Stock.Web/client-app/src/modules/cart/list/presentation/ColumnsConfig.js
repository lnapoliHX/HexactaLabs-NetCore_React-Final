import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaShoppingCart } from "react-icons/fa";

import InputField from "../../../../components/inputs/InputField";
import { Input, Button, Container, Row, Col } from "reactstrap";

const renderToolbar = ({ value }) => {
  let viewButton = (
    <Link className="product-list__button" to={`/product/view/${value}`}>
      <FaSearch className="product-list__button-icon" />
    </Link>
  );

  let editButton = (
    <Link className="product-list__button" to={`/product/update/${value}`}>
      <FaEdit className="product-list__button-icon" />
    </Link>
  );

  let removeButton = (
    <Link className="product-list__button" onClick = {() => localStorage.removeItem(value)} to={`/cart`}>
      <FaTrash className="product-list__button-icon" />
    </Link>
  );

  return (
    <span>
      {viewButton}
      {editButton}
      {removeButton}
    </span>
  );
};





const RenderCant = ({ value: productId }) => {
  let valor;
  let purchaseField = (
    <Container>
      <Col>
        <Row>
          <Col>
          <h5>{ JSON.parse((Object.entries(localStorage).find(lsk => lsk[0] === productId ))[1]).valor }</h5>
          </Col>
        </Row>
      </Col>
    </Container>
  );

  return (
    <span>
      {purchaseField}
    </span>
  );
};



const HeaderComponent = props => {
  return (
    <h2 className="tableHeading">
      {props.title}
    </h2>
  );
};

HeaderComponent.displayName = "HeaderComponent";

const columns = [
  {
    Header: <HeaderComponent title="Nombre" />,
    accessor: "name",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Tipo de producto" />,
    accessor: "category",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Precio" />,
    accessor: "salePrice",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Cantidad" />,
    accessor: "id",
    Cell: RenderCant
  },
  {
    Header: <HeaderComponent title="Acciones" />,
    accessor: "id",
    Cell: renderToolbar
  }

];

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

renderToolbar.propTypes = {
  value: PropTypes.string.isRequired
};



export default columns;
