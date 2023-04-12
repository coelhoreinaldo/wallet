import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <>
        <div>Table</div>
        <table border="1">
          <tbody>
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
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{expense.exchangeRates[expense.currency].ask}</td>
                <td>valor convertido</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
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
      value: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
