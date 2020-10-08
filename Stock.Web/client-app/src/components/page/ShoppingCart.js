import React from "react";
import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";
import "./ShoppingCart.css";

const ShoppingCart = ({ itemsCount }) => {
    return (
        <div className="ui-shopping-cart">
            <FaShoppingCart className="ui-shopping-cartx"/>
            <span className="ui-shopping-cart-section-items-count">
                {itemsCount}
            </span>
        </div>
        
    );
}

ShoppingCart.propTypes = {
    itemsCount: PropTypes.number.isRequired,
};

export default ShoppingCart;
