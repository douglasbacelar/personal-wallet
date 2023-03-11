import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { infoExpenses } = this.props;
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
          {infoExpenses.map((expense) => (

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
                {expense.value}
              </td>
              <td>
                {' '}
                BRL
              </td>
              <td>
                {' '}
                Verificar
              </td>
              <td>
                {' '}
                Verificar
              </td>
              <td>
                {' '}
                {expense.currency}
              </td>
              <td>
                {' '}
                Verificar
              </td>
            </tr>
          ))}
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
};

export default connect(mapStateToProps)(Table);
