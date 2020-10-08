import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const renderToolbar = ({ value }) => {
  let viewButton = (
    <Link className="product-list__button" to={`/compras/view/${value}`}>
      <FaSearch className="product-list__button-icon" />
    </Link>
  );

  return <span>{viewButton}</span>;
};

const HeaderComponent = (props) => {
  return <h2 className="tableHeading">{props.title}</h2>;
};

HeaderComponent.displayName = "HeaderComponent";

function formatearFecha(data) {
  var d = new Date(data);
  var datestring =
    d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  return datestring;
}

const columns = [
  {
    Header: <HeaderComponent title="Fecha" />,
    accessor: "fecha",
    Cell: (props) => formatearFecha(props.value),
  },
  {
    Header: <HeaderComponent title="Monto total $" />,
    accessor: "totalPrice",
    Cell: (props) => props.value,
  },
  {
    Header: <HeaderComponent title="Detalles" />,
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
