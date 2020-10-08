import React from "react";
import { connect } from "react-redux";
import { goBack } from "connected-react-router";
import PropTypes from "prop-types";
import OrderRemove from "../presentation";
import { remove } from "../index";

class OrderRemovePage extends React.Component {
  render() {
    return (
      <OrderRemove
        remove={() => this.props.remove(this.props.match.params.id)}
        goBack={this.props.goBack}
      />
    );
  }
}

OrderRemovePage.propTypes = {
  remove: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapDispatchToProps = { remove, goBack };

export default connect(
  null,
  mapDispatchToProps
)(OrderRemovePage);
