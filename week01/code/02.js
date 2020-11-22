const _  = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()
const compose = (...args) => value => args.reduceRight((acc, fn) => fn(acc), value)

const f = compose(toUpper, first, reverse)
const array = ['jack', 'tom', 'lucy', 'kate']

console.log(f(array))

// function compose(...fnArr) {
// 	return function(value) {
// 		return fnArr.reduceRight((prev, curr) => {
// 			return curr(prev)
// 		}, value)
// 	}
// }

