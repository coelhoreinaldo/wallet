import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/walletAction';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Cartão de débito',
    tag: 'Lazer',
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

  handleClick = () => {
    const { expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    console.log(expenses);
    const newExpense = {
      id: expenses.id ? expenses.id + 1 : 1,
      value,
      currency,
      method,
      tag,
      description,
    };
    console.log(newExpense);
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <input
          type="number"
          name="value"
          value={ value }
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
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {currencies.map((item) => (
            <option key={ item }>{item}</option>
          ))}
        </select>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
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
      id: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
