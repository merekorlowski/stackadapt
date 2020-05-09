import { combineReducers } from "redux";

/**
 * Helper function for sorting crypto currencies based on a specific field
 */
const sortCryptoCurrencies = (cryptoCurrencies, sortField) => {
  cryptoCurrencies.sort((a, b) => {
    if (a[sortField] > b[sortField]) {
      return 1;
    }

    if (a[sortField] < b[sortField]) {
      return -1;
    }

    return 0;
  });
};

const cryptoCurrencies = (state = [], action) => {
  switch (action.type) {
    case "REMOVE_TRACKED":
      return [...state, action.cryptoCurrency];
    case "ADD_TRACKED":
      const newState = [...state];

      newState.splice(action.index, 1);

      sortCryptoCurrencies(newState, "symbol");

      return newState;
    default:
      return state;
  }
};

const trackedCryptoCurrencies = (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case "SORT":
      sortCryptoCurrencies(newState, action.sortField);

      return newState;
    case "ADD_TRACKED":
      if (state.length < 10) {
        return [...state, action.cryptoCurrency];
      }

      return state;
    case "REMOVE_TRACKED":
      newState.splice(action.index, 1);

      return newState;
    default:
      return state;
  }
};

const sortField = (state = "symbol", action) => {
  switch (action.type) {
    case "SORT":
      return action.sortField;
    default:
      return state;
  }
};

export default combineReducers({
  cryptoCurrencies,
  trackedCryptoCurrencies,
  sortField,
});
