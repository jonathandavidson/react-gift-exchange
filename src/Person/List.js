// @flow
import React, { Component } from "react";
import type { Person } from "../lib/types";

type Props = {
  onAdd: (person: { name: string }) => void,
  onDelete: (id: number) => void,
  persons: Array<Person>
};

type State = {
  inputValue: string,
  persons: Array<Person>
};

export default class PersonList extends Component<Props, State> {
  state = {
    inputValue: "",
    persons: []
  };

  handleAdd = (event: SyntheticEvent<>) => {
    event.preventDefault();
    const name = this.state.inputValue.trim();
    if (name) {
      this.props.onAdd({ name: name });
      this.setState({ inputValue: "" });
    }
  };

  handleInputChange = (event: SyntheticInputEvent<>) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const listItems = this.props.persons.map((person: Person) => {
      return (
        <li key={person.id}>
          <a href="">{person.name}</a>
          <button onClick={() => this.props.onDelete(person.id)}>Delete</button>
        </li>
      );
    });

    return (
      <div className="PersonList">
        <ul>{listItems}</ul>
        <form name="add-person" onSubmit={this.handleAdd}>
          <input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            type="text"
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
