import React, { Component } from 'react';
import { AppNav } from './components/appnav';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Home } from './pages/home';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <AppNav/>
        <header className="app-content">
          <Switch>
            <Route key="home" exact={true} path="/" component={Home} />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
