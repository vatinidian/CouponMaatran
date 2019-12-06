const dataStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case "setSubFilterItems":
      return { ...state, subFilterItems: action.subFilterItems };

    case "setCategories":
      return { ...state, categories: action.categories };

    case "setCouponTypes":
      return { ...state, couponTypes: action.couponTypes };

    case "setExchangeTypes":
      return { ...state, exchangeTypes: action.exchangeTypes };

      case "setCurrencies":
          return { ...state, currencies: action.currencies };  

    default:
      return state;
  }
};

export default dataStoreReducer;
