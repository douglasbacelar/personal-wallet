import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, DELETE_EXPENSES,
  handleAction, captureInput } from '../redux/actions';
import editBtn from '../edit-btn.png';
import deleteBtn from '../delete-btn.png';

class Table extends Component {
  deleteButton = (teste) => {
    const { infoExpenses, dispatch } = this.props;
    const deleteExpense = infoExpenses.filter((remove) => remove.id !== teste);
    dispatch(handleAction(DELETE_EXPENSES, deleteExpense));
  };

  captureInputEdited = (allExpense) => {
    const { dispatch } = this.props;
    const { id, value, tag, description, method, currency } = allExpense;
    const obj = { value, tag, description, method, currency };
    dispatch(editExpense(true, id));
    dispatch(captureInput(obj));
  };

  render() {
    const { infoExpenses } = this.props;
    return (
      // bg-blue-wallet rounded-lg shadow-xl flex flex-row text-xs h-482
      //   justify-center pl-4 pr-4 absolute top-40 w-1155  -z-1
      <div
        className="bg-blue-wallet rounded-lg shadow-2xl
        flex flex-row text-xs h-[75vh] justify-center
         pl-4 pr-4 absolute top-40 w-1155 -z-1"
      >
        {/* relative top-64 w-1037 */}
        <table
          className="relative top-56 w-1037 flex flex-col  text-sm h-[40vh] mb-64"
        >
          <thead className="items-center border-b-2 ">
            <tr>
              <th className="text-white p-2  w-64">Descrição</th>
              <th className="text-white p-2 w-64 border-l-0">Tag</th>
              <th className="text-white p-2 w-64">Método de pagamento</th>
              <th className="text-white p-2 w-64">Valor</th>
              <th className="text-white p-2 w-64">Moeda</th>
              <th className="text-white p-2 w-64">Câmbio utilizado</th>
              <th className="text-white p-2 w-64">Valor convertido</th>
              <th className="text-white p-2 w-64">Moeda de conversão</th>
              <th className="text-white p-2 w-64">Excluir/Editar</th>
            </tr>
          </thead>
          <tbody
            className=" text-green-wallet font-semibold
          overflow-x-hidden overflow-y-scroll "
          >
            {infoExpenses.map((expense) => {
              const exchangeUsed = Number(expense.exchangeRates[expense.currency].ask)
                .toFixed(2);
              const valueConversion = Number((expense.value)
            * expense.exchangeRates[expense.currency].ask).toFixed(2);
              return (
                <tr key={ expense.id } className=" hover:bg-green-100 rounded-xl">
                  {/* flex items-center h-20 w-10 justify-center */}
                  <td className="items-center h-20 w-64">
                    {' '}
                    {expense.description}
                  </td>
                  <td className="items-center h-20 w-64">
                    {' '}
                    {expense.tag}
                  </td>
                  <td className="items-center h-20 w-64">
                    {' '}
                    {expense.method}
                  </td>
                  <td className="items-center h-20 w-48">
                    {' '}
                    {parseFloat(expense.value).toFixed(2)}
                  </td>
                  <td className="items-center h-20 w-48">
                    {' '}
                    {expense.exchangeRates[expense.currency].name}
                  </td>
                  <td className="items-center h-20 w-64">
                    {' '}
                    {exchangeUsed}
                  </td>
                  <td className="items-center h-20 w-64">
                    {' '}
                    {valueConversion}
                  </td>
                  <td className="items-center h-20 w-64">
                    {' '}
                    Real
                  </td>
                  <td className="items-center h-20 w-64">
                    <button
                      data-testid="delete-btn"
                      className="bg-transparent border-none cursor-pointer py-0 px-4 "
                      onClick={ () => this.deleteButton(expense.id) }
                    >
                      <img src={ deleteBtn } alt="Deletar despesa" />
                    </button>
                    <button
                      data-testid="edit-btn"
                      className="bg-transparent border-none cursor-pointer py-0 px-4 "
                      onClick={ () => this.captureInputEdited(expense) }
                    >
                      <img src={ editBtn } alt="Editar despesa" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
