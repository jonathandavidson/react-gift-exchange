import React, { Component } from 'react';


export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      portfolios: []
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    this.setState(state => ({
      inputValue: "",
      portfolios: state.portfolios.concat({
        id: state.portfolios.length + 1,
        name: this.state.inputValue
      })
    }));
  }

  handleDelete(id) {
    this.setState(state => ({
      portfolios: state.portfolios.filter(portfolio => portfolio.id !== id)
    }));
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const listItems = this.state.portfolios.map(({ id, name }) => {
      return (
        <li key={id}>
          <a href="">{name}</a>
          <button onClick={() => this.handleDelete(id)}>Delete</button>
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
