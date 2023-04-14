import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/carteira" component={ Wallet } />
          <Route exact path="/" component={ Login } />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
