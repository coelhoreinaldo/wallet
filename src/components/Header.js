import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import logo from '../images/logo.svg';

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
      <header className="box header">
        <img src={ logo } alt="logo" />
        <div className="currency-field">
          <h1
            data-testid="email-field"
            className="title is-4 has-text-weight-semibold"
          >
            {email}

          </h1>
          <h1
            data-testid="total-field"
            className="title has-text-success has-strong has-text-weight-bold"
          >
            {`$${reduced.toFixed(2)} `}
            <span
              data-testid="header-currency-field"
              className="has-text-black has-text-weight-semibold"
            >
              BRL

            </span>
          </h1>
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
