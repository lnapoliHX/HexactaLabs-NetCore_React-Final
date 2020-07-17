import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getBasket, fetchAll, getLoading } from "..";
import List from "../presentation";

const mapStateToProps = state => {
  return {
    data: getBasket(state),
    dataLoading: getLoading(state),
    defaultPageSize: 5
  };
};

const mapDispatchToProps = {
  fetchAll,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
