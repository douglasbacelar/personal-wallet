import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WalletForm from './WalletForm';
import logo from '../emoji-money.png';
import coinImage from '../coin-image.png';
import imageProfile from '../img-profile.png';

class Header extends Component {
  render() {
    const { userEmail, sumValues } = this.props;
    const wallet = <span className="text-green-400 font-bold">Wallet</span>;
    const sumExpenses = sumValues.reduce((acc, curr) => (
      acc + curr.value * curr.exchangeRates[curr.currency].ask
    ), 0).toFixed(2);

    return (
      <div
        className="bg-white rounded-lg shadow-lg flex flex-col h-96 w-1037"
      >
        <div className="items-center flex flex-row h-40 justify-around top-1 w-1037">

          <div className="">
            <Link to="/" alt="Login">
              <img src={ logo } alt="PersonalWallet" />
              <h1 className="text-blue-500 text-4xl mb-10 top-20">
                Personal
                {' '}
                {wallet}
              </h1>
            </Link>
          </div>

          <div className="items-center text-blue-500 flex text-sm font-semibold gap-1.5">
            <img src={ coinImage } alt="TrybeWallet" />
            Total de despesas: R$
            <p data-testid="total-field">
              { sumExpenses }
            </p>
            <span data-testid="header-currency-field">BRL</span>
          </div>

          <div className="items-center text-green-600 flex text-sm font-semibold gap-1.5">
            <img src={ imageProfile } alt="UserWallet" />
            <p data-testid="email-field">{userEmail}</p>
          </div>

        </div>
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  sumValues: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  sumValues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
