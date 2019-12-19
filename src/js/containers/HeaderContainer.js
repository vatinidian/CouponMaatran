import { setSearchInput, setFireSearch } from "../actions";
import { connect } from "react-redux";
import Header from "../components/Header";

const mapStateToProps = state => {
  return {
    loggedIn: state.userPreference.loggedIn,
    userInfo: state.userPreference.userInfo,
    searchInput: state.userPreference.searchInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchInput: data => dispatch(setSearchInput(data)),
    setFireSearch: data => dispatch(setFireSearch(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
