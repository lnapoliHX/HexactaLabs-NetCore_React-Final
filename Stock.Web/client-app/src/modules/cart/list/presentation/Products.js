import React from "react";
import { FaPlus } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import columns from "./ColumnsConfig";
import ReactTable from "react-table";
import Search from "./ProductSearch";

import PropTypes from "prop-types";

const Presentation = props => {
  console.log(props);
  let acum = 0;


  function acumulador() {
    props.data.filter(
      prod => (Object.entries(localStorage)
        .filter(lsk => lsk[0] === prod.id).length > 0
      )).filter(producto => (
        acum += JSON.parse((Object.entries(localStorage).find(lsk => lsk[0] === producto.id))[1]).valor * producto.salePrice
      ))
    return acum;
  }

  return (
    <Container fluid>
      <Row className="my-1">
        <Col>
          <h1>Productos</h1>
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <Button
            className="product__button"
            color="primary"
            aria-label="Agregar"
            onClick={() => props.push(props.urls.create)}
          >
            <FaPlus className="product__button-icon" />
            AGREGAR
          </Button>
        </Col>
        <Col>
          <h4> Precio Total  
            {              
              " " + (acumulador()) + " "                
            }
          </h4>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <ReactTable
            {...props}
            data={props.data.filter(
              prod => (Object.entries(localStorage)
                .filter(lsk => lsk[0] === prod.id).length > 0
              ))}
            pages={props.pages}
            loading={props.dataLoading}
            columns={columns}
            defaultPageSize={props.defaultPageSize}
            className="-striped -highlight"
          />
        </Col>
      </Row>
    </Container>
  );
};

Presentation.propTypes = {
  data: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  pages: PropTypes.number,
  dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
  handleFilter: PropTypes.func.isRequired,
  submitFilter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  urls: PropTypes.shape({ create: PropTypes.string }),
  push: PropTypes.func.isRequired
};

export default Presentation;
