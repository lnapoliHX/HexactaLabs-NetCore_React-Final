import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const renderToolbar = ({ value }) => {
  let removeButton = (
    <Link className="product-list__button" to={`/carrito/remove/${value}`}>
      <FaTrash className="product-list__button-icon" />
    </Link>
  );

  return <span>{removeButton}</span>;
};

const HeaderComponent = (props) => {
  return <h2 className="tableHeading">{props.title}</h2>;
};

HeaderComponent.displayName = "HeaderComponent";

const columns = [
  {
    Header: <HeaderComponent title="Nombre" />,
    accessor: "name",
    Cell: (props) => props.value,
  },
  {
    Header: <HeaderComponent title="Precio $" />,
    accessor: "salePrice",
    Cell: (props) => props.value,
  },
  {
    Header: <HeaderComponent title="Cantidad Solicitada" />,
    accessor: "Cantidad",
    Cell: (props) => props.value,
  },
  {
    Header: <HeaderComponent title="Acciones" />,
    accessor: "id",
    Cell: renderToolbar,
  },
];

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

renderToolbar.propTypes = {
  value: PropTypes.string.isRequired,
};

export default columns;
