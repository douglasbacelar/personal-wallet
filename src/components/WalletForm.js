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
    first: true,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletCurrencies());
  }

  componentDidUpdate(_prevProps, previewState) {
    const { infoCaptured, editor } = this.props;
    if (!this.checkinfo(previewState, infoCaptured) && editor && previewState.first) {
      this.setState({
        ...infoCaptured,
        first: false,
      });
    }
  }

  checkinfo = (previewState, captureInfo) => {
    const checkObject = Object.entries(previewState);
    const checkAllObjects = checkObject.every(([key, value]) => (
      value === captureInfo[key]));
    return checkAllObjects;
  };

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
      first: true,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { coinType, editor } = this.props;
    return (
      <div
        className="relative flex rounded-xl w-1037 h-96 left-40 top-36
      shadow-2xl justify-center "
      >
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
            Descrição da Despesa
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
            Categoria da despesa
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
  infoCaptured: state.wallet.captureEditInput,
});

WalletForm.propTypes = {
  coinType: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  infoCaptured: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
