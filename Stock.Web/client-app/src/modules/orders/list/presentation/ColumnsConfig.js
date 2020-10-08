import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTrash, FaSearch } from "react-icons/fa";

const renderToolbar = ({value}) => {
  let viewButton = (
    <Link className="order-list__button" to={`/order/view/${value}`}>
      <FaSearch className="order-list__button-icon" />
    </Link>
  );

  let removeButton = (
    <Link className="order-list__button" to={`/order/remove/${value}`}>
      <FaTrash className="order-list__button-icon2" />
    </Link>
  );

  return (
    <span>
      {viewButton} {removeButton} 
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
    Header: <HeaderComponent title="id" />,
    accessor: "id",
    width: 300,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Fecha" />,
    accessor: "dateTime",
    width: 200,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Total" />,
    accessor: "total",
    width: 100,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Acciones" />,
    accessor: "id",
    Cell: renderToolbar
  },
];

renderToolbar.propTypes = {
  value: PropTypes.string.isRequired
};

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired
};

export default columns;
