import React from "react";
import { FaPlus } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import columns from "./ColumnsConfig";
import ReactTable from "react-table";
import Search from "./ProductSearch";
import { cloneDeep, pickBy } from "lodash";
import api from "../../../../common/api";
import { apiErrorToast } from "../../../../common/api/apiErrorToast";
import { setLoading, ActionTypes, getLoading, checkout } from "../../list";
import { toast } from "react-toastify";
import { replace } from "connected-react-router";
import { connect } from "react-redux";

import PropTypes from "prop-types";

const Presentation = props => {
  console.log(props);
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
            onClick={() => comprar(props)}
          >
            <FaPlus className="product__button-icon" />
            AGREGAR
          </Button>
        </Col>
        <Col>
          <h4> Precio Total
            {
              " " + (acumulador(props)) + " "
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
  push: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
};

//export default Presentation;

/* Actions */
function success(product) {
  return {
    type: ActionTypes.CREATE,
    product
  };
}

const mapStateToProps = state => {  
  console.log("State", state);
  return {
    loading: getLoading(state)
  };
};

const mapDispatchToProps = {
  checkout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentation);

//---------------------------------------------------------------------------------
function acumulador(props) {
  let acum = 0;
  props.data.filter(
    prod => (Object.entries(localStorage)
      .filter(lsk => lsk[0] === prod.id).length > 0
    )).filter(producto => (
      acum += JSON.parse((Object.entries(localStorage).find(lsk => lsk[0] === producto.id))[1]).valor * producto.salePrice
    ))
  return acum;
}

export function crearCarrito(props) {
console.log("PROOOOOOOOOOOOPSSSAASASAS",props)

   let cart = [];
  props.data.filter(
    prod => (Object.entries(localStorage)
      .filter(lsk => lsk[0] === prod.id).length > 0
    )).filter(producto => {
      let item = {
        id: String,
        purchaseQuantity: Number,
        isSold: Boolean,
        name : String,
        salePrice : Number
      };
      item.id = producto.id;
      item.purchaseQuantity = JSON.parse((Object.entries(localStorage).find(lsk => lsk[0] === producto.id))[1]).valor;
      item.isSold = true;
      item.name = "";
      item.salePrice = 0;
      cart.push(item);
    }
    )
  return cart
}

export function comprar(props){
  console.log("props antes del checkoutasdasdasdasdasdasdasdasdasd",props)
  props.checkout(crearCarrito(props));
}



function handleError(dispatch, error) {
  apiErrorToast(error);

  return dispatch(setLoading(false));
}

export function checkoutNoLoUso(cart) {
  console.log("entrando a guardar", cart)
  return function (dispatch) {
    console.log("en el return", cart)
    debugger;
    dispatch(setLoading(true));
    return api
      .post(`/checkout/`, cart)
      .then((response) => {
        
        if (!response.data.success) {
          var error = { response: { data: { Message: response.data.message } } };

          return handleError(dispatch, error);
        }

        dispatch(success(response.data.data));
        dispatch(setLoading(false));
        toast.success("El producto se creó con éxito");

        return dispatch(replace("/product"));
      })
      .catch(error => {
        
        return handleError(dispatch, error);
      });
  };
}



