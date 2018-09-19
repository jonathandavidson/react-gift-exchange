import React, { Component } from 'react';
import PortfolioList from './Portfolio/List';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PortfolioList/>
      </div>
    );
  }
}

export default App;
