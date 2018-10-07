// @flow
import React, { Component } from "react";
import type { Person } from "../lib/types";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/PermIdentity";

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
    if (name && !this.props.persons.find(person => name === person.name)) {
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
        <ListItem key={person.id}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={person.name} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={() => this.props.onDelete(person.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

    return (
      <div className="PersonList">
        <List>{listItems}</List>
        <form name="add-person" onSubmit={this.handleAdd}>
          <TextField
            label="Add a name"
            onChange={this.handleInputChange}
            margin="dense"
            value={this.state.inputValue}
            variant="filled"
          />
          <IconButton type="submit" color="primary" aria-label="Add">
            <AddIcon />
          </IconButton>
        </form>
      </div>
    );
  }
}
