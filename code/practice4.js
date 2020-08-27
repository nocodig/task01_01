

const PENDING = 'pending'; // 等待状态
const FULFILLED = 'fulfilled'; // 成功状态
const REJECTED = 'rejected'; // 失败状态

class MyPromise {

  constructor(executor) {
    try {
      this.status = PENDING;
      this.value = undefined;
      this.reason = undefined;
      this.successCallback = [];
      this.faildCallback = [];

      // 保证this 指向
      this.resolve = this.resolve.bind(this)
      this.reject = this.reject.bind(this)
      this.then = this.then.bind(this)
      this.catch = this.catch.bind(this);

      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e)
    }
  };

  resolve(value) {
    if(this.status !== PENDING) {
      return;
    }

    this.status = FULFILLED;

    this.value = value;
  
    // 多个then 调用的方式
    while(this.successCallback.length) {
      this.successCallback.shift()();
    }
  }

  reject(reason) {
    if (this.status !== PENDING) {
      return;
    }

    this.status = REJECTED;

    this.reason = reason;
    // 多个reject 调用方式
    while(this.faildCallback.length) {
      this.faildCallback.shift()();
    }
  } 

  then(successCallback, rejectCallbak) {
    successCallback = successCallback ? successCallback : value => value
    rejectCallbak = rejectCallbak ? rejectCallbak : reason => { throw reason }
  
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        try {
          setTimeout(() => {
            // 处理成异步，保证能够获取到promise 变量
            resolvePromise(promise, successCallback(this.value), resolve, reject);
          })
        } catch (err) {
          reject(err);
        }
      } else if (this.status === REJECTED) {
        try {
          setTimeout(() => {
            // 处理成异步，保证能够获取到promise 变量
            resolvePromise(promise, rejectCallbak(this.value), resolve, reject);
          })
        } catch (err) {
          reject(err);
        }
      } else {
        // 添加等待状态
        this.successCallback.push(() => {
          try {
            setTimeout(() => {
              // 处理成异步，保证能够获取到promise 变量
              resolvePromise(promise, successCallback(this.value), resolve, reject);
            })
          } catch (err) {
            reject(err);
          }
        });
        this.faildCallback.push(() => {
          try {
            setTimeout(() => {
              // 处理成异步，保证能够获取到promise 变量
              resolvePromise(promise, rejectCallbak(this.value), resolve, reject);
            })
          } catch (err) {
            reject(err);
          }
        });
      }
    });

    return promise;
  }

  catch(faildCallback) {
    return this.then(undefined, (reason) => {
      faildCallback(reason);
    })
  }

  finally(callBack) {
    return this.then(value => {
      return MyPromise.resolve(callBack()).then(() => value)
    }, reason => {
      return MyPromise.resolve(callBack()).then(() => { throw reason})
    })
  }


  static all(arr) {
    const result = [];
    let index = 0;

    return new MyPromise((reslove, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === arr.length) {
          reslove(result);
        }
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof MyPromise) {
          arr[i].then(value => addData(i, value), reason => reject(reason))
        } else {
          addData(i, arr[i])
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }

    return new MyPromise(resolve => resolve(value))
  }
}

function resolvePromise(promise2, x, reslove, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  if (x instanceof MyPromise) {
    x.then(reslove, reject);
  } else {
    reslove(x);
  }
}


module.exports = MyPromise;