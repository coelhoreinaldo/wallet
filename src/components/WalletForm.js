import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../redux/actions/walletAction';
import { fetchCurrenciesApi } from '../utils/fetchCurrencies';
import '../styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    valueInput: 0,
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
    let newValue = value;

    if (target.type === 'number') newValue = Number(value);

    this.setState({ [name]: newValue });
  };

  handleClick = async () => {
    const exchangeRates = await fetchCurrenciesApi();
    const { expenses, dispatch, idToEdit, editor } = this.props;
    const { valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput } = this.state;

    const exchangeRatesWithBrl = {
      BRL: {
        code: 'BRL',
        ask: '1',
        name: 'Real Oficial',
      },
      ...exchangeRates,
    };

    const newExpense = {
      id: expenses.length > 0 ? (expenses.length - 1) + 1 : 0,
      value: valueInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
      description: descriptionInput,
      exchangeRates: exchangeRatesWithBrl,
      // convertedValue: (Number(valueInput) * Number(exchangeRates[currencyInput].ask)),
    };

    const editedExpense = {
      id: idToEdit,
      value: valueInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
      description: descriptionInput,
      exchangeRates,
      // convertedValue: (Number(valueInput) * Number(exchangeRates[currencyInput].ask)),
    };

    dispatch(addExpense(!editor ? newExpense : editedExpense));
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({
      valueInput: 0,
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
    });
  };

  render() {
    const { currencies, editor, errorMessage } = this.props;
    const { valueInput, descriptionInput, currencyInput, methodInput,
      tagInput } = this.state;
    return (
      <form className="wallet-form box">
        <div className="inputs-container columns">
          <div className="column is-four-fifths">
            <label
              htmlFor="descriptionInput"
              className="label "
            >
              Descrição da despesa:
            </label>
            <input
              id="description-input"
              type="text"
              name="descriptionInput"
              className="input"
              value={ descriptionInput }
              data-testid="description-input"
              placeholder="Descrição"
              onChange={ this.handleChange }
            />

          </div>
          <div className="column">
            <label htmlFor="tagInput" className="label ">
              Categoria da despesa:
            </label>

            <select
              className="select"
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

          </div>
        </div>
        <div className="inputs-container columns">
          <div className="column is-three-fifths">
            <label htmlFor="valueInput" className="label">
              Valor da despesa:
            </label>
            <input
              id="valueInput"
              type="number"
              className="input"
              name="valueInput"
              value={ valueInput }
              data-testid="value-input"
              placeholder="Despesa"
              onChange={ this.handleChange }
            />
          </div>
          <div className="column">
            <label htmlFor="currencyInput" className="label">
              Moeda:
            </label>
            <select
              id="currencyInput"
              className="select"
              name="currencyInput"
              value={ currencyInput }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((item) => (
                <option key={ item }>{item}</option>
              ))}
            </select>
          </div>
          <div className="column">
            <label htmlFor="methodInpur" className="label">
              Método de pagamento:
            </label>
            <select
              id="methodInput"
              className="select"
              name="methodInput"
              value={ methodInput }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </div>
        </div>

        <button
          className="button is-link"
          type="button"
          onClick={ this.handleClick }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
        <p>{errorMessage}</p>
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
      value: PropTypes.number,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  ).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
