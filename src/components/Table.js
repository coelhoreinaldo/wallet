import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../redux/actions/walletAction';
import '../styles/Table.css';

class Table extends Component {
  convertValue = (value, ask) => (value * ask).toFixed(2);
  // convertedValue: (Number(valueInput) * Number(exchangeRates[currencyInput].ask))

  handleRemoveClick = (item) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(item));
  };

  handleEditClick = (id, item) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
    dispatch(removeExpense(item));
  };

  render() {
    const { expenses } = this.props;
    expenses.sort((a, b) => a.id > b.id);
    return (
      <section className="table-main">
        <table border="1">
          <thead className="has-background-primary">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .map((item) => (
                <tr key={ item.id }>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{Number(item.value).toFixed(2)}</td>
                  <td>{item.exchangeRates[item.currency].name}</td>
                  <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                  <td>
                    {this.convertValue(item.value, item.exchangeRates[item.currency].ask)}
                  </td>
                  <td>Real</td>
                  <td>
                    <div className="edit-rmv-btns">

                      <button
                        onClick={ () => this.handleEditClick(item.id, item) }
                        data-testid="edit-btn"
                        className="button is-small is-warning"
                      >
                        Editar
                      </button>
                      <button
                        onClick={ () => this.handleRemoveClick(item) }
                        data-testid="delete-btn"
                        className="button is-small is-danger delete-btn"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
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
  dispatch: PropTypes.func.isRequired,
};
