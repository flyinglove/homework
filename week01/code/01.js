const _ = require('lodash')

const array = ['jack', 'tom', 'lucy', 'kate']

// console.log(_.first(array))
// console.log(_.last(array))
// console.log(_.toUpper(_.first(array)))
// console.log(_.reverse(array))

function getSum(a, b, c) {
	return a + b + c
}

// const curriedSum = _.curry(getSum)

// console.log(curriedSum(1)(2)(3))
// console.log(curriedSum(1, 2)(3))
// console.log(curriedSum(1)(2, 3))


function curry(func) {
	return function curriedFn(...args) {
		if (args.length < func.length) {
			return function() {
				return curriedFn(...args.concat(Array.from(arguments)))
			}
		}
		return func(...args)
	}
}
const test = curry(getSum)
console.log(test(1)(2)(3))
console.log(test(1, 2)(3))
console.loSg(test(1)(2, 3))