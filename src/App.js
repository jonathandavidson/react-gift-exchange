import React, { Component } from "react";
import PersonList from "./Person/List";
import Exchange from "./Exchange";
import getExchange from "./lib/exchange";
import CssBaseline from "@material-ui/core/CssBaseline";
import CreateExchangeButton from "./CreateExchangeButton";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import guid from "./lib/guid";

const styles = {
  paper: {
    margin: "2.5rem auto",
    padding: "3rem",
    width: "50%"
  },
  exchangeButton: {
    display: "flex",
    margin: "0 auto"
  }
};

class App extends Component {
  state = {
    persons: [],
    exchange: []
  };

  addPerson = person => {
    this.setState(state => ({
      persons: state.persons.concat({
        id: guid(),
        name: person.name
      })
    }));
  };

  deletePerson = personId => {
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
        <Paper className={this.props.classes.paper} elevation={1}>
          <PersonList
            persons={this.state.persons}
            onAdd={this.addPerson}
            onDelete={this.deletePerson}
          />
          <CreateExchangeButton
            className={this.props.classes.exchangeButton}
            onClick={this.createExchange}
          />
          <Exchange
            exchange={this.state.exchange}
            persons={this.state.persons}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
