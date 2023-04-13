import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const reduced = expenses.reduce((acc, curr) => {
      const sum = (curr.value * (curr.exchangeRates[curr.currency].ask));
      return (acc + sum);
    }, 0);

    // const reduced = expenses
    //   .reduce((acc, { convertedValue }) => (Number(acc) + convertedValue).toFixed(2), 0); não funciona porque não pode colocar a chave convertedValue dentro da wallet.
    return (
      <header className="header">
        <h1
          data-testid="email-field"
          className="title has-text-weight-semibold"
        >
          {email}

        </h1>
        <div className="currency-field">
          <h1
            data-testid="total-field"
            className="title has-text-success has-strong has-text-weight-bold"
          >
            {reduced.toFixed(2)}
          </h1>
          <span
            data-testid="header-currency-field"
            className="title has-text-weight-semibold"
          >
            BRL

          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.number,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
