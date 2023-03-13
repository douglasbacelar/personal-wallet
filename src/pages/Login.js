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
      <div>
        <form>
          <h1>Login</h1>

          <label htmlFor="userEmail" className="text-email">
            Email:
            <input
              data-testid="email-input"
              type="email"
              placeholder="E-mail"
              id="userEmail"
              name="userEmail"
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
            {/* <span className="formField__error">{this.emailValidate()}</span> */}
          </label>

          <label htmlFor="userPassword" className="text-password">
            Password:
            <input
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              id="userPassword"
              name="userPassword"
              onChange={ (e) => this.setState({ userPassword: e.target.value }) }
            />
          </label>

          <button
            className="btn-login"
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
