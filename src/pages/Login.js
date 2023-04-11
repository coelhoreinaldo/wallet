import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

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
      <>
        <h1>Hello, TrybeWallet!</h1>
        <form onSubmit={ (event) => event.preventDefault() }>
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
        </form>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
