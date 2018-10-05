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
    testValidExchange(people);
  });

  describe("when three people are provided", () => {
    const people = makePeople(3);
    testValidExchange(people);
  });

  describe("when ten people are provided", () => {
    const people = makePeople(10);
    testValidExchange(people);
  });
});

function testValidExchange(people) {
  const exchanges = [];
  for (let i = 0; i < 50; i++) {
    exchanges.push(getExchange(people));
  }

  it("everyone gets exactly one gift", () => {
    testEveryoneGetsOneGift(people, exchanges);
  });

  it("no one buys for themsleves", () => {
    testNoOneBuysForThemselves(exchanges);
  });
}

function testNoOneBuysForThemselves(exchanges) {
  exchanges.forEach(exchange => {
    exchange.forEach(association => {
      expect(association.person).not.toEqual(association.buysFor);
    });
  });
}

function testEveryoneGetsOneGift(people, exchanges) {
  exchanges.forEach(exchange => {
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
