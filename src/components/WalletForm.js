import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../redux/actions/walletAction';
import { fetchExchangesApi } from '../utils/fetchCurrencies';

class WalletForm extends Component {
  state = {
    valueInput: '',
    descriptionInput: '',
    currencyInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
  };

  componentDidMount() {
    this.fetchApiForCurrencies();
  }

  fetchApiForCurrencies = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const newValue = value;

    // if (target.type === 'number') newValue = Number(value);

    this.setState({ [name]: newValue });
  };

  handleClick = async () => {
    const exchangeRates = await fetchExchangesApi();
    const { expenses, dispatch } = this.props;
    const { valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput } = this.state;

    const newExpense = {
      id: expenses.length > 0 ? (expenses.length - 1) + 1 : 0,
      value: valueInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
      description: descriptionInput,
      exchangeRates,
      // convertedValue: (Number(valueInput) * Number(exchangeRates[currencyInput].ask)),
    };

    console.log(newExpense);
    dispatch(addExpense(newExpense));
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { valueInput, descriptionInput, currencyInput, methodInput,
      tagInput } = this.state;
    return (
      <form>
        <input
          type="text"
          name="valueInput"
          value={ valueInput }
          data-testid="value-input"
          placeholder="Despesa"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="descriptionInput"
          value={ descriptionInput }
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
          {currencies.map((item) => (
            <option key={ item }>{item}</option>
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
          onClick={ this.handleClick }
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

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
