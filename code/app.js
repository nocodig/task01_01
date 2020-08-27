// 代码文件

const practice1 = require('./practice1');
const { practice2_1, practice2_2, practice2_3, practice2_4 } = require('./practice2');
const { practice3_1, practice3_2, practice3_3, practice3_4 } = require('./practice3');
const MyPromise = require('./practice4');

practice1();

practice2_1();
practice2_2();
practice2_3();
practice2_4();


practice3_1();
practice3_2();
practice3_3();
practice3_4();


const test = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  // });
  resolve('test');
})

let a = test.then(value => {
  console.log(value);
  return a
}, resson  => {
  console.log(resson)
})

a.then(console.log, console.log)
