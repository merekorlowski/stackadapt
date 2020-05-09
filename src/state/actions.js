export const removeTracked = (cryptoCurrency, index) => ({
  type: "REMOVE_TRACKED",
  cryptoCurrency,
  index,
});

export const addTracked = (cryptoCurrency, index) => ({
  type: "ADD_TRACKED",
  cryptoCurrency,
  index,
});

export const sort = sortField => ({
  type: "SORT",
  sortField,
});
