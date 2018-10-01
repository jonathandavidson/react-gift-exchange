import getExchange from "../exchange";

describe("lib/exchange", () => {
  describe("when no people are provided", () => {
    it("throws an Error", () => {
      expect(() => getExchange([])).toThrow();
    });
  });

  describe("when one person is provided", () => {
    const people = makePeople(1);

    it("throws an Error", () => {
      expect(() => getExchange(people)).toThrow();
    });
  });

  describe("when two people are provided", () => {
    const people = makePeople(2);
    const exchange = getExchange(people);

    it("each person buys for each other", () => {
      const expected = [{ person: 0, buysFor: 1 }, { person: 1, buysFor: 0 }];

      expect(exchange).toEqual(expected);
    });

    testEveryoneGetsOneGift(people, exchange);
    testNoOneBuysForThemselves(exchange);
  });

  describe("when three people are provided", () => {
    const people = makePeople(3);
    const exchange = getExchange(people);

    testEveryoneGetsOneGift(people, exchange);
    testNoOneBuysForThemselves(exchange);
  });

  describe("when ten people are provided", () => {
    const people = makePeople(10);
    const exchange = getExchange(people);

    testEveryoneGetsOneGift(people, exchange);
    testNoOneBuysForThemselves(exchange);
  });
});

function testNoOneBuysForThemselves(exchange) {
  it("no one buys for themsleves", () => {
    exchange.forEach(association => {
      expect(association.person).not.toBe(association.buysFor);
    });
  });
}

function testEveryoneGetsOneGift(people, exchange) {
  it("everyone gets exactly one gift", () => {
    expect(exchange.length).toBe(people.length);

    people.forEach(person => {
      expect(
        exchange.some(association => association.buysFor === person.id)
      ).toBe(true);
    });
  });
}

function makePeople(quantity) {
  const people = [];

  for (let i = 0; i < quantity; i++) {
    people.push({
      id: i,
      name: `person-${i}`
    });
  }

  return people;
}
