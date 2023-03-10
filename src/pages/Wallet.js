import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { infoExpenses } = this.props;
    return (
      <div>
        <Header />
        <WalletForm />
        <main>
          {infoExpenses.map((expense) => (
            <div key={ expense.id }>
              <p id="value">{expense.id}</p>
              <p id="value">{expense.value}</p>
              <p id="value">{expense.description}</p>
              <p id="value">{expense.currency}</p>
              <p id="value">{expense.method}</p>
              <p id="value">{expense.tag}</p>
            </div>
          ))}
        </main>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  infoExpenses: state.wallet.expenses,
});

Wallet.propTypes = {
  infoExpenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired };

export default connect(mapStateToProps)(Wallet);
