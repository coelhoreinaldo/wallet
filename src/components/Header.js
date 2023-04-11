import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <h1 data-testid="email-field">{email}</h1>
        <h1 data-testid="total-field">
          0
          <span data-testid="header-currency-field">BRL</span>
        </h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
