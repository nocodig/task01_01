/**
 * 基于以下代码完成下面四个练习
 */

const fp = require('lodash/fp');

const cars = [{
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagai Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  },
]

/**
 * 使用flowRight重新实现下面函数
 * let isLastInStock = function() {
 *  // 获取最后一条数据
 * let last_car = fp.last(cars);
 * retrun fp.prop('in_stock', last_car)
 * }
 */
const practice2_1 = () => {
  const resultFn = fp.flowRight(fp.prop('in_stock'), fp.last);
  console.log('2-1', resultFn(cars));
}

/**
 * 使用fp.flowRight,fp.prop,fp.first获取第一个car的name
 */
const practice2_2 = () => {
  const resultFn = fp.flowRight(fp.props('name'), fp.first);
  console.log(`2-2 ${resultFn(cars)}`)
}

/**
 * 帮助函数重构
 */
const practice2_3 = () => {
  const getDollar = item => item.dollar_value;
  const _avaerage = carDollarArr => fp.reduce(fp.add, 0, carDollarArr) / carDollarArr.length;

  const resultFn = fp.flowRight(_avaerage, fp.map(getDollar));

  console.log(`2-3 ${resultFn(cars)}`)
}

const practice2_4 = () => {
  const _underscore = fp.replace(/\W+/g, '_');
  const addunderscoreAndtoLowerCase = fp.flowRight(fp.toLower, _underscore, fp.prop('name'));

  const resultFn = fp.flowRight(fp.map(addunderscoreAndtoLowerCase));

  console.log(`2-4 ${resultFn(cars)}`)
}


module.exports = {
  practice2_1,
  practice2_2,
  practice2_3,
  practice2_4
}