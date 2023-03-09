import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    userPassword: '',
  };

  handleClick = async () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(userLogin(email));
    history.push('/carteira');
  };

  emailValidate = () => {
    const { email } = this.state;
    const regex = /^[\w.]+@\w+.\w{2,}(?:.\w{2})?$/;
    if (regex.test(email)) return true;
  };

  render() {
    const { userPassword } = this.state;
    const minLength = 6;
    return (
      <div>
        <form>
          <h1>Login</h1>

          <label htmlFor="userEmail" className="text-email">
            <input
              data-testid="email-input"
              type="email"
              placeholder="Usuário"
              id="userEmail"
              name="userEmail"
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
            {/* <span className="formField__error">{this.emailValidate()}</span> */}
          </label>

          {console.log(this.emailValidate()) }

          <label htmlFor="userPassword" className="text-password">
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
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);
