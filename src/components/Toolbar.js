import React, { useState } from "react";
import { connect } from "react-redux";
import { sort, addTracked } from "../state/actions";
import "./Toolbar.css";

const Toolbar = props => {
  const [showCurrencies, setShowCurrencies] = useState(false);

  const handleAddTracked = index => {
    setShowCurrencies(false);
		props.addTracked(props.cryptoCurrencies[index], index);
		props.sort(props.sortField);
  };

  const handleSort = sortField => {
    props.sort(sortField);
  };

  return (
    <div className="toolbar">
      <div>
				Sort by: 
        <select
          value={props.sortField}
          onChange={event => handleSort(event.target.value)}
        >
          <option value="rank">Rank</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="container">
        <button
          onClick={() => setShowCurrencies(true)}
          disabled={props.trackedCryptoCurrencies.length === 10}
        >
          Track currency
        </button>
        {showCurrencies && (
          <div className="dropdown">
            {props.cryptoCurrencies.map((cryptoCurrency, index) => (
              <div onClick={() => handleAddTracked(index)}>
                {cryptoCurrency.symbol}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cryptoCurrencies: state.cryptoCurrencies,
  trackedCryptoCurrencies: state.trackedCryptoCurrencies,
  sortField: state.sortField,
});

const mapDispatchToProps = dispatch => ({
  sort: field => dispatch(sort(field)),
  addTracked: (cryptoCurrency, index) =>
    dispatch(addTracked(cryptoCurrency, index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
