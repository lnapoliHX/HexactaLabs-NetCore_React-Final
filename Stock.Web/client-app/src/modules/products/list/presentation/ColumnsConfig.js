import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
//import { FaEdit, FaTrash, FaSearch, FaCartPlus } from "react-icons/fa";
//import { Button } from "reactstrap";

const renderToolbar = ({value}) => {
  let viewButton = (
    <Link className="product-list__button2" to={`/product/view/${value}`}>
      <FaSearch className="product-list__button-icon2" />
    </Link>
  );

  let editButton = (
    <Link className="product-list__button2" to={`/product/update/${value}`}>
      <FaEdit className="product-list__button-icon2" />
    </Link>
  );

  let removeButton = (
    <Link className="product-list__button2" to={`/product/remove/${value}`}>
      <FaTrash className="product-list__button-icon2" />
    </Link>
  );
/*
  let addItemToCartButton = (
    <Button className="product-list__button3" id={value}>
              <FaCartPlus className="product-list__button-icon3" />
    </Button>
  );
*/

  return (
    <span>
      {viewButton} {editButton} {removeButton} 
    </span>
  );
};

export const HeaderComponent = props => {
  return (
    <div
      style={{
        textAlign: "left",
        fontWeight: "bold"
      }}
    >
      {props.title}
    </div>
  );
};

HeaderComponent.displayName = "HeaderComponent";

export const columns = [
  {
    Header: <HeaderComponent title="Nombre" />,
    accessor: "name",
    width: 200,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Costo" />,
    accessor: "costPrice",
    width: 95,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Precio" />,
    accessor: "salePrice",
    width: 100,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Stock" />,
    accessor: "stock",
    width: 90,
    Cell: props => props.value
  },

  {
    Header: <HeaderComponent title="Categoría" />,
    accessor: "productTypeDesc",
    width: 150,
    Cell: props => props.value
  },
  
  {
    Header: <HeaderComponent title="Cant." />,
    accessor: "quantityToOrder",
    width: 90,
  },
  {
    Header: <HeaderComponent title="Acciones" />,
    accessor: "id",
    Cell: renderToolbar
  },
  {
    Header: <HeaderComponent title="Comprar" />,
    accessor: "id",
  }
];

renderToolbar.propTypes = {
  value: PropTypes.string.isRequired
};

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired
};

export default columns;
