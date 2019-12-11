import { setCategories, setCouponTypes, setExchangeTypes, setCurrencies } from "../actions";
import { connect } from "react-redux";
import AddCouponModal from "../components/AddCouponModal";

const mapStateToProps = state => {
  return {
    categories: state.dataStore && state.dataStore.categories,
    couponTypes: state.dataStore && state.dataStore.couponTypes,
    exchangeTypes: state.dataStore && state.dataStore.exchangeTypes,
    currencies: state.dataStore && state.dataStore.currencies,
    loggedIn: state.userPreference.loggedIn,
    userInfo: state.userPreference.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCategories: data => dispatch(setCategories(data)),
    setCouponTypes: data => dispatch(setCouponTypes(data)),
    setExchangeTypes: data => dispatch(setExchangeTypes(data)),
    setCurrencies: data => dispatch(setCurrencies(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCouponModal);
