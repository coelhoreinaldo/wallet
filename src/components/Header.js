import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const reduced = expenses.reduce((acc, curr) => {
      const sum = (Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask));
      return (Number(acc) + sum).toFixed(2);
    }, 0);

    // const reduced = expenses
    //   .reduce((acc, { convertedValue }) => (Number(acc) + convertedValue).toFixed(2), 0); não funciona porque não pode colocar a chave convertedValue dentro da wallet.
    return (
      <header className="header">
        <h1 data-testid="email-field">{email}</h1>
        <h1 data-testid="total-field">
          {reduced}
        </h1>
        <h1 data-testid="header-currency-field">BRL</h1>
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
      value: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
