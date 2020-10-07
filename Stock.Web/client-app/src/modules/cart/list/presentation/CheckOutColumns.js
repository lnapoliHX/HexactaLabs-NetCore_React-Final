import React from "react";
import PropTypes from "prop-types";

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
    Header: <HeaderComponent title="Cantidad" />,
    accessor: "stock",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Precio unitario" />,
    accessor: "salePrice",
    Cell: props => props.value
  }
];

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default columns;
