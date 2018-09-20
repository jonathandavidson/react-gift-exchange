import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      portfolios: []
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    this.props.onAdd({ name: this.state.inputValue });
    this.setState({ inputValue: "" })
  }

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const listItems = this.props.portfolios.map(({ id, name }) => {
      return (
        <li key={id}>
          <a href="">{name}</a>
          <button onClick={() => this.props.onDelete(id)}>Delete</button>
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

PortfolioList.propTypes = {
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  portfolios: PropTypes.array
}
