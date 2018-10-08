import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PersonIcon from "@material-ui/icons/PermIdentity";
import PersonListItem from "./Item";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  listInput: {
    "margin-left": "1rem"
  }
};

class PersonList extends Component {
  state = {
    inputValue: "",
    persons: []
  };

  addPerson() {
    const name = this.state.inputValue.trim();
    if (name && !this.props.persons.find(person => name === person.name)) {
      this.props.onAdd({ name: name });
      this.setState({ inputValue: "" });
    }
  }

  handleAdd = event => {
    event.preventDefault();
    this.addPerson();
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleInputKeypress = event => {
    if (event.key === "Enter") {
      this.addPerson();
    }
  };

  render() {
    const listItems = this.props.persons.map(person => {
      return (
        <PersonListItem
          key={person.id}
          person={person}
          onDelete={() => this.props.onDelete(person.id)}
        />
      );
    });

    return (
      <List>
        {listItems}
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <TextField
            className={this.props.classes.listInput}
            label="Add a name"
            fullWidth={true}
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputKeypress}
            margin="dense"
            value={this.state.inputValue}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Add Person" onClick={this.handleAdd}>
              <AddIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(PersonList);
