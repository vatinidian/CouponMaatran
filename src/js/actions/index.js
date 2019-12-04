export const loadSubFilterItems = data => {
  return {
    type: "loadSubFilterItems",
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
