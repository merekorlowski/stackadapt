import React from "react";
import { connect } from "react-redux";
import { removeTracked } from "../state/actions";

const CryptoCurrencyTable = props => (
  <table>
    <thead>
      <tr>
        <th>CMC Rank</th>
        <th>Symbol</th>
        <th>Price (USD)</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {props.trackedCryptoCurrencies.map((cryptoCurrency, index) => (
        <tr>
          <td>{cryptoCurrency.rank}</td>
          <td>{cryptoCurrency.symbol}</td>
          <td>{cryptoCurrency.price}</td>
          <td>
            <button onClick={() => props.removeTracked(cryptoCurrency, index)}>
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const mapStateToProps = state => ({
  trackedCryptoCurrencies: state.trackedCryptoCurrencies,
});

const mapDispatchToProps = dispatch => ({
  removeTracked: (cryptoCurrency, index) =>
    dispatch(removeTracked(cryptoCurrency, index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CryptoCurrencyTable);
