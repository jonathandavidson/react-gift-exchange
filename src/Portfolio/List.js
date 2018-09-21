// @flow
import React, { Component } from 'react';

type Portfolio = {
  id: number,
  name: string
};

type Props = {
  onAdd: (portfolio: { name: string }) => void,
  onDelete: (id: number) => void,
  portfolios: Array<Portfolio>
};

type State = {
  inputValue: string,
  portfolios: Array<{}>
};

export default class PortfolioList extends Component<Props, State> {
  state = {
    inputValue: "",
    portfolios: []
  }

  handleAdd = (event: SyntheticEvent<>) => {
    event.preventDefault();
    this.props.onAdd({ name: this.state.inputValue });
    this.setState({ inputValue: "" })
  }

  handleInputChange = (event: SyntheticInputEvent<>) => {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const listItems = this.props.portfolios.map((portfolio: Portfolio) => {
      return (
        <li key={portfolio.id}>
          <a href="">{portfolio.name}</a>
          <button onClick={() => this.props.onDelete(portfolio.id)}>Delete</button>
        </li>
      );
    });

    return (
      <div className="PortfolioList">
        <ul>
          {listItems}
        </ul>
        <form name="add-portfolio" onSubmit={this.handleAdd}>
          <input value={this.state.inputValue} onChange={this.handleInputChange} type="text"/>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
