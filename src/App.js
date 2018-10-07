// @flow
import React, { Component } from "react";
import PersonList from "./Person/List";
import Exchange from "./Exchange";
import getExchange from "./lib/exchange";
import CssBaseline from "@material-ui/core/CssBaseline";
import CreateExchangeButton from "./CreateExchangeButton";
import type { Person, ExchangeAssociation } from "./lib/types";

type Props = {};

type State = {
  persons: Array<Person>,
  exchange: Array<ExchangeAssociation>
};

export default class App extends Component<Props, State> {
  state = {
    persons: [],
    exchange: []
  };

  addPerson = (person: { name: string }) => {
    this.setState(state => ({
      persons: state.persons.concat({
        id: state.persons.length + 1,
        name: person.name
      })
    }));
  };

  deletePerson = (personId: number) => {
    this.setState(state => ({
      exchange: [],
      persons: state.persons.filter(person => person.id !== personId)
    }));
  };

  createExchange = () => {
    if (this.state.persons.length > 1) {
      const exchange = getExchange(this.state.persons);
      this.setState({ exchange });
    }
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <PersonList
            persons={this.state.persons}
            onAdd={this.addPerson}
            onDelete={this.deletePerson}
          />
          <CreateExchangeButton onClick={this.createExchange} />
          <Exchange
            exchange={this.state.exchange}
            persons={this.state.persons}
          />
        </div>
      </React.Fragment>
    );
  }
}
