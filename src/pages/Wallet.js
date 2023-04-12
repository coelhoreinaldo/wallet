import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <WalletForm />
        <h1>TrybeWallet</h1>
        <Table />
      </>
    );
  }
}

export default Wallet;
