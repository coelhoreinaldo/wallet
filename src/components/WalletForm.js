import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input type="number" data-testid="value-input" placeholder="Despesa" />
        <input type="text" data-testid="description-input" placeholder="Descrição" />
        <select data-testid="currency-input">
          {currencies.map((currency) => <option key={ currency }>{currency}</option>)}
        </select>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
