import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Button, Input, Form } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { setCart } from "../../../localstorage";


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
    <Link className="product-list__button" to={`/product/remove/${value}`}>
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

const addToCart = (value) => {

  var id = value.original.id;
  var stock = value.original.stock;
  var cant;
  var noStock = stock===0;

  let inputCart = (
    <Input
        name="Cant"
        type="number"
        min="1"
        max={stock}
        onChange={e => cant= e.target.value}
        placeholder="Cantidad"
        required
      >
    </Input>
  );
  
  let cartButton = (
    <Button
      className="product__button"
      color="primary"
      aria-label="Agregar"
      disabled= {noStock}
      type="submit" value="Submit"
    >
      <FaPlus className="product__button-icon" />
        AGREGAR
      </Button>
  );


  return (
    <span>
      <Form onSubmit={() => setCart(id, cant, stock)}>
        {inputCart}
        {cartButton}
      </Form>
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
    Header: <HeaderComponent title="Proovedor" />,
    accessor: "providerName",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Stock" />,
    accessor: "stock",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Acciones" />,
    accessor: "id",
    Cell: renderToolbar
  },
  {
    Header: <HeaderComponent title="Carrito" />,
    accessor: "id",
    Cell: addToCart
  }
];

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

renderToolbar.propTypes = {
  value: PropTypes.string.isRequired
};

addToCart.propTypes = {
  value: PropTypes.string.isRequired
};

export default columns;
