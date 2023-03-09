import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletCurrencies());
  }

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
            />
          </label>

          <label htmlFor="descriptionValue" className="description-input">
            Descrição
            <input
              data-testid="description-input"
              type="text"
              id="descriptionValue"
              name="descriptionValue"
            />
          </label>

          <label htmlFor="coin" className="form-select-coin">
            Moeda:
            <select data-testid="currency-input" className="form-select-coin" required>
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
              required
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
              required
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
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
