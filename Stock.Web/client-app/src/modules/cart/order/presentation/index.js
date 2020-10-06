import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import PropTypes from "prop-types";

const OrderCart = ({ order, goBack }) => {
  return (
    <Modal isOpen>
      <ModalHeader>Ordenar carro</ModalHeader>
      <ModalBody>¿Desea finalizar su compra?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={order}>
          Sí
        </Button>
        <Button color="secondary" onClick={goBack}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
};

OrderCart.propTypes = {
  remove: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
};

OrderCart.displayName = "OrderCart";

export default OrderCart;
