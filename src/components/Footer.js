import React, { Component } from 'react';
import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        Desenvolvido por
        {' '}
        <a href="https://github.com/coelhoreinaldo" target="_blank" rel="noreferrer">Reinaldo Coelho</a>
        .
      </footer>
    );
  }
}

export default Footer;
