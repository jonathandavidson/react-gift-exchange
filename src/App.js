import React, { Component } from "react";
import PersonList from "./Person/List";
import Exchange from "./Exchange";
import getExchange from "./lib/exchange";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import guid from "./lib/guid";

const styles = {
  paper: {
    margin: "2.5rem auto",
    padding: "3rem",
    width: "50%"
  }
};

const views = {
  Create: "create",
  Exchange: "exchange"
};

class App extends Component {
  state = {
    persons: [],
    exchange: [],
    view: views.Create
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
      this.setState({ exchange, view: views.Exchange });
    }
  };

  render() {
    const content =
      this.state.view === views.Create ? (
        <PersonList
          persons={this.state.persons}
          onAdd={this.addPerson}
          onCreateExchange={this.createExchange}
          onDelete={this.deletePerson}
        />
      ) : (
        <Exchange
          exchange={this.state.exchange}
          onBackClick={() => this.setState({ view: views.Create })}
          onReshuffleClick={this.createExchange}
          persons={this.state.persons}
        />
      );
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={this.props.classes.paper} elevation={1}>
          {content}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
