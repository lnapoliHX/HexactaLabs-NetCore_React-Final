import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import ReactTable from "react-table";
import columns from "./ColumnsConfig";
import Search from "./ProductSearch";

import { FaCartPlus } from "react-icons/fa";

const Presentation = props => {
  const [editableData, setEditableData] = useState(props.data);
  const onAddItemToCart = props.onAddItemToCart;

  const renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa", padding: 2 }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = editableData;
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          setEditableData(data);
        }}
        dangerouslySetInnerHTML={{
          __html: editableData[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  const onClickAddItemButton = (props) => {
    onAddItemToCart(props.original.id, 
                    props.original.name, 
                    props.original.salePrice,
                    props.original.quantityToOrder, 
                    props.original.stock);
  }

  const renderAddItemButton = (props) => {
    let addItemToCartButton = (
      <button className="product-list__button3"
                onClick={() => onClickAddItemButton(props)}              
                id={props.value} >
                <FaCartPlus className="product-list__button-icon3" />
      </button>
    );

    return (
      <span>
        {addItemToCartButton}
      </span>
    );
  };

  let idx = columns.findIndex(col => col.accessor === 'quantityToOrder');
  columns[idx] = { ...columns[idx], Cell: renderEditable };

  idx = columns.findIndex(col => col.Header.props.title === 'Comprar');
  columns[idx] = { ...columns[idx], Cell: renderAddItemButton};

  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Productos</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Search
            handleFilter={props.onFilterChange}
            submitFilter={props.onFilterSubmit}
            clearFilter={props.clearFilter}
            filters={props.filters}
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <Button
            className="product__button"
            color="primary"
            onClick={() => props.push(props.urls.create)}
          >
            <FaPlus className="product__button-icon" />
            Agregar
          </Button>
          <Button
            className="product__button2"
            color="danger"
            onClick={() => props.push(props.urls.checkout)}
          >
            <FaPlus className="product__button-icon" />
            Checkout
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <ReactTable
            {...props}
            className="-striped -highlight"
            data={props.data}
            loading={props.dataLoading}
            columns={columns}
            defaultPageSize={props.defaultPageSize}
          />
        </Col>
      </Row>
    </Container>
  );
};

Presentation.propTypes = {
  data: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
  onFilterChange: PropTypes.func.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  urls: PropTypes.shape({ create: PropTypes.string }),
  push: PropTypes.func.isRequired
};

export default Presentation;
