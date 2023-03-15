import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, sumValues } = this.props;
    return (
      <div
        className=" bg-gray-200 flex rounded-xl w-1037 h-482 left-40 top-0
         justify-around absolute shadow-lg
        "
      >

        <h1 className="text-blue-500 text-4xl mb-10 top-20">
          Personal
          {' '}
          <span className="text-green-400 font-bold">Wallet</span>
        </h1>
        <h4 data-testid="total-field">
          <div>
            {
              sumValues.reduce((acc, curr) => (
                acc + curr.value * curr.exchangeRates[curr.currency].ask
              ), 0).toFixed(2)
            }
          </div>
        </h4>
        <span data-testid="header-currency-field">BRL</span>
        <h4 data-testid="email-field">{userEmail}</h4>

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
