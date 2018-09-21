// @flow
import React, { Component } from 'react';
import PortfolioList from './Portfolio/List';
import './App.css';

type Props = {};

type Portfolio = {
  id: number,
  name: string
};

type State = {
  portfolios: Array<Portfolio>
};

export default class App extends Component<Props, State> {
  state = {
    portfolios: []
  }

  addPortfolio = (portfolio: { name: string }) => {
    this.setState(state => ({
      portfolios: state.portfolios.concat({
        id: state.portfolios.length + 1,
        name: portfolio.name
      })
    }));
  }

  deletePortfolio = (portfolioId: number) => {
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
