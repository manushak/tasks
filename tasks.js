// Task 1

const first = (f) => {
  return (n) => {
    f(n)
  }

  // or

  return function () {
    f.apply(null, arguments)
  }
}

const second = (n) => {
  console.log(n)
}

first(second)(7)

// Task 2
const giveRand = callback => {
  callback(Math.random())
}

const getAverage = (num, sum) => {
  if (num > 0) {
    giveRand(n => {
      sum += n
    })

    return getAverage(num - 1, sum)
  }

  return sum / 10
}

console.log(getAverage(10, 0))

// Task 3

const f = (argument, callback) => {
  if (argument === 4) {
    callback(false)
    return
  }
  callback(true)
}

const array = [2, 3, 4, 5, 6, 7, 8]

const callF = () => {
  let exit = false

  array.some((item) => {
    if (!exit) {
      f(item, (b) => {
        exit = b
        return exit
      })
    }

    return exit
  })
}

callF()

// Task 4

const giveTrueIf4Async = (arg, callback) => {
  const result = arg === 4
  const f = () => callback(result)
  setTimeout(f, 10)
}
// const array = [2, 3, 4, 5, 6, 7, 8]

const rec = (length) => {
  if (length > 0) {
    giveTrueIf4Async(array[array.length - length], (result) => {
      if (!result) {
        return rec(length - 1)
      }
    })
  }
}

rec(array.length)

// Task 5
const count = 10

const giveRandAsync = callback => {
  const f = () => callback(Math.random())
  setTimeout(f, 10)
}

const demand1 = (times) => {
  const numbers = []
  for (let i = 0; i < times; i++) {
    giveRandAsync((num) => {
      numbers.push(num)
      console.log(numbers)
    })
  }
}

demand1(count)

const getAverage5 = (arr) => {
  const average = arr.reduce((acc, current) => { return acc + current }) / arr.length
  console.log(average)
}

const demand2 = (callback) => {
  const addNumber = (nums) => {
    giveRandAsync(num => {
      nums.push(num)

      if (nums.length === count) {
        return callback(nums)
      }

      callback(nums)
      return addNumber(nums)
    })
  }

  return addNumber([])
}

demand2(getAverage5)

const demand3 = (callback) => {
  const arr = []

  const interval = setInterval(() => {
    giveRandAsync((result) => {
      arr.push(result)

      if (arr.length === count) {
        clearInterval(interval)
      }

      return callback(arr)
    })
  }, 20000)
}

demand3(getAverage5)

const demand4 = (callback) => {
  const addNumber = (nums) => {
    giveRandAsync(num => {
      nums.push(num)

      if (nums.length === count) {
        return callback(nums)
      }
      return addNumber(nums)
    })
  }

  return addNumber([])
}

demand4(getAverage5)
