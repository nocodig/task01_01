/**
 * promise 改进下列代码
 * setTimesetTimeout(() => {
 *  var a = 'hello';
 *   setTimeout(() => {
 *     var b = 'lagou';
 *     setTimeout(() => {
 *       var c = 'I ❤️ U'
 *     }, 10);
 *   }, 10);
 * }, 10)
 */

module.exports = () => {
  Promise.resolve('hello')
  .then(data => `${data} lagou`)
  .then(data => console.log(`${data} I ❤️ U`));
}
