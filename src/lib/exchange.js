// @flow
import type { ExchangeAssociation, Person } from "./types";

export default function getExchange(persons: Array<Person>) {
  if (persons.length < 2) {
    throw new Error("At least two people must be provided.");
  }

  const exchange: Array<ExchangeAssociation> = persons.map(
    (currentPerson: Person, index: number, arr: Array<Person>) => ({
      person: currentPerson.id,
      buysFor: index < arr.length - 1 ? arr[index + 1].id : arr[0].id
    })
  );

  return exchange;
}
