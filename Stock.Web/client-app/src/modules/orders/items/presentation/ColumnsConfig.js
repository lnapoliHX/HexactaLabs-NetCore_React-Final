import React from "react";
import PropTypes from "prop-types";

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
    Header: <HeaderComponent title="Producto" />,
    accessor: "productName",
    width: 250,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Precio" />,
    accessor: "salePrice",
    width: 100,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Cantidad" />,
    accessor: "quantity",
    width: 150,
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Total" />,
    accessor: "total",
    width: 90,
    Cell: props => props.value
  },
];

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired
};

export default columns;
