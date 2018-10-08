import React from "react";

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
        <li key={association.person + association.buysFor}>
          {person.name} buys for {buysFor.name}
        </li>
      );
    } else {
      throw new Error("Invalid exchange results supplied.");
    }
  });

  return props.exchange.length > 0 && <ul>{associations}</ul>;
}
