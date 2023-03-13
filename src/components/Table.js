import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, DELETE_EXPENSES } from '../redux/actions';

class Table extends Component {
  deleteButton = (teste) => {
    const { infoExpenses, dispatch } = this.props;
    const deleteExpense = infoExpenses.filter((remove) => remove.id !== teste);
    dispatch(handleAction(DELETE_EXPENSES, deleteExpense));
  };

  render() {
    const { infoExpenses, dispatch } = this.props;
    return (
      <table border="1">
        <thead>
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
          {infoExpenses.map((expense) => {
            const exchangeUsed = Number(expense.exchangeRates[expense.currency].ask)
              .toFixed(2);
            const valueConversion = Number((expense.value)
            * expense.exchangeRates[expense.currency].ask).toFixed(2);
            return (
              <tr key={ expense.id }>
                <td>
                  {' '}
                  {expense.description}
                </td>
                <td>
                  {' '}
                  {expense.tag}
                </td>
                <td>
                  {' '}
                  {expense.method}
                </td>
                <td>
                  {' '}
                  {parseFloat(expense.value).toFixed(2)}
                </td>
                <td>
                  {' '}
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td>
                  {' '}
                  {exchangeUsed}
                </td>
                <td>
                  {' '}
                  {valueConversion}
                </td>
                <td>
                  {' '}
                  Real
                </td>
                <td>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.deleteButton(expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => dispatch(editExpense(true, expense.id)) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  infoExpenses: state.wallet.expenses,
});

Table.propTypes = {
  infoExpenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
