import React, { Component } from 'react';

class Home extends Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleSubmitBtn = (event) => {
    event.preventDefault();
  };

  validateFields = () => {
    const { email, password } = this.state;
    const MIN_LENGTH_PASSWORD = 6;

    if (email.includes('@') && password.length >= MIN_LENGTH_PASSWORD) {
      this.setState({ disabled: false });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateFields);
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <>
        <h1>Hello, TrybeWallet!</h1>
        <form onSubmit={ this.handleSubmitBtn }>
          <label htmlFor="email" data-testid="email-input">
            <input
              type="email"
              placeholder="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password" data-testid="password-input">
            <input
              type="text"
              placeholder="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button disabled={ disabled }>
            Entrar
          </button>
        </form>
      </>
    );
  }
}

export default Home;
