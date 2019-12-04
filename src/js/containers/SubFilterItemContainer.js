import { loadSubFilterItems, addToSelectedSubFilter, removeFromSelectedSubFilter } from "../actions";
import { connect } from "react-redux";
import SubFilterItem from "../components/SubFilterItem";

const mapStateToProps = state => {
  return {
    subFilterItems: state.header && state.header.subFilterItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSubFilterItems: data => dispatch(loadSubFilterItems(data)),
    addToSelectedSubFilter: data => dispatch(addToSelectedSubFilter(data)),
    removeFromSelectedSubFilter: data => dispatch(removeFromSelectedSubFilter(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubFilterItem);
