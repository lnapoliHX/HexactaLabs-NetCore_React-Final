import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import ReactTable from "react-table";
import columns from "./ColumnsConfig";

const Presentation = props => { 
  return (
    <Container fluid>
      <Row className="my-3">
        <Col>
          <ReactTable
            {...props}
            className="-striped -highlight"
            data={props.data}
            //loading={props.dataLoading}
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
  //dataLoading: PropTypes.bool.isRequired,
  defaultPageSize: PropTypes.number,
};

export default Presentation;
