const fp = require('lodash/fp');

const {
  Maybe,
  Container
} = require('./support');

const practice3_1 = () => {
  let maybe = Maybe.of([5, 6, 1]);

  let addOne = fp.flowRight(fp.map(fp.add(1)))

  let ex1 = () => {
    const data = maybe.map(addOne)

    console.log(data);
  };

  ex1();
}

const practice3_2 = () => {
  let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);

  let ex2 = () => {
    const data = xs.map(fp.first);

    console.log(data);
  };

  ex2();
}

const practice3_3 = () => {
  let safeProp = fp.curry((x, o) => Maybe.of(o[x]));

  const user = {
    id: 2,
    name: 'Albert'
  }

  const ex3 = () => {
    const data = safeProp('name', user)
      .map(fp.first)
    
    console.log(data);
  }

  ex3();
}

const practice3_4 = () => {
  const ex4 = (n) => {
    const data = Maybe.of(n)
                  .map(parseInt);

    console.log(data)
  }

  ex4();
}


module.exports = {
  practice3_1,
  practice3_2,
  practice3_3,
  practice3_4
}