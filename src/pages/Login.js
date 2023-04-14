import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions/userAction';
import '../styles/Login.css';
import logosvg from '../images/logo.svg';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  validateFields = () => {
    const { email, password } = this.state;
    const MIN_LENGTH_PASSWORD = 6;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email) && password.length >= MIN_LENGTH_PASSWORD) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateFields);
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <main className="login-page">
        <form
          className="login-form"
          onSubmit={ (event) => event.preventDefault() }
        >
          <div>
            <img src={ logosvg } alt="logo" />
          </div>
          <fieldset>

            <label htmlFor="email">
              <input
                className="input is-link"
                data-testid="email-input"
                type="email"
                placeholder="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password">
              <input
                className="input is-link"
                data-testid="password-input"
                type="text"
                placeholder="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="button is-link is-medium"
              disabled={ disabled }
              type="submit"
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
