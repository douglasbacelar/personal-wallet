import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletCurrencies, handleAction, SUM_EXPENSES } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletCurrencies());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    this.setState({
      exchangeRates: data,
    });
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    dispatch(handleAction(SUM_EXPENSES, this.state));
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  render() {
    const { coinType } = this.props;
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
              onChange={ (e) => this.setState({ description: e.target.value }) }
            />
          </label>

          <label htmlFor="coin" className="form-select-coin">
            Moeda:
            <select
              data-testid="currency-input"
              className="form-select-coin"
              onChange={ (e) => this.setState({ currency: e.target.value }) }
              required
            >
              {coinType.map((coin) => (
                <option value="coin" id="coin" key={ coin }>{coin}</option>
              ))}
            </select>
          </label>

          <label htmlFor="pay">
            Método de pagamento:
            <select
              id="pay"
              data-testid="method-input"
              className="form-select-pay"
              onChange={ (e) => this.setState({ method: e.target.value }) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select
              id="category"
              data-testid="tag-input"
              className="form-select-category"
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

          <button
            className="btn-expense"
            type="button"
            onClick={ () => this.handleClick() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coinType: state.wallet.currencies,
});

WalletForm.propTypes = {
  coinType: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
