import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/PermIdentity";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function Exchange(props) {
  const associations = props.exchange.map(association => {
    const person = props.persons.find(
      person => person.id === association.person
    );
    const buysFor = props.persons.find(
      person => person.id === association.buysFor
    );

    if (person && buysFor) {
      return (
        <ListItem key={`${association.person}${association.buysFor}`}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={person.name}
            secondary={`buys for ${buysFor.name}`}
          />
        </ListItem>
      );
    } else {
      throw new Error("Invalid exchange results supplied.");
    }
  });

  return (
    props.exchange.length > 0 && (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          The Davidson Family Gift Exchange
        </Typography>
        <List>{associations}</List>
        <Button color="primary" onClick={props.onBackClick} variant="contained">
          Back
        </Button>
        <Button
          color="primary"
          onClick={props.onReshuffleClick}
          variant="contained"
        >
          Reshuffle
        </Button>
      </React.Fragment>
    )
  );
}
