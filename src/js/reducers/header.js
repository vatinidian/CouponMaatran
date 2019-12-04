const subFilterItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case "loadSubFilterItems":
      return { subFilterItems: action.subFilterItems };

    default:
      return state;
  }
};

export default subFilterItemsReducer;
