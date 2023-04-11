import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/walletAction';

class WalletForm extends Component {
  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  };

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input type="number" data-testid="value-input" placeholder="Despesa" />
        <input type="text" data-testid="description-input" placeholder="Descrição" />
        <select data-testid="currency-input">
          {currencies.map((currency) => (
            <option key={ currency }>{currency}</option>
          ))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
