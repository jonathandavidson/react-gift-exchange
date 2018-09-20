import React, { Component } from 'react';
import PortfolioList from './Portfolio/List';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: []
    }
    this.addPortfolio = this.addPortfolio.bind(this);
    this.deletePortfolio = this.deletePortfolio.bind(this);
  }

  addPortfolio(portfolio) {
    this.setState(state => ({
      portfolios: state.portfolios.concat({
        id: state.portfolios.length + 1,
        name: portfolio.name
      })
    }));
  }

  deletePortfolio(portfolioId) {
    this.setState(state => ({
      portfolios: state.portfolios.filter(portfolio => portfolio.id !== portfolioId)
    }));
  }

  render() {
    return (
      <div className="App">
        <PortfolioList
          portfolios={this.state.portfolios}
          onAdd={this.addPortfolio}
          onDelete={this.deletePortfolio}
        />
      </div>
    );
  }
}

export default App;
