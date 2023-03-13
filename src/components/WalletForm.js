import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletCurrencies, refreshCurrencies,
  editExpense, arrayExpensesToEdit } from '../redux/actions';

const generalTag = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: '',
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: generalTag,
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletCurrencies());
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(refreshCurrencies(this.state));
    this.setState((previewState) => ({
      id: previewState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: generalTag,
      exchangeRates: {},
    }));
  };

  handleEditorClick = () => {
    const { dispatch, idToEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const obj = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };

    dispatch(arrayExpensesToEdit(obj));
    dispatch(editExpense(false, 0));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { coinType, editor } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="coinValue" className="value-input">
            Valor
            <input
              data-testid="value-input"
              type="number"
              id="coinValue"
              name="coinValue"
              value={ value }
              onChange={ (e) => this.setState({ value: e.target.value }) }
            />
          </label>

          <label htmlFor="descriptionValue" className="description-input">
            Descrição
            <input
              data-testid="description-input"
              type="text"
              id="descriptionValue"
              name="descriptionValue"
              value={ description }
              onChange={ (e) => this.setState({ description: e.target.value }) }
            />
          </label>

          <label htmlFor="coin" className="form-select-coin">
            Moeda
            <select
              data-testid="currency-input"
              className="form-select-coin"
              id="coin"
              value={ currency }
              onChange={ (e) => this.setState({ currency: e.target.value }) }
              required
            >
              {coinType.map((coin) => (
                <option id="coin" key={ coin } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>

          <label htmlFor="pay">
            Método de Pagamento
            <select
              id="pay"
              data-testid="method-input"
              className="form-select-pay"
              value={ method }
              onChange={ (e) => this.setState({ method: e.target.value }) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria
            <select
              id="category"
              data-testid="tag-input"
              className="form-select-category"
              value={ tag }
              onChange={ (e) => this.setState({ tag: e.target.value }) }
              required
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          { editor ? (
            <button
              type="button"
              onClick={ () => this.handleEditorClick() }
            >
              Editar despesa
            </button>)
            : (
              <button
                className="btn-expense"
                type="button"
                onClick={ () => this.handleClick() }
              >
                Adicionar despesa
              </button>)}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coinType: state.wallet.currencies,
  coinDetails: state.wallet.payload,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  coinType: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
