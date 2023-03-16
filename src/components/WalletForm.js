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
        className="items-center bg-gray-wallet flex
        flex-row h-32 justify-center pl-28 pr-28 top-40 w-817 "
      >
        <form className="flex flex-wrap h-20 justify-around">

          <label
            htmlFor="descriptionValue"
            className="text-blue-wallet
          text-base font-medium"
          >
            Descrição da Despesa
            <input
              data-testid="description-input"
              className="h-7 border-solid border-blue-wallet rounded-md m-2
               text-blue-wallet aut"
              type="text"
              id="descriptionValue"
              name="descriptionValue"
              value={ description }
              onChange={ (e) => this.setState({ description: e.target.value }) }
            />
          </label>
          <label
            htmlFor="category"
            className="text-blue-wallet
          text-base font-medium"
          >
            Categoria da despesa
            <select
              id="category"
              data-testid="tag-input"
              className="h-7 border-solid border-blue-wallet
              text-blue-wallet rounded-md m-2 w-40"
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

          <label
            htmlFor="coinValue"
            className="text-blue-wallet
          text-base font-medium"
          >
            Valor
            <input
              data-testid="value-input"
              className="h-7 border-solid border-blue-wallet rounded-md m-2 w-40"
              type="number"
              id="coinValue"
              format="currency"
              name="coinValue"
              value={ value }
              onChange={ (e) => this.setState({ value: e.target.value }) }
            />
          </label>

          <label
            htmlFor="pay"
            className="text-blue-wallet
          text-base font-medium"
          >
            Método de Pagamento
            <select
              id="pay"
              data-testid="method-input"
              className="border-solid border-blue-wallet rounded-md h-7 m-2 w-56
              text-blue-wallet"
              value={ method }
              onChange={ (e) => this.setState({ method: e.target.value }) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label
            htmlFor="coin"
            className="text-blue-wallet
          text-base font-medium"
          >
            Moeda
            <select
              data-testid="currency-input"
              className="border-solid border-blue-wallet rounded-md h-7 m-2 w-24
              text-blue-wallet"
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

          { editor ? (
            <button
              type="button"
              className="bg-green-wallet rounded-md box-border
              text-white font-semibold h-10 relative top-12 w-80"
              onClick={ () => this.handleEditorClick() }
            >
              Editar despesa
            </button>)
            : (
              <button
                type="button"
                className="bg-green-wallet rounded-md box-border
                text-white font-semibold h-10 relative top-12 w-80"
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
