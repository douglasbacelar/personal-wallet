import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAction, USER_LOGIN } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    userPassword: '',
  };

  handleClick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(handleAction(USER_LOGIN, email));
    history.push('/carteira');
  };

  emailValidate = () => {
    const { email } = this.state;
    const regex = /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/;
    return regex.test(email);
  };

  render() {
    const { userPassword } = this.state;
    const minLength = 6;
    return (
      <div
        className="bg-main-picture bg-cover bg-green-500 relative
        flex min-h-screen items-center justify-center"
      >
        <form className="bg-white py-12 px-12 rounded-2xl shadow-xl text-center ">
          <h1 className="text-blue-500 text-6xl mb-10">
            Personal
            {' '}
            <span className="text-green-400 font-bold">Wallet</span>
          </h1>

          <label htmlFor="userEmail" className="text-email">
            <input
              data-testid="email-input"
              type="email"
              className="w-full block bg-slate-200
               rounded p-2 mb-6 placeholder-blue-500 text-blue-wallet"
              placeholder="E-mail"
              id="userEmail"
              name="userEmail"
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />

          </label>

          <label htmlFor="userPassword" className="text-password">
            <input
              data-testid="password-input"
              type="password"
              className="w-full block bg-slate-200
              rounded p-2 mb-6 placeholder-blue-500"
              placeholder="Senha"
              id="userPassword"
              name="userPassword"
              onChange={ (e) => this.setState({ userPassword: e.target.value }) }
            />
          </label>

          <span className="text-red-400">
            {(userPassword.length < minLength
              || !this.emailValidate()) ? 'Verificar preenchimento de campos obrigatórios'
              : ''}
          </span>

          <button
            className="bg-blue-500 p-3 w-full mt-4 rounded-lg shadow-xl
            cursor-pointer hover:bg-blue-900"
            data-testid="login-submit-button"
            type="button"
            disabled={ (userPassword.length < minLength
              || !this.emailValidate()) }
            onClick={ () => this.handleClick() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);
