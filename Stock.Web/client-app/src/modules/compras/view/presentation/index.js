import React from "react";
//import { Container, Row, Col, Button } from "reactstrap";
import { Container, Button } from "reactstrap";
import PropTypes from "prop-types";

const CompraView = (props) => {
  return (
    <Container fluid>
      <div className="block-header">
        <h1>Detalles de Compra</h1>
      </div>
      <div className="info-box">
        {
          //obtener el array de detalles e iterarlo
        }
      </div>
      <div className="product-view__button-row">
        {
          <Button
            title="Volver"
            aria-label="Volver"
            outline
            className="product-form__button"
            color="secondary"
            onClick={() => props.push(`/compras`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 470 474"
              width="20px"
              height="16px"
              xmlSpace="preserve"
            >
              <path d="M384.834,180.699c-0.698,0-348.733,0-348.733,0l73.326-82.187c4.755-5.33,4.289-13.505-1.041-18.26    c-5.328-4.754-13.505-4.29-18.26,1.041l-82.582,92.56c-10.059,11.278-10.058,28.282,0.001,39.557l82.582,92.561    c2.556,2.865,6.097,4.323,9.654,4.323c3.064,0,6.139-1.083,8.606-3.282c5.33-4.755,5.795-12.93,1.041-18.26l-73.326-82.188    c0,0,348.034,0,348.733,0c55.858,0,101.3,45.444,101.3,101.3s-45.443,101.3-101.3,101.3h-61.58    c-7.143,0-12.933,5.791-12.933,12.933c0,7.142,5.79,12.933,12.933,12.933h61.58c70.12,0,127.166-57.046,127.166-127.166    C512,237.745,454.954,180.699,384.834,180.699z" />
            </svg>
          </Button>
        }
      </div>
    </Container>
  );
};

CompraView.propTypes = {
  detalles: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
};

export default CompraView;
