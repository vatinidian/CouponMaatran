import { setSubFilterItems, addToSelectedSubFilter, removeFromSelectedSubFilter, setFireSearch } from "../actions";
import { connect } from "react-redux";
import SubFilterItem from "../components/SubFilterItem";

const mapStateToProps = state => {
  return {
    subFilterItems: state.dataStore && state.dataStore.subFilterItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSubFilterItems: data => dispatch(setSubFilterItems(data)),
    addToSelectedSubFilter: data => dispatch(addToSelectedSubFilter(data)),
    removeFromSelectedSubFilter: data => dispatch(removeFromSelectedSubFilter(data)),
    setFireSearch: data => dispatch(setFireSearch(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubFilterItem);
