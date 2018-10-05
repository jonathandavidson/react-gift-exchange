// @flow
import type { Person, ExchangeAssociation } from "./types";

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

export default function getExchange(persons: Array<Person>) {
  if (persons.length < 2) {
    throw new Error("At least two people must be provided.");
  }

  const available = shuffle(persons.slice(0));
  const exchange: Array<ExchangeAssociation> = persons.map((person: Person) => {
    const buysForIndex = available.findIndex(
      buysFor => person.id !== buysFor.id
    );

    let buysFor;
    if (buysForIndex < 0) {
      buysFor = available.pop();
    } else {
      buysFor = available.splice(buysForIndex, 1)[0];
    }

    return {
      person: person.id,
      buysFor: buysFor.id
    };
  });

  const lastItem = exchange[exchange.length - 1];
  if (lastItem.person === lastItem.buysFor) {
    const randomIndex = Math.floor(Math.random() * (exchange.length - 2));
    const temp = exchange[randomIndex].buysFor;
    exchange[randomIndex].buysFor = exchange[exchange.length - 1].buysFor;
    exchange[exchange.length - 1].buysFor = temp;
  }

  return exchange;
}
