const numbers = [1, 2, 3, 4, 5, 6]

var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one')
})

var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'two')
})

var p3 = new Promise((resolve, reject) => {
  reject(new Error('reject'))
  // setTimeout(resolve, 3000, 'tree')
})

var p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'four')
})

var p5 = new Promise((resolve, reject) => {
  // reject(new Error('reject'))
  setTimeout(resolve, 5000, 'five')
})

const map = (inputs = [], mapper, obj) => {
  const result = []

  return new Promise((resolve, reject) => {
    const rec = (item, index, length) => {
      if (index !== length) {
        result.push(item)

        mapper(item, index + 1, length)
        return rec(inputs[index + 1], index + 1, length)
      } else {
        resolve(result)
      }
    }

    rec(inputs[0], 0, inputs.length)
  })
}

map(numbers, (item, index, length) => {
  console.log('Promise map item --', item)
  return new Promise((resolve, reject) => { setTimeout(() => { resolve(item) }, 1000) })
}).then(result => {
  console.log('Promise map result --', result)
}).catch(err => {
  console.log('Promise map error --', err.message || '')
})

const all = (promises = []) => {
  const result = []

  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(item => {
        result.push(item)
        if (result.length === promises.length) {
          resolve(result)
        }
      }).catch(reason => {
        reject(reason)
      })
    })
  })
}

all([p1, p2, p3, p4, p5]).then(result => {
  console.log('Promise all result --', result)
}).catch(err => {
  console.log('Promise all error', err.message || '')
})

const each = (promises = [], iterator) => {
  const result = []

  return new Promise((resolve, reject) => {
    const rec = (item, index, length) => {
      if (index !== length) {
        return item.then(_item => {
          result.push(_item)
          iterator(_item, index + 1, length)

          return rec(promises[index + 1], index + 1, length)
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve(result)
      }
    }

    rec(promises[0], 0, promises.length)
  })
}

each([p1, p2, p3, p4, p5], (item, index, length) => {
  console.log('Promise each item --', item)
}).then(result => {
  console.log('Promise each result --', result)
}).catch(err => {
  console.log('Promise each error --', err.message || '')
})

Promise.prototype.tap = function (handler) {
  return this.then(result => {
    return Promise.resolve(handler(result)).then(() => result)
  })
}

p1.tap((value) => {
  console.log('Promise tap value --', value)
}).then(result => {
  console.log('Promise tap result --', result)
}).catch(err => {
  console.log('Promise tap error --', err.message || '')
})

Promise.prototype.thenReturn = function (value) {
  return Promise.resolve(this.then(() => value))
}

p1.thenReturn('returned value').then(value => {
  console.log('Promise thenReturn result --', value)
}).catch(err => {
  console.log('Promise thenReturn error --', err.message || '')
})