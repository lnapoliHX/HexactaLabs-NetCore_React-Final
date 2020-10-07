import React from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { localRemove } from "../../../localstorage";
import { Button } from "reactstrap";

const renderToolbar = ({ value }) => {
  let removeButton = (
    <Button className="cart__button" onClick={() => remove(value)}>
      <FaTrash className="cart__button-icon" />
    </Button>
  );

  return (
    <span>
      {removeButton}
    </span>
  );
};

function remove(id) {
    localRemove(id);  
    window.location.reload(false);
}

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
    accessor: "cant",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Precio unitario" />,
    accessor: "salePrice",
    Cell: props => props.value
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
