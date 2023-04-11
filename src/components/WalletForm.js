import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/walletAction';

class WalletForm extends Component {
  state = {
    valueInput: 0,
    description: '',
    currencyInput: 'USD',
    methodInput: 'Cartão de débito',
    tagInput: 'Lazer',
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { valueInput, description, currencyInput, methodInput, tagInput } = this.state;
    return (
      <form>
        <input
          type="number"
          name="valueInput"
          value={ valueInput }
          data-testid="value-input"
          placeholder="Despesa"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
          placeholder="Descrição"
          onChange={ this.handleChange }
        />
        <select
          name="currencyInput"
          value={ currencyInput }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {currencies.map((currency) => (
            <option key={ currency }>{currency}</option>
          ))}
        </select>
        <select
          name="methodInput"
          value={ methodInput }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tagInput"
          value={ tagInput }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ () => console.log('xd') }
        >
          Adicionar despesa
        </button>
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
