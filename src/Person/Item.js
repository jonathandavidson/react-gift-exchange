import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/PermIdentity";
import IconButton from "@material-ui/core/IconButton";

export default function PersonListItem(props) {
  return (
    <ListItem key={props.person.id}>
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.person.name} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
