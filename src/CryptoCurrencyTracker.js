import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import configureStore from "./state/store";
import CryptoCurrencyTable from "./components/CryptoCurrencyTable";
import Toolbar from "./components/Toolbar";
import DataFetcher from "./DataFetcher";

const DEFAULT_START_AMOUNT = 5;

const CryptoCurrencyTracker = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    DataFetcher.getCurrencies().then(response => setCurrencies(response));
  }, []);

  return (
    <Provider
      store={configureStore({
        cryptoCurrencies: currencies.slice(
          DEFAULT_START_AMOUNT,
          currencies.length
        ),
        trackedCryptoCurrencies: currencies.slice(0, DEFAULT_START_AMOUNT),
      })}
    >
      <Toolbar />
      <CryptoCurrencyTable />
    </Provider>
  );
};

export default CryptoCurrencyTracker;
