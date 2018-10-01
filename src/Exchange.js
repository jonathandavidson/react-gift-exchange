// @flow
import React from "react";
import type { ExchangeAssociation, Person } from "./lib/types";

type Props = {
  exchange: Array<ExchangeAssociation>,
  persons: Array<Person>
};

export default function Exchange(props: Props) {
  const associations = props.exchange.map(association => {
    const person: Person | void = props.persons.find(
      person => person.id === association.person
    );
    const buysFor: Person | void = props.persons.find(
      person => person.id === association.buysFor
    );

    if (person && buysFor) {
      return (
        <li>
          {person.name} buys for {buysFor.name}
        </li>
      );
    } else {
      throw new Error("Invalid exchange results supplied.");
    }
  });

  return props.exchange.length > 0 && <ul>{associations}</ul>;
}
