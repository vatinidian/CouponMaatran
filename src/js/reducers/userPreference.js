const initialState = {
  selectedSubFilter: [],
  loggedIn: false,
  userInfo: {}
};

const getFilterCarouselItemIndex = (aFilters, sFilterName) => {
  return aFilters.findIndex(oFilter => oFilter.filterName === sFilterName);
};

const userPreference = (state = initialState, action) => {
  let aNewSubFilters;
  switch (action.type) {
    case "addToSelectedSubFilter":
      aNewSubFilters = Object.assign([], state.selectedSubFilter);
      aNewSubFilters.push(action.selectedSubFilter);
      return { ...state, selectedSubFilter: aNewSubFilters };

    case "removeFromSelectedSubFilter": // TODO  : Think any compact way
      aNewSubFilters = Object.assign([], state.selectedSubFilter);
      aNewSubFilters.splice(
        getFilterCarouselItemIndex(aNewSubFilters, action.removedSubFilter.filterName),
        1
      );
      return { ...state, selectedSubFilter: aNewSubFilters };

    case "setUserLoginInfo":
      return {...state, loggedIn: true, userInfo: action.userInfo}  
    default:
      return state;
  }
};

export default userPreference;
