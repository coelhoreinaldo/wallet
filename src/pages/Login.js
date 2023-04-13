import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions/userAction';
import '../styles/Login.css';

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
      <form
        className="login-page"
        onSubmit={ (event) => event.preventDefault() }
      >
        <div>
          <h1>TrybeWallet!</h1>
        </div>
        <fieldset>

          <label htmlFor="email">
            <input
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
              data-testid="password-input"
              type="text"
              placeholder="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ disabled }
            type="submit"
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </fieldset>
      </form>
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
