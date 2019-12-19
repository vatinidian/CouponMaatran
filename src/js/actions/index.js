export const setSubFilterItems = data => {
  return {
    type: "setSubFilterItems",
    subFilterItems: data
  };
};

export const addToSelectedSubFilter = data => {
  return {
    type: "addToSelectedSubFilter",
    selectedSubFilter: data
  };
};

export const removeFromSelectedSubFilter = data => {
  return {
    type: "removeFromSelectedSubFilter",
    removedSubFilter: data
  };
};

export const setCategories = data => {
  return {
    type: "setCategories",
    categories: data
  };
};

export const setCouponTypes = data => {
  return {
    type: "setCouponTypes",
    couponTypes: data
  };
};

export const setCurrencies = data => {
  return {
    type: "setCurrencies",
    currencies: data
  };
};

export const setExchangeTypes = data => {
  return {
    type: "setExchangeTypes",
    exchangeTypes: data
  };
};


export const setUserLoginInfo = data => {
  return {
    type: "setUserLoginInfo",
    userInfo: data
  };
};


export const setSearchInput = data => {
  return {
    type: "setSearchInput",
    searchInput: data
  };
};

export const setFireSearch = data => {
  return {
    type: "setFireSearch",
    fireSearch: data
  };
};